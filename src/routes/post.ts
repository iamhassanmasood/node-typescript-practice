import { Router } from 'express';
import {
  getAllPosts,
  createPost,
  getOnePostById,
  updateOnePostById,
  deletePostById,
} from '@server/controllers/post.controller';
import { checkAuthentication } from '@server/middlewares/auth.middleware';

const postRoutes: Router = Router();

postRoutes.get('/post', checkAuthentication, getAllPosts);
postRoutes.post('/post', checkAuthentication, createPost);
postRoutes.get('/post/:id', checkAuthentication, getOnePostById);
postRoutes.put('/post/:id', checkAuthentication, updateOnePostById);
postRoutes.delete('/post/:id', checkAuthentication, deletePostById);

export default postRoutes;
