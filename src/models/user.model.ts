import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);
