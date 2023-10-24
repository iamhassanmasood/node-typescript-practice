import mongoose, { Schema, Document } from 'mongoose';
export interface IProduct extends Document {
  name: string;
  price: string;
  type: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true, enum: ['Regular', 'Unique'] },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
