import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '@server/models/authUser';

const JWT_SECRET: string = process.env.JWT_SECRET;

export const signup = async (request: Request, response: Response) => {
  try {
    const { firstname, lastname, username, email, password } = request.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ firstname, lastname, username, email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    return response.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    return response.status(400).json({ message: 'Something went wrong' });
  }
};

export const signin = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return response.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return response.status(200).json({ message: 'User loggedin successfully', token });
  } catch (error) {
    return response.status(400).json({ message: 'Something went wrong' });
  }
};