import Joi from 'joi';

const schema = Joi.object({
  location: Joi.string().required().messages({
    'any.required': '추가할 서비스 장소를 입력해주세요.',
  }),
  surcharge: Joi.number().optional().messages({
    'number.base': '추가금은 숫자로 입력해 주세요.',
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
