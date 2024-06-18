import Joi from 'joi';

const schema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'any.required': '평점을 입력해 주세요.',
    'number.base': '평점은 숫자여야 합니다.',
    'number.min': '평점은 최소 1점이어야 합니다.',
    'number.max': '평점은 최대 5점이어야 합니다.',
    ㄴ,
  }),
  comment: Joi.string().required().messages({
    'any.required': '리뷰를 입력해 주세요.',
  }),
});

export const reviewValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
