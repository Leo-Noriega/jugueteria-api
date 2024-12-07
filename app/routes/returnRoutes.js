import express from "express";
import { createReturn, getReturns, processReturn, getReturnByOrderId } from "../controllers/returnController.js";

const router = express.Router();

router.post('/return', createReturn);
router.get('/returns', getReturns);
router.get("/returns/:order_id", getReturnByOrderId); 
router.put('/returns/:id', processReturn);


export default router;