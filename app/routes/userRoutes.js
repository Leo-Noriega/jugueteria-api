import express from 'express';
import { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    requestPasswordReset,
    updatePasswordWithCode
 } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.put('/users/:id/password', updatePassword);
router.delete('/users/:id', deleteUser);
router.post('/users/request-password-reset', requestPasswordReset);
router.post('/users/update-password-with-code', updatePasswordWithCode);


export default router;
