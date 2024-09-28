import Joi from 'joi';
import { emailRegex } from '../constants/user.js';

export const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required(),
});
