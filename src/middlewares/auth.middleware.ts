import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuthentication = (request: Request, response: Response, next: NextFunction): void | Response => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Authentication failed',
    });
  }
};
