import express from 'express';
import { checkout, success } from '../service/paymentService.js';

const router = express.Router();

router.post('/checkout', checkout);
router.get('/success', success);

export default router;