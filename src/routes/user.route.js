import express from 'express';
import { ROLE_RIGHT_KEYS } from '../config/roles.js';
import userControllers from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import { getUsers } from '../validations/user.validation.js';

const router = express.Router();

router.route('/').get(auth(ROLE_RIGHT_KEYS.GET_USERS), validate(getUsers), userControllers.getUsers);
// router.route('/').get(validate(getUsers), userControllers.getUsers);

export default router;
