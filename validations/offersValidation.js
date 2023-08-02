const Joi = require("joi");

const offersValidation = (data) => {
  const schema = Joi.object({
    product: Joi.string().max(225).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "product cannot be an empty field",
      "string.min": "product is required of {#limit}",
      "string.max":
        "product length must be less than or equal to {#limit} characters long",
      "any.required": "product is a required field",
    }),
    vendorId: Joi.string().required().messages({
      "string.base": "should be a type of text",
      "string.empty": "vendor cannot be an empty field",
      "any.required": "vendor is a required field",
    }),
    price: Joi.string().max(225).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "price cannot be an empty field",
      "string.min": "price is required of {#limit}",
      "string.max":
        "price length must be less than or equal to {#limit} characters long",
      "any.required": "price is a required field",
    }),
    date: Joi.string().max(225).required().messages({
      "string.base": " should be a type of text",
      "string.empty": "date cannot be an empty field",
      "string.min": "date is required of {#limit}",
      "string.max":
        "date length must be less than or equal to {#limit} characters long",
      "any.required": "date is a required field",
    }),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = offersValidation;
