import envVars from '../config/envConfig.js';
import logger from '../config/logger.js';
import { ROLE_KEYS } from '../config/roles.js';
import User from '../models/user.model.js';

const createAdminUser = async () => {
  try {
    const existedAdmin = await User.findOne({ where: { role: ROLE_KEYS.ADMIN } });
    if (!existedAdmin) {
      const initialAdminUser = await User.create({
        name: envVars.INITIAL_ADMIN_USERNAME,
        email: envVars.INITIAL_ADMIN_EMAIL,
        password: envVars.INITIAL_ADMIN_PASSWORD,
        role: ROLE_KEYS.ADMIN,
        isEmailVerified: true,
      });
      if (!initialAdminUser) {
        logger.error('Error creating admin user:');
        throw new Error('Error when init admin user');
      }
      logger.info('Created seed Admin');
    } else {
      logger.info('Admin user already exists');
    }
  } catch (error) {
    logger.error('Error creating admin user:', error);
    throw new Error('Error when init admin user');
  }
};

export { createAdminUser };
