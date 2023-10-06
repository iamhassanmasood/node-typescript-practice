import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
});

export default mongoose.model('User', UserSchema);
