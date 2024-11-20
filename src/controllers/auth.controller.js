import httpStatus from 'http-status';
import { ROLE_KEYS } from '../config/roles.js';
import authService from '../services/auth.service.js';
import tokenService from '../services/token.service.js';
import useService from '../services/user.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const register = catchAsync(async (req, res) => {
  const body = req.body;
  const user = await useService.createUser({
    email: body.email,
    password: body.password,
    name: body.name,
    role: ROLE_KEYS.USER,
    isEmailVerified: false,
  });
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, JSON.stringify(error.errors));
  }
});

export default {
  register,
  login,
};
