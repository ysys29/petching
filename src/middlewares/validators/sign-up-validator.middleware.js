import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { request } from 'express';

const joiSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
      'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    }),
  password: Joi.string().required().min(6).max(12).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.LENGTH,
    'string.max': MESSAGES.AUTH.COMMON.PASSWORD.LENGTH,
  }),
  repeat_password: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.required': MESSAGES.AUTH.COMMON.REPEAT_PASSWORD.REQUIRED,
      'any.only': MESSAGES.AUTH.COMMON.REPEAT_PASSWORD.NOT_MATCHED,
    }),
  name: Joi.string().required().messages({
    'string.base': MESSAGES.AUTH.COMMON.NAME.NO_STRING,
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQUIRED,
  }),
  introduce: Joi.string().messages({
    'string.base': MESSAGES.AUTH.COMMON.INTRODUCE.NO_STRING,
  }),
  profileImage: Joi.string().uri().messages({
    'string.uri': MESSAGES.AUTH.COMMON.PROFILE_IMAGE.NO_STRING,
  }),
});

export const signupValidator = async (req, res, next) => {
  try {
    console.log(req.body)
    await joiSchema.validateAsync(req.body)
    next();
  } catch(error) {
    next(error)
  }
}