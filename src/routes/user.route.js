import express from 'express';
import userControllers from '../controllers/user.controller.js';
import validate from '../middlewares/validate.js';
import { createUser } from '../validations/user.validation.js';

const router = express.Router();

router.route('/').post(validate(createUser), userControllers.createUser);

export default router;
