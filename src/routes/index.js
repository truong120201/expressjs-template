import express from 'express';
import testRoutes from './test.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/test',
    route: testRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
