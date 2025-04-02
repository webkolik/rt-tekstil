import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Lütfen bir isim girin'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Lütfen bir kullanıcı adı girin'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Lütfen bir şifre girin'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee',
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password as string);
};

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;