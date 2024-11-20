import bcryptjs from 'bcryptjs';
import { DataTypes } from 'sequelize';
import { roles } from '../config/roles.js';
import sequelize from '../config/sequelize.js';
import paginate from './plugins/pagination.js';

const SALT_ROUNDS = 10;

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
    type: DataTypes.ENUM(roles),
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

User.beforeCreate(async (user) => {
  user.password = await bcryptjs.hash(user.password, SALT_ROUNDS);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcryptjs.hash(user.password, SALT_ROUNDS);
  }
});

User.prototype.validatePassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

User.prototype.isEmailTaken = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

User.paginate = paginate;

export default User;
