const db = require("../models");
const Offers = db.Offer;
const Vendor = db.Vendor;
const offersValidation = require("../validations/offersValidation");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

exports.findAll = async (req, res) => {
  const client = await Offers.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: Vendor,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
  return res.status(200).json(client);
};

exports.findById = asyncHandler(async (req, res) => {
  const client = await Offers.findByPk(req.params.id);
  if (!client) {
    return res
      .status(500)
      .json({ success: false, message: "client not found" });
  }
  return res.status(200).json(client);
});

exports.create = asyncHandler(async (req, res) => {
  const { error } = offersValidation(req.body);
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

  const offers = await Offers.create({
    product: req.body.product,
    vendorId: req.body.vendorId,
    price: req.body.price,
    date: moment(req.body.date, "MM/DD/YYYY").toDate(),
  });
  return res.status(201).json({ success: true, offers });
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const find = await Offers.findByPk(id);

  const { error } = offersValidation(req.body);
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
      .json({ success: false, message: "offers not found" });
  }

  const offers = await Offers.update(
    {
      product: req.body.product,
      vendorId: req.body.vendorId,
      price: req.body.price,
      date: moment(req.body.date, "MM/DD/YYYY").toDate(),
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, offers });
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const find = await Offers.findByPk(id);

  if (!find) {
    return res.status(500).json("categorie not found");
  }
  await Offers.destroy({
    where: { id: id },
  });

  return res
    .status(200)
    .json({ success: true, message: "client has been deleted" });
});
