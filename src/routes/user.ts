import { Router } from 'express';
import { getAllUsers, createUser, findOneUser, updateUser, deleteUser } from '@server/controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/user', getAllUsers);
userRoutes.post('/user', createUser);
userRoutes.get('/user/:id', findOneUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);

export default userRoutes;
