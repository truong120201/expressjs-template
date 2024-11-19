import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  res.status(500).send({ test: 'test' });
});

export default router;
