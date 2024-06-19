import Joi from 'joi';

const schema = Joi.object({
  animalType: Joi.string().required().valid('DOG', 'CAT', 'ETC').messages({
    'any.required': '동물 타입을 선택해 주세요',
    'any.only': '동물 타입은 DOG, CAT, ETC 중 선택할 수 있습니다.',
  }),
  serviceType: Joi.string()
    .required()
    .valid('WALK', 'SHOWER', 'PICKUP', 'FEED')
    .messages({
      'any.required': '서비스 유형을 선택해 주세요',
      'any.only':
        '서비스 유형은 WALK, SHOWER, PICKUP, FEED 중 선택할 수 있습니다.',
    }),
  price: Joi.number()
    .required()
    .messages({
      'number.base': '가격은 숫자로 입력해 주세요.',
      'any.required': '서비스 가격을 입력해 주세요.',
    }),
});

export const updateServiceValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
