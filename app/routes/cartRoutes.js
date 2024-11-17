import express from "express";
import { createCart, getCarts, getCartsById, updateCart, deleteCart } from "../controllers/cartController.js";

const router = express.Router();

router.post('/carts', createCart);
router.get('/carts', getCarts);
router.get('/carts/:id', getCartsById);
router.put('/carts/:id', updateCart);
router.delete('/carts/:id', deleteCart);

export default router;