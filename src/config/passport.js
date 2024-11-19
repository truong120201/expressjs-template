import { ExtractJwt, Strategy } from 'passport-jwt';
import tokenTypes from './tokens.js';
// import envVars from './envConfig';
// import { User } from ('../models');

const jwtOptions = {
  // secretOrKey: envVars.JWT_SECRET,
  secretOrKey: 'this is a very hard secret key',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    // TODO: models
    // const user = await User.findById(payload.sub);
    const user = {};
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export default jwtStrategy;
