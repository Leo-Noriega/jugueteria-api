import express from "express";
import { createOrGetCart, getCarts, getCartsById, updateCart, deleteCart, getCartByUserId } from "../controllers/cartController.js";

const router = express.Router();

router.post('/carts/cart-user/:id', createOrGetCart);
router.get('/carts', getCarts);
router.get('/carts/user/:id', getCartByUserId);
router.get('/carts/:id', getCartsById);
router.put('/carts/:id', updateCart);
router.delete('/carts/:id', deleteCart);

export default router;