import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: 'First name must contain 4 characters ' })
    .max(255, { message: 'Exceed characters limit' })
    .optional(),
  lastName: z
    .string()
    .min(4, { message: 'last name must contain 4 characters ' })
    .max(255, { message: 'Exceed characters limit' })
    .optional(),
  username: z
    .string()
    .min(4, { message: 'Username must contain 4 characters ' })
    .max(255, { message: 'Exceed characters limit' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain 8 characters' })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
      message: `Password must contain 8 characters, one uppercase letter, one lowercase letter, one numeric digit, one symbol`,
    })
    .optional(),
});

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  try {
    signupSchema.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

let isAutheticated: boolean = true;

export const checkAuthentication = (_req: Request, res: Response, next: NextFunction) => {
  if (isAutheticated) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
