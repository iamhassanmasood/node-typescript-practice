import { Router } from 'express';
import {
  getAllPosts,
  createPost,
  getOnePostById,
  updateOnePostById,
  deletePostById,
} from '@server/controllers/post.controller';

const postRoutes = Router();

postRoutes.get('/post', getAllPosts);
postRoutes.post('/post', createPost);
postRoutes.get('/post/:id', getOnePostById);
postRoutes.put('/post/:id', updateOnePostById);
postRoutes.delete('/post/:id', deletePostById);

export default postRoutes;
