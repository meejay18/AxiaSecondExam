import express from 'express';
import {
 createUser,
 deleteUser,
 getAllUsers,
 loginUser,
 updateUser,
} from '../controller/user.controller.js';
const router = express.Router();

router.post('/createuser', createUser);
router.get('/getallusers', getAllUsers);
router.put('/updateuser/:id', updateUser);
router.post('/loginuser', loginUser);
router.delete('/deleteuser/:id', deleteUser);

export default router;
