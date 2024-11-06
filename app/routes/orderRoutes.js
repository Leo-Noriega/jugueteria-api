import express from 'express';
import Order from "../models/Order.js";

const router = express.Router();

router.post('/orders',createOrder);
router.post('/orders',getOrders);
router.post('/orders/:id',getOrderById);
router.post('/orders/:id',updateOrder);
router.post('/orders/:id',deleteOrder);

export default router;
