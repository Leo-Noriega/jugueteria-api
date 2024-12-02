import express from 'express';
import { getCartProductById,getCartProducts, addCartProduct, updateCartProduct, deleteCartProduct } from '../controllers/cartProductController.js';

const router = express.Router();

router.get('/cart-products', getCartProducts);
router.get('/cart-products/:id', getCartProductById);
router.post('/cart-products', addCartProduct);
router.put('/cart-products/:id', updateCartProduct);
router.delete('/cart-products/:id', deleteCartProduct);

export default router;