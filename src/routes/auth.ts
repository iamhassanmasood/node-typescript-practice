import { Router } from 'express';
import { signin, signup } from '@server/controllers/auth.controller';
import { validateSignup } from '@server/middlewares/signup-middleware';

const authRoutes: Router = Router();

authRoutes.post('/login', signin);
authRoutes.post('/register', validateSignup, signup);

export default authRoutes;
