import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      username?: string | null;
      image?: string | null;
      role: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Geçersiz kimlik bilgileri");
        }

        try {
          await connectDB();

          // Debug için log eklendi
          console.log(`Aranan kullanıcı adı: ${credentials.username}`);
          
          const user = await User.findOne({ username: credentials.username });
          
          if (!user) {
            console.log(`Kullanıcı bulunamadı: ${credentials.username}`);
            throw new Error("Kullanıcı bulunamadı");
          }
          
          if (!user.password) {
            console.log(`Kullanıcının şifresi yok: ${credentials.username}`);
            throw new Error("Kullanıcının şifresi yok");
          }
          
          // Debug için log eklendi
          console.log(`Şifre karşılaştırılıyor...`);
          
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password.toString()
          );
          
          if (!isPasswordCorrect) {
            console.log(`Şifre yanlış: ${credentials.username}`);
            throw new Error("Geçersiz şifre");
          }
          
          console.log(`Giriş başarılı: ${credentials.username}, rol: ${user.role}`);
          
          return {
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            role: user.role
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Kimlik doğrulama başarısız");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login", // Hata sayfasını login'e yönlendir
  },
  debug: process.env.NODE_ENV === "development", // Geliştirme modunda debug aktif
  secret: process.env.NEXTAUTH_SECRET || "default-secret-key-change-this",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };