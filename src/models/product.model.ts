import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ['Regular', 'Unique'] },
});

export default mongoose.model('Product', ProductSchema);
