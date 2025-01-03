import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    loginUser,
    updatePassword,
    requestPasswordReset,
    updatePasswordWithCode, 
    getUserByEmail
 } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/users', getUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.get('/users/email/:email', getUserByEmail)
router.put('/users/:id', authMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);
router.post('/login', loginUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/password', updatePassword);
router.post('/users/recovery-password', requestPasswordReset);
router.post('/users/update-password', updatePasswordWithCode);

export default router;
