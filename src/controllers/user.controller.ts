import { Request, Response } from 'express';
import User from '@server/models/user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  console.log(req);
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: 'OK', data: users });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(200).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selectedUser = await User.findById(id);
    res.status(200).json({ success: true, message: 'OK', data: selectedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email });
    res.status(200).json({ success: true, message: 'User created successfully', data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};
