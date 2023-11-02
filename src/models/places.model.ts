import mongoose, { Document, Schema } from 'mongoose';

export interface PlaceDocument extends Document {
  title: string;
  place?: string;
  url: string;
  article: string;
  images: (string | null)[];
}

const placeSchema: Schema = new Schema({
  title: { type: String, required: true },
  place: { type: String },
  url: { type: String, required: true },
  article: { type: String, required: true },
  images: { type: [String] },
});

export default mongoose.model<PlaceDocument>('Place', placeSchema);
