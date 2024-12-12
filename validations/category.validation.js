const joi = require("joi");

const categoryBodyValidation = (req, res, next) => {
  const bodySchema = joi.object({
    ct_name: joi.string().min(3).max(50).required(),
    ct_code: joi.string().min(3).max(10).required(),
    ct_game_publisher: joi.string().min(3).max(50).required(),
    ct_currency_type: joi.string().min(3).max(10).required(),
  });
  const validationError = bodySchema.validate(req.body);
  if (validationError.error) {
    return res.status(400).json({
      message: validationError.error.details[0].message,
    });
  }
  next();
};

module.exports = {
  categoryBodyValidation,
};
