import Joi from 'joi';

const schema = Joi.object({
  status: Joi.string()
    .required()
    .valid('REJECTED', 'PENDING', 'APPROVED', 'DONE')
    .messages({
      'any.required': '변경할 상태를 입력해 주세요',
      'any.only': '상태는 REJECTED, PENDIGN, APPROVED, DONE만 선택 가능합니다.',
    }),
});

export const updateBookingStatusValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
