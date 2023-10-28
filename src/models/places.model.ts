import mongoose, { Schema } from 'mongoose';

const PlacesSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model('Places', PlacesSchema);
