import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해 주세요.',
    'string.email': '이메일의 형식이 올바르지 않습니다.',
  }),
  password: Joi.string()
    .required()
    .pattern(/^\S+$/)
    .min(MIN_PASSWORD_LENGTH)
    .trim()
    .messages({
      'any.required': '비밀번호를 입력해 주세요.',
      'string.min': '비밀번호는 8글자이상을 입력해 주세요.',
      'string.pattern.base': '비밀번호에는 공백이 포함될 수 없습니다.',
    }),
  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .trim()
    .messages({
      'any.required': '비밀번호 확인을 입력해 주세요.',
      'any.only': '두 비밀번호가 일치하지 않습니다.',
      'string.pattern.base': '비밀번호에는 공백이 포함될 수 없습니다.',
    }),
  name: Joi.string().required().messages({
    'any.required': '이름을 입력해 주세요.',
  }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
