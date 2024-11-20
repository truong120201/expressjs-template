import app from './app.js';
import logger from './config/logger.js';
import sequelize from './config/sequelize.js';
import models from './models/index.js';
import { createAdminUser } from './seed/seed.js';

let server;
const PORT = 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to database');
    models.User.sync().then(createAdminUser);
  })
  .then(() => {
    server = app.listen(PORT, () => {
      logger.info(`Listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to connect to database or create entities', error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
