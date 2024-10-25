const joi = require("joi");
const { user } = require("@/models");

const authBodyValidation = (req, res, next) => {
  const bodySchema = joi.object({
    us_username: joi.string().min(3).max(20).required(),
    us_email: joi.string().email().required(),
    us_phone_number: joi.string().min(10).max(15).required(),
    us_password: joi.string().min(8).required(),
  });
  const validationError = bodySchema.validate(req.body);
  if (validationError.error) {
    return res.status(400).json({
      message: validationError.error.details[0].message,
    });
  }
  next();
};

const authCheckDuplicate = async (req, res, next) => {
  const { us_username, us_email, us_phone_number } = req.body;

  try {
    const userUsername = await user.findOne({ where: { us_username } });
    if (userUsername) {
      return res.status(400).json({
        message: "Username is already taken",
      });
    }

    const userEmail = await user.findOne({ where: { us_email } });
    if (userEmail) {
      return res.status(400).json({
        message: "Email is already taken",
      });
    }

    const userPhoneNumber = await user.findOne({ where: { us_phone_number } });
    if (userPhoneNumber) {
      return res.status(400).json({
        message: "Phone number is already taken",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  authBodyValidation,
  authCheckDuplicate,
};
