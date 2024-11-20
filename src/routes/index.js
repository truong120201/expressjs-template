import express from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
