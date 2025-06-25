const db = require("../models");
const Employe = db.Employe;
const employeValidation = require("../validations/employeValidation");
const asyncHandler = require("express-async-handler");
const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};
exports.create = asyncHandler(async (req, res) => {
  const { name, email, phone, role } = req.body;
  const { error } = employeValidation(req.body);
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

  const results = await Employe.create({
    name: name,
    email: email,
    phone: phone,
    role: role,
  });
  return res.json({
    message: "Employe created successfully.",
    data: results,
  });
});

exports.findAll = asyncHandler(async (req, res) => {
  const employes = await Employe.findAll({
    order: [["id", "ASC"]],
  });
  return res.status(200).json(employes);
});

exports.findById = asyncHandler(async (req, res) => {
  const employe = await Employe.findByPk(req.params.id);
  return res.json(employe);
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const find = await Employe.findByPk(id);

  const { error } = employeValidation(req.body);
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

  if (!find) {
    return res
      .status(500)
      .json({ success: false, message: "employe not found" });
  }

  const employe = await Employe.update(
    {
      name: req.body.name,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, employe });
});

exports.delete = asyncHandler(async (req, res) => {
  const employes = await Employe.destroy({
    where: {
      id: 1,
    },
  });
  return res.status(200).json({
    status: "success",
    employes,
  });
});
