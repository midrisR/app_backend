const db = require("../models");
const Clients = db.Client;
const clientValidation = require("../validations/clientValidation");
const asyncHandler = require("express-async-handler");

const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

exports.findAll = async (req, res) => {
  const client = await Clients.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(client);
};

exports.findById = asyncHandler(async (req, res) => {
  const client = await Clients.findByPk(req.params.id);
  if (!client) {
    return res
      .status(500)
      .json({ success: false, message: "client not found" });
  }
  return res.status(200).json(client);
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

  const client = await Clients.create({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
  });
  return res.status(201).json({ success: true, client });
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const find = await Clients.findByPk(id);

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
      .json({ success: false, message: "client not found" });
  }

  const client = await Clients.update(
    {
      name: req.body.name || find.name,
      address: req.body.address || find.address,
      contact: req.body.contact || find.contact,
      email: req.body.email || find.email,
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, client });
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const find = await Clients.findByPk(id);

  if (!find) {
    return res.status(500).json("categorie not found");
  }
  await Clients.destroy({
    where: { id: id },
  });

  return res
    .status(200)
    .json({ success: true, message: "client has been deleted" });
});
