const Joi = require("joi");

const method = (value, helpers) => {
  if (value === "undefined") {
    return helpers.error("any.required");
  }
  return value;
};
const brandValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(225)
      .required()
      .messages({
        "string.base": " should be a type of text",
        "string.empty": "name cannot be an empty field",
        "string.min": "name is required of {#limit}",
        "string.max":
          "name length must be less than or equal to {#limit} characters long",
        "any.required": "name is a required field",
      })
      .custom(method, "custom validation"),
    published: Joi.boolean()
      .required()
      .messages({
        "boolean.base": " should be a type of true or false",
        "string.empty": "active cannot be an empty field",
        "any.required": "active is a required field",
      })
      .custom(method, "custom validation"),
  });
  return schema.validate(data, { abortEarly: false });
};

module.exports = brandValidation;
