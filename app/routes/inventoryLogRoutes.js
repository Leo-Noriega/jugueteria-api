import express from 'express';
import { createInventoryLog, getInventoryLogs, getInventoryLogById, updateInventoryLog, deleteInventoryLog } from '../controllers/inventoryLogController.js';

const router = express.Router();

router.post('/inventoryLogs', createInventoryLog);
router.get('/inventoryLogs', getInventoryLogs);
router.get('/inventoryLogs/:id', getInventoryLogById);
router.put('/inventoryLogs/:id', updateInventoryLog);
router.delete('/inventoryLogs/:id', deleteInventoryLog);

export default router;
