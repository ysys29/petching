import Joi from 'joi';

const schema = Joi.object({
  petsitterId: Joi.number().required().messages({
    'number.base': '펫시터의 아이디는 숫자로 입력해주세요.',
    'any.required': '예약할 펫시터의 아이디를 입력해 주세요.',
  }),
  animalType: Joi.string().required().valid('DOG', 'CAT', 'ETC').messages({
    'any.required': '동물 유형을 입력해 주세요',
    'any.only': '동물 타입은 DOG, CAT, ETC 중 선택할 수 있습니다.',
  }),
  serviceType: Joi.string()
    .required()
    .valid('WALK', 'SHOWER', 'PICKUP', 'FEED')
    .messages({
      'any.required': '서비스 유형은 필수입니다.',
      'any.only':
        '서비스 유형은 WALK, SHOWER, PICKUP, FEED 중 선택할 수 있습니다.',
    }),
  location: Joi.string()
    .required()
    .messages({ 'any.required': '예약 장소를 선택해 주세요.' }),
  content: Joi.string().optional(),
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
      'any.required': '날짜를 선택해 주세요.',
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
