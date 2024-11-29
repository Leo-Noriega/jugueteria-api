import express from 'express';
import { createAddress, getAddressesByUserId, updateAddress, deleteAddress } from '../controllers/addressController.js';

const router = express.Router();

router.post('/addresses', createAddress);
router.get('/addresses/:user_id', getAddressesByUserId);
router.put('/addresses/:id', updateAddress);
router.delete('/addresses/:id', deleteAddress);

export default router;