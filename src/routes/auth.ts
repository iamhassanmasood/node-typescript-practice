import { Router } from 'express';
import { signin, signup } from '@server/controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/login', signin);
authRoutes.post('/register', signup);

export default authRoutes;
