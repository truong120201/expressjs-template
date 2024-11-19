import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    // TODO: secret keys
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default envVars;
