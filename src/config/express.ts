import { authRoutes, postRoutes, productRoutes, userRoutes } from '@server/routes';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());
  app.use(
    session({
      secret: 'test',
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

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
