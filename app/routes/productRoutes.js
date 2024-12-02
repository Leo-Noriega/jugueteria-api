import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory, upload } from "../controllers/productController.js";

const router = express.Router();

router.post('/products', upload.array('images', 5), createProduct); 
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/category/:categoryId', getProductsByCategory);

export default router;