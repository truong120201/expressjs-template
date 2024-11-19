import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import { createUser } from '../validations/user.validation.js';

const router = express.Router();

router.route('/').post(validate(createUser), authControllers.register);

export default router;
