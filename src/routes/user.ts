import { Router, Request, Response, NextFunction } from 'express';
import { getAllUsers, createUser, findOneUser, updateUser, deleteUser } from '@server/controllers/user.controller';

const userRoutes = Router();

export const testMiddleware = (_request: Request, _response: Response, next: NextFunction) => {
  console.log('Test middleware executed');
  next();
};

userRoutes.get('/user', testMiddleware, getAllUsers);
userRoutes.post('/user', createUser);
userRoutes.get('/user/:id', findOneUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);

export default userRoutes;
