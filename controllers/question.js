const db = require("../models");
const Questions = db.Questions;
const questionValidation = require("../validations/questionValidation");
const asyncHandler = require("express-async-handler");
const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};
exports.create = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  const { error } = questionValidation(req.body);
  const errors = [];
  if (error) {
    error.details.forEach(function (detail) {
      errors.push({
        [detail.path]: detail.message,
      });
    });
    res.status(422);
    throw isEmptyFields(errors);
  }

  const results = await Questions.create({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });
  return res.status(201).json({
    success: true,
    message: "Questions created successfully.",
    data: results,
  });
});

exports.findAll = asyncHandler(async (req, res) => {
  const question = await Questions.findAll({
    order: [["id", "ASC"]],
  });
  return res.status(200).json(question);
});

exports.findById = asyncHandler(async (req, res) => {
  const question = await Questions.findByPk(req.params.id);
  return res.json({ success: true, question });
});

exports.delete = asyncHandler(async (req, res) => {
  const question = await Questions.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({
    status: "success",
    question,
  });
});
