import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  price: string;
  age: number;
  gender: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
});

export default mongoose.model<IUser>('User', UserSchema);
