const Joi = require('joi');

exports.validateEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address'
      })
  });
  return schema.validate(data);
};

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
    email: Joi.string().email().required(),
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
    name: Joi.string().min(2).max(50).optional(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
      'string.pattern.base': 'Please provide a valid 10-digit phone number'
    })
  });
  return schema.validate(data);
};
