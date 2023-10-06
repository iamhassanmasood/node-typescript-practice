import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const authUserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('AuthUser', authUserSchema);
