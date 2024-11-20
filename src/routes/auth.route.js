import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.js';
import { LoginSchema } from '../validations/auth.validation.js';
import { createUser } from '../validations/user.validation.js';

const router = express.Router();

router.post('/register', validate(createUser), authControllers.register);
router.post('/login', validate(LoginSchema), authControllers.login);

export default router;
