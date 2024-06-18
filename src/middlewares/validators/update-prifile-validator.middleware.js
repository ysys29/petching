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
      'any.required': '비밀번호를 입력해 주세요.',
      'string.min': '비밀번호는 8글자이상을 입력해 주세요.',
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
      'any.required': '비밀번호 확인을 입력해 주세요.',
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
    }),
  profileImage: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif')
      .required(),
    size: Joi.number()
      .max(5 * 1024 * 1024)
      .required(), // 5MB 제한
  })
    .optional()
    .unknown(true), // profileImage 객체에 정의되지 않은 다른 키들도 허용
});

export const updatePrifileValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
