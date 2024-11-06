import express from 'express';
import Order from "../models/Product.js";

const router = express.Router();

router.post('/products',createProduct);
router.post('/products',getProducts);
router.post('/products/:id',getProductById);
router.post('/products/:id',updateProduct);
router.post('/products/:id',deleteProduct);

export default router;