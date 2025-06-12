const db = require("../models");
const Brands = db.Brand;
const brandValidation = require("../validations/brandValidation");
const asyncHandler = require("express-async-handler");

const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};
exports.findAll = asyncHandler(async (req, res) => {
  const brand = await Brands.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(brand);
});

exports.findById = asyncHandler(async (req, res) => {
  const brand = await Brands.findByPk(req.params.id);
  if (!brand) {
    return res.status(500).json({ success: false, message: "brand not found" });
  }
  return res.status(200).json(brand);
});

exports.create = asyncHandler(async (req, res) => {
  const { error } = brandValidation(req.body);
  const errors = [];
  console.log("body", req.body);

  if (error) {
    error.details.forEach(function (detail) {
      errors.push({
        [detail.path]: detail.message,
      });
    });
    res.status(422);
    throw isEmptyFields(errors);
  }
  const brand = await Brands.create({
    name: req.body.name,
    published: req.body.published,
  });
  return res.status(201).json({ success: true, brand });
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const find = await Brands.findByPk(id);
  const { error } = brandValidation(req.body);
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
    return res.status(500).json({ success: false, message: "brand not found" });
  }
  const brand = await Brands.update(
    {
      name: req.body.name,
      published: req.body.published,
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, brand });
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const find = await Brands.findByPk(id);

  if (!find) {
    return res.status(500).json("categorie not found");
  }
  await Brands.destroy({
    where: { id: id },
  });

  return res
    .status(200)
    .json({ success: true, message: "Brand has been deleted" });
});
