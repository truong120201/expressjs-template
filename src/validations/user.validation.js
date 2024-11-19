import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

export { createUser };
