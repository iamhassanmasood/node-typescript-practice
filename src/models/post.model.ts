import mongoose, { Schema } from 'mongoose';

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model('Post', PostSchema);
