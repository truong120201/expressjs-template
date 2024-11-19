import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
// import { userService } from'../services';
import User from '../models/user.model.js';

const createUser = catchAsync(async (req, res) => {
  // const user = await userService.createUser(req.body);
  // res.status(httpStatus.CREATED).send(user);
  try {
    const user = await User.create(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, JSON.stringify(error.errors));
  }
});

export default {
  createUser,
};

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//   await userService.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });
