import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import passport from 'passport';
import { errorHandler, successHandler } from './config/morgan.js';
import jwtStrategy from './config/passport.js';
import { errorConverter } from './middlewares/error.js';
import routes from './routes/index.js';
import ApiError from './utils/ApiError.js';

const app = express();

// handle error and success
app.use(errorHandler);
app.use(successHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/v1', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

export default app;
