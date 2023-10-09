import { Request, Response, NextFunction } from 'express';

let isAutheticated: boolean = true;

export const checkAuthentication = (_req: Request, res: Response, next: NextFunction) => {
  if (isAutheticated) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
