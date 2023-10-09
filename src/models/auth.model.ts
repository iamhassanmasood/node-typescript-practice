import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const authUserSchema = new Schema<IUser>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  username: { type: String, required: [true, 'Username is required'], unique: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (value: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value),
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special symbol.',
    },
  },
});

export default mongoose.model<IUser>('AuthUser', authUserSchema);
