import { Request, Response } from 'express';
import Product from '@server/models/product.model';

const sendSuccessResponse = (response: Response, message: string, data: any) => {
  return response.status(200).json({ success: true, message, data });
};

const sendErrorResponse = (response: Response, message: string) => {
  return response.status(400).json({ success: false, message });
};

export const getAllProducts = async (_request: Request, response: Response) => {
  try {
    const allProducts = await Product.find();
    return sendSuccessResponse(response, 'OK', allProducts);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const createProduct = async (request: Request, response: Response) => {
  try {
    const { name, price, type } = request.body;
    const product = await Product.create({ name, price, type });
    return sendSuccessResponse(response, 'Product added successfully', product);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const getOneProduct = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const product = await Product.findById(id);
    return sendSuccessResponse(response, 'OK', product);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const updateProduct = async (request: Request, response: Response) => {
  try {
    const _id = request.params.id;
    const { name, price, type } = request.body;
    const updateProduct = await Product.findByIdAndUpdate(_id, { name, price, type });
    if (!updateProduct) {
      return sendErrorResponse(response, 'Product not found');
    }
    return sendSuccessResponse(response, 'Product updated successfully', updateProduct);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const _id = request.params.id;
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return sendErrorResponse(response, 'Product not exist');
    }
    return sendSuccessResponse(response, 'Product deleted successfully', null);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};
