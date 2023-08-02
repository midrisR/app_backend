const db = require("../models");
const Vendors = db.Vendor;
const clientValidation = require("../validations/clientValidation");
const asyncHandler = require("express-async-handler");

const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

exports.findAll = asyncHandler(async (req, res) => {
  const vendor = await Vendors.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(vendor);
});

exports.findById = asyncHandler(async (req, res) => {
  const vendor = await Vendors.findByPk(req.params.id);
  if (!vendor) {
    return res
      .status(500)
      .json({ success: false, message: "vendor not found" });
  }
  return res.status(200).json(vendor);
});

exports.create = asyncHandler(async (req, res) => {
  const { error } = clientValidation(req.body);
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

  const vendor = await Vendors.create({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
  });
  return res.status(201).json({ success: true, vendor });
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const find = await Vendors.findByPk(id);
  const { error } = clientValidation(req.body);
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
      .json({ success: false, message: "vendor not found" });
  }

  const vendor = await Vendors.update(
    {
      name: req.body.name || find.name,
      address: req.body.address || find.address,
      contact: req.body.contact || find.contact,
      email: req.body.email || find.email,
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, vendor });
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const find = await Vendors.findByPk(id);

  if (!find) {
    return res.status(500).json("categorie not found");
  }
  await Vendors.destroy({
    where: { id: id },
  });

  return res
    .status(200)
    .json({ success: true, message: "vendor has been deleted" });
});
