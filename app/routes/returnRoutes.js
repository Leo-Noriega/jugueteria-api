import express from "express";
import { createReturn, getReturns, processReturn } from "../controllers/returnController.js";

const router = express.Router();

router.post('/return', createReturn);
router.get('/returns', getReturns);
router.put('/returns/:id', processReturn);

export default router;