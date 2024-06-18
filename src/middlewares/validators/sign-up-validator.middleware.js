import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

export const signupValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
          'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
          'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
        }),
      password: Joi.string().required().min(6).max(12).messages({
        'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
        'string.base': MESSAGES.AUTH.COMMON.PASSWORD.NO_STRING,
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
      profile_image: Joi.Joi.string().uri().messages({
        'string.base': MESSAGES.AUTH.COMMON.PROFILE_IMAGE,
      }),
    });
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
