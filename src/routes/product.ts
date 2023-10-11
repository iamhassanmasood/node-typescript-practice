import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from '@server/controllers/product.controller';
import { checkAuthentication } from '@server/middlewares/auth.middleware';

const productRoutes: Router = Router();

productRoutes.get('/product', checkAuthentication, getAllProducts);
productRoutes.post('/product', checkAuthentication, createProduct);
productRoutes.get('/product/:id', checkAuthentication, getOneProduct);
productRoutes.put('/product/:id', checkAuthentication, updateProduct);
productRoutes.delete('/product/:id', checkAuthentication, deleteProduct);

export default productRoutes;
