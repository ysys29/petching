import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js';

const schema = Joi.object({
  password: Joi.string().optional(),
  newPassword: Joi.string()
    .min(MIN_PASSWORD_LENGTH)
    .pattern(/^\S+$/)
    .when('password', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'any.required': '새 비밀번호를 입력해 주세요.',
      'string.min': `비밀번호는 ${MIN_PASSWORD_LENGTH}글자 이상 입력해 주세요.`,
      'string.pattern.base': '비밀번호에는 공백이 포함될 수 없습니다.',
    }),
  newPasswordConfirm: Joi.string()
    .valid(Joi.ref('newPassword'))
    .pattern(/^\S+$/)
    .when('newPassword', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    })
    .messages({
      'any.required': '새 비밀번호 확인을 입력해 주세요.',
      'any.only': '두 비밀번호가 일치하지 않습니다.',
      'string.pattern.base': '비밀번호에는 공백이 포함될 수 없습니다.',
    }),
  name: Joi.string()
    .pattern(/^[a-zA-Z가-힣\s]+$/)
    .optional()
    .messages({
      'string.pattern.base':
        '이름은 알파벳, 한글 문자와 공백만 포함할 수 있습니다.',
    }),
  introduce: Joi.string()
    .optional()
    .custom((value, helpers) => {
      if (value && value.length > 500) {
        return helpers.message('소개는 500자 이하로 입력해 주세요.');
      }
      return value;
    })
    .messages({
      'string.max': '소개는 500자 이하로 입력해 주세요.',
    }),
  profileImage: Joi.any().optional(), // profileImage는 form-data로 받을 것이므로 any로 설정
});

export const updatePrifileValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
