import Joi from 'joi';

const schema = Joi.object({
  animalType: Joi.string().required().messages({
    'any.required': '동물 유형을 입력해 주세요',
    'string.base': '동물은 문자열이어야 합니다.',
  }),
  service: Joi.string().required().messages({
    'any.required': '서비스 유형은 필수입니다.',
    'string.base': '서비스 유형은 문자열이어야 합니다.',
  }),
  content: Joi.string().optional().messages({
    'string.base': '요구 사항은 문자로 입력해 주세요.',
  }),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .custom((value, helpers) => {
      // 날짜 유효성 검증
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return helpers.message('유효한 날짜를 입력해 주세요.');
      }
      const [year, month, day] = value.split('-').map(Number);
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
      ) {
        return helpers.message('유효한 날짜를 입력해 주세요.');
      }
      // 당일 이전 날짜를 허용하지 않음
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘 날짜의 00:00:00로 설정
      if (date < today) {
        return helpers.message('날짜는 오늘 이후여야 합니다.');
      }
      return value;
    })
    .messages({
      'any.required': '날짜는 필수입니다.',
      'string.pattern.base': '날짜는 YYYY-MM-DD 형식이어야 합니다.',
    }),
});

export const bookingsValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
