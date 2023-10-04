import { Request, Response } from 'express';
import Product from '@server/models/product.model';

export const getAllProducts = async (req: Request, res: Response) => {
  console.log(req);
  try {
    const allProducts = await Product.find();
    res.status(200).json({ success: true, message: 'OK', data: allProducts });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, type } = req.body;
    const product = await Product.create({ name, price, type });
    res.status(200).json({ success: true, message: 'Product added successfully', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, message: 'OK', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const { name, price, type } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(_id, { name, price, type });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updateProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await Product.findByIdAndDelete(_id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};
