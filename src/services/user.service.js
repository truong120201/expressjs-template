import httpStatus from 'http-status';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await new User().isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const getUsers = async (getUserQuery) => {
  try {
    const { page, pageSize, orderBy, sortBy } = getUserQuery;
    return User.paginate({
      page,
      pageSize,
      order: [[orderBy, sortBy]],
      where: {},
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'An error occur');
  }
};

const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

export default { createUser, getUserByEmail, getUsers };
