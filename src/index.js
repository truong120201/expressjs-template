import app from './app.js';
import logger from './config/logger.js';
import sequelize from './config/sequelize.js';
import models from './models/index.js';
import { createAdminUser } from './seed/seed.js';

let server;
const PORT = 3000;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const startServer = async () => {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate();
      logger.info('Connected to database');

      await models.User.sync();
      await createAdminUser();

      server = app.listen(PORT, () => {
        logger.info(`Listening on port ${PORT}`);
      });
      return;
    } catch (error) {
      retries++;
      logger.error(`Failed to connect to the database, attempt ${retries}/${MAX_RETRIES}`, error);
      
      if (retries < MAX_RETRIES) {
        logger.info(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); 
      } else {
        logger.error('Max retries reached, exiting application');
        process.exit(1);
      }
    }
  }
};

startServer();

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
