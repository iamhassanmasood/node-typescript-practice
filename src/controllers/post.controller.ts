import { Request, Response } from 'express';
import Post from '@server/models/post.model';

export const getAllPosts = async (request: Request, response: Response) => {
  console.log(request);
  try {
    const posts = await Post.find();
    response.status(200).json({ message: 'Success', success: true, data: posts });
  } catch (error) {
    response.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    const createNewPost = await Post.create({ title, body });
    res.status(200).json({ success: true, message: 'Post created successfully', data: createNewPost });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const getOnePostById = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const selectedPost = await Post.findById(id);
    res.status(200).json({ message: 'Success', success: true, data: selectedPost });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const updateOnePostById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const { title, body } = req.body;
    try {
      const updatedPost = await Post.findByIdAndUpdate(_id, { title, body });
      res.status(200).json({
        message: '✅ Post updated successfuly',
        success: true,
        data: updatedPost,
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    try {
      await Post.findByIdAndDelete(_id);
      res.status(200).json({
        message: '✅ Post deleted successfuly',
        success: true,
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Something went wrong ☹️' });
  }
};
