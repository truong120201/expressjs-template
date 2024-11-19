import httpStatus from 'http-status';
import tokenService from '../services/token.service.js';
import useService from '../services/user.service.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const register = catchAsync(async (req, res) => {
  try {
    const user = await useService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, JSON.stringify(error.errors));
  }
});

export default {
  register,
};
