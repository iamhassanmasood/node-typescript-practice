import authRoutes from '@server/routes/auth';
import postRoutes from '@server/routes/post';
import productRoutes from '@server/routes/product';
import userRoutes from '@server/routes/user';
import express from 'express';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/', (_req, res) => {
    res.send('Test');
  });

  app.use('/api', userRoutes);
  app.use('/api', productRoutes);
  app.use('/api', postRoutes);
  app.use('', authRoutes);

  return app;
};

export { createServer };
