import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByCategory, getTotalStockByCategory, upload, updateStock } from "../controllers/productController.js";

const router = express.Router();

router.post('/products', upload.array('images', 5), createProduct); 
router.get('/products', getProducts);
router.get('/products/totalStock', getTotalStockByCategory);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/category/:categoryId', getProductsByCategory);
router.get('/products/total-stock-by-category', getTotalStockByCategory); // Ruta para obtener el stock total por categoría
router.put('/products/:id/stock/:quantity', updateStock);


export default router;