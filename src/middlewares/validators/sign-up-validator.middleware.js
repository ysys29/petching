import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../constants/auth.constant.js';
const joiSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
  }),
  password: Joi.string()
    .required()
    .pattern(/^\S+$/)
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH)
    .messages({
      'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQUIRED,
      'string.min': MESSAGES.AUTH.COMMON.PASSWORD.LENGTH,
      'string.max': MESSAGES.AUTH.COMMON.PASSWORD.LENGTH,
      'string.pattern.base': MESSAGES.AUTH.COMMON.PASSWORD.NO_GAP,
    }),
  repeat_password: Joi.string().required().valid(Joi.ref('password')).messages({
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
  experience: Joi.number()
    .optional()
    .messages({ 'number.base': '경력은 숫자로 입력해주세요.' }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
