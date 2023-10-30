import mongoose, { Schema } from 'mongoose';

const PlacesSchema: Schema = new Schema({
  title: { type: String, required: true },
  location: { type: String },
  url: { type: String, required: true },
  article: { type: String, required: true },
  images: { type: Array },
});

export default mongoose.model('Places', PlacesSchema);
