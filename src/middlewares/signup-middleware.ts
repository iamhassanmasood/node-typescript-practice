import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z
    .string()
    .min(4, { message: 'First name must contain 4 characters' })
    .max(255, { message: 'Exceed characters limit' })
    .optional(),
  lastName: z
    .string()
    .min(4, { message: 'last name must contain 4 characters' })
    .max(255, { message: 'Exceed characters limit' })
    .optional(),
  username: z
    .string()
    .min(4, { message: 'Username must contain 4 characters' })
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

export const validateSignup = (request: Request, response: Response, next: NextFunction) => {
  try {
    signupSchema.parse(request.body);
    return next();
  } catch (error) {
    return response.status(400).json({ error });
  }
};
