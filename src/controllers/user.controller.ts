import { Request, Response } from 'express';
import User, { IUser } from '@server/models/user.model';

const sendSuccessResponse = (response: Response, message: string, data: IUser | IUser[]) => {
  return response.status(200).json({ success: true, message, data });
};

const sendErrorResponse = (response: Response, message: string) => {
  return response.status(400).json({ success: false, message });
};

export const getAllUsers = async (_request: Request, response: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return sendSuccessResponse(response, 'OK', users);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const createUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { name, email } = request.body;
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return sendErrorResponse(response, 'User with the same name or email already exists');
    }
    const newUser = await User.create({ name, email });
    return sendSuccessResponse(response, 'User created successfully', newUser);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const findOneUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { id } = request.params;
    const selectedUser = await User.findById(id);
    return sendSuccessResponse(response, 'OK', selectedUser);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const updateUser = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;
  const { name, email } = request.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email });
    if (!updatedUser) {
      return sendErrorResponse(response, 'User not found');
    }
    return sendSuccessResponse(response, 'User updated successfully', updatedUser);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};

export const deleteUser = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { id } = request.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return sendErrorResponse(response, 'User not found');
    }
    return sendSuccessResponse(response, 'User deleted successfully', null);
  } catch (error) {
    return sendErrorResponse(response, 'Something went wrong ☹️');
  }
};
