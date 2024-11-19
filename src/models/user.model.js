import { DataTypes } from 'sequelize';
import roleConfig from '../config/roles.js';
import sequelize from '../config/sequelize.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
    },
  },
  role: {
    type: DataTypes.ENUM(roleConfig.roles),
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

export default User;
