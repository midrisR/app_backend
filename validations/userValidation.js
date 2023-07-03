const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(225).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "name cannot be an empty field",
      "string.min": "name min of {#limit} characters",
      "string.max":
        "name length must be less than or equal to {#limit} characters long",
      "any.required": "name is a required field",
    }),
    email: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "email cannot be an empty field",
      "string.min": "email min of {#limit} characters",
      "string.max":
        "email length must be less than or equal to {#limit} characters long",
      "any.required": "email is a required field",
    }),
    password: Joi.string().min(5).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "password cannot be an empty field",
      "string.min": "password min of {#limit} characters",
      "string.max":
        "password length must be less than or equal to {#limit} characters long",
      "any.required": "password is a required field",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "email cannot be an empty field",
      "string.min": "email min of {#limit} characters",
      "string.max":
        "email length must be less than or equal to {#limit} characters long",
      "any.required": "email is a required field",
    }),
    password: Joi.string().min(5).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "password cannot be an empty field",
      "string.min": "password min of {#limit} characters",
      "string.max":
        "password length must be less than or equal to {#limit} characters long",
      "any.required": "password is a required field",
    }),
  });
  const { error } = schema.validate(data, { abortEarly: false });
  return error?.details;
};

module.exports = { userValidation, loginValidation };
