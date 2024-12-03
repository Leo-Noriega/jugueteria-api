import express from "express";
import { createOrGetCart, getCartByUserId } from "../controllers/cartController.js";

const router = express.Router();

router.post('/cart-user/:id', createOrGetCart);
router.get('/cart-user/:id', getCartByUserId);

export default router;