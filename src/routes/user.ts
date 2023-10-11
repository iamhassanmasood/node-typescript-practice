import { Router } from 'express';
import { getAllUsers, createUser, findOneUser, updateUser, deleteUser } from '@server/controllers/user.controller';
import { checkAuthentication } from '@server/middlewares/auth.middleware';

const userRoutes: Router = Router();

userRoutes.get('/user', checkAuthentication, getAllUsers);
userRoutes.post('/user', checkAuthentication, createUser);
userRoutes.get('/user/:id', checkAuthentication, findOneUser);
userRoutes.put('/user/:id', checkAuthentication, updateUser);
userRoutes.delete('/user/:id', checkAuthentication, deleteUser);

export default userRoutes;
