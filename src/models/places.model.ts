import mongoose, { Schema } from 'mongoose';

export interface IPlaces extends Document {
  title: string;
  place: string;
  url: string;
  article: string;
  // images: array;
}

const PlacesSchema: Schema = new Schema({
  title: { type: String, required: true },
  place: { type: String },
  url: { type: String, required: true },
  article: { type: String, required: true },
  // images: { type: Array },
});

export default mongoose.model<IPlaces>('Places', PlacesSchema);
