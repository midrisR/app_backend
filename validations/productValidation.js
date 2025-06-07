const Joi = require("joi");

const method = (value, helpers) => {
  if (value === "undefined") {
    return helpers.error("any.required");
  }
  return value;
};
const Validation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(225).required().messages({
      "string.base": "should be a type of text",
      "string.empty": "name cannot be an empty field",
      "string.min": "name is required of {#limit}",
      "string.max":
        "name length must be less than or equal to {#limit} characters long",
      "any.required": "name is a required field",
    }),
    categorieId: Joi.string()
      .required()
      .messages({
        "string.base": "should be a type of text",
        "string.empty": "categorie cannot be an empty field",
        "any.required": "categorie is a required field",
      })
      .custom(method, "custom validation"),
    brandId: Joi.string()
      .required()
      .messages({
        "string.base": "should be a type of text",
        "string.empty": "brand cannot be an empty field",
        "any.required": "brand is a required field",
      })
      .custom(method, "custom validation"),
    description: Joi.string().required().messages({
      "string.base": "should be a type of text",
      "string.empty": "description cannot be an empty field",
      "any.required": "description is a required field",
    }),
    metaDescription: Joi.string().required().messages({
      "string.base": "should be a type of text",
      "string.empty": "description cannot be an empty field",
      "any.required": "description is a required field",
    }),
    metaKeywords: Joi.string().required().messages({
      "string.base": "should be a type of text",
      "string.empty": "keywords cannot be an empty field",
      "any.required": "keywords is a required field",
    }),
    published: Joi.string()
      .required()
      .messages({
        "boolean.base": "should be a type of true or false",
        "string.empty": "active cannot be an empty field",
        "any.required": "active is a required field",
      })
      .custom(method, "custom validation"),
  });

  return schema.validate(data, { abortEarly: false });
};
module.exports = Validation;
