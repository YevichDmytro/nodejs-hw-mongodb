import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.number().integer().required(),
  email: Joi.string().email().min(3).max(30),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .min(3)
    .max(30)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  phoneNumber: Joi.number().integer().max(12),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
