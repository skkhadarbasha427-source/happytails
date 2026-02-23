const Joi = require('joi');

exports.validatePhoneNumber = (data) => {
  const schema = Joi.object({
    phoneNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number with country code'
      })
  });
  return schema.validate(data);
};

exports.validateOTP = (data) => {
  const schema = Joi.object({
    phoneNumber: Joi.string().required(),
    otp: Joi.string().length(6).required()
  });
  return schema.validate(data);
};

exports.validatePost = (data) => {
  const schema = Joi.object({
    category: Joi.string().valid('Animal', 'Bird', 'Aquatic').required(),
    description: Joi.string().min(10).max(500).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
  });
  return schema.validate(data);
};

exports.validateProfile = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).optional()
  });
  return schema.validate(data);
};
