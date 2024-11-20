import Joi from 'joi';
import { ROLE_KEYS } from '../config/roles.js';

const LoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const AdminCreateUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().required().valid(ROLE_KEYS.ADMIN, ROLE_KEYS.USER),
  }),
};

export { AdminCreateUserSchema, LoginSchema };