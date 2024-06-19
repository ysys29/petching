import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
  }),
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
  }),
});

export const signInValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
