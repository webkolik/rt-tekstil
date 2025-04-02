# RT TEKSTİL - Örme Fabrikası Otomasyon Sistemi

Modern web teknolojileri kullanılarak geliştirilmiş RT TEKSTİL örme fabrikası için bir otomasyon ve yönetim sistemi.

## Kullanılan Teknolojiler

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Veritabanı**: MongoDB Atlas
- **Kimlik Doğrulama**: NextAuth.js

## Özellikler

- Rol tabanlı erişim kontrolü (Admin, Yönetici, Çalışan)
- Kullanıcı yönetimi
- Siparişlerin takibi
- Gösterge paneli ve raporlama
- Modern ve duyarlı kullanıcı arayüzü

## Kurulum

### Gereksinimler

- Node.js 16.x veya üstü
- npm veya yarn
- MongoDB Atlas hesabı

### Adımlar

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/webkolik/rt-tekstil.git
   cd rt-tekstil
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```

3. `.env.local` dosyasını düzenleyin:
   - MongoDB Atlas bağlantı bilgilerinizi ekleyin
   - NEXTAUTH_SECRET değerini güvenli bir rastgele string ile değiştirin

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## İlk Kullanıcı Oluşturma

Sistem ilk kurulduğunda, bir admin kullanıcıya ihtiyaç duyacaksınız:

1. Kayıt sayfasından bir kullanıcı oluşturun (`/register`)
2. MongoDB veritabanında kullanıcı belgesini bulun
3. Role alanını manuel olarak 'admin' olarak güncelleyin

## Dağıtım

Vercel, Netlify veya diğer Next.js destekli platformlara dağıtabilirsiniz. Dağıtım öncesinde çevre değişkenlerini doğru şekilde ayarlamayı unutmayın.

## Lisans

MIT