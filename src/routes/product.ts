import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from '@server/controllers/product.controller';

const productRoutes = Router();

productRoutes.get('/product', getAllProducts);
productRoutes.post('/product', createProduct);
productRoutes.get('/product/:id', getOneProduct);
productRoutes.put('/product/:id', updateProduct);
productRoutes.delete('/product/:id', deleteProduct);

export default productRoutes;
