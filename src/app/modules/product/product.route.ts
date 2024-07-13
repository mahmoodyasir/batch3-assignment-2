import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);

router.get('/', ProductController.getProduct);

router.get('/:productId', ProductController.getProductById);

router.put('/:productId', ProductController.updateProductById);

router.delete('/:productId', ProductController.deleteProductById);

export const ProductRoutes = router;