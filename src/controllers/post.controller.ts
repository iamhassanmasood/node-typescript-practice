import { Request, Response } from 'express';
import Post from '@server/models/post.model';

export const getAllPosts = async (_request: Request, response: Response) => {
  try {
    const posts = await Post.find();
    return response.status(200).json({ message: 'Success', success: true, data: posts });
  } catch (error) {
    return response.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const createPost = async (request: Request, response: Response) => {
  try {
    const { title, body } = request.body;
    const createdNewPost = await Post.create({ title, body });
    return response.status(200).json({ success: true, message: 'Post created successfully', data: createdNewPost });
  } catch (error) {
    return response.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const getOnePostById = async (request: Request, response: Response) => {
  try {
    const id = request.params._id;
    const selectedPost = await Post.findById(id);
    return response.status(200).json({ message: 'Success', success: true, data: selectedPost });
  } catch (error) {
    return response.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const updateOnePostById = async (request: Request, response: Response) => {
  const _id = request.params.id;
  const { title, body } = request.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, { title, body });
    if (!updatedPost) {
      return response.status(400).json({ success: false, message: 'Product not exist' });
    }
    return response.status(200).json({
      message: '✅ Post updated successfuly',
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    return response.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const deletePostById = async (request: Request, response: Response) => {
  const _id = request.params.id;
  try {
    const deletedPost = await Post.findByIdAndDelete(_id);
    if (!deletedPost) {
      return response.status(400).json({ success: false, message: 'Post not exist' });
    }
    return response.status(200).json({
      message: '✅ Post deleted successfuly',
      success: true,
    });
  } catch (error) {
    return response.status(400).json({ success: false });
  }
};
