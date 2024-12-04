import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersByUserId } from "../controllers/orderController.js";

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/user/:id/orders', getOrdersByUserId)


export default router;
