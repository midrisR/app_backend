const Joi = require("joi");

const clientValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "name cannot be an empty field",
      "string.min": "name min of {#limit} characters",
      "string.max":
        "name length must be less than or equal to {#limit} characters long",
      "any.required": "name is a required field",
    }),
    address: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "address cannot be an empty field",
      "string.min": "address min of {#limit} characters",
      "string.max":
        "address length must be less than or equal to {#limit} characters long",
      "any.required": "address is a required field",
    }),
    contact: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "contact cannot be an empty field",
      "string.min": "contact min of {#limit} characters",
      "string.max":
        "contact length must be less than or equal to {#limit} characters long",
      "any.required": "contact is a required field",
    }),
    email: Joi.string().required().messages({
      "string.base": " should be a type of text",
      "string.empty": "email cannot be an empty field",
      "string.min": "email min of {#limit} characters",
      "string.max":
        "email length must be less than or equal to {#limit} characters long",
      "any.required": "email is a required field",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = clientValidation;
