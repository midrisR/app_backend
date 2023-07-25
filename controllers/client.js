const db = require("../models");
const Clients = db.Client;

exports.findAll = async (req, res) => {
  const client = await Clients.findAll();
  return res.status(200).json(client);
};

exports.findById = async (req, res) => {
  const client = await Clients.findByPk(req.params.id);
  if (!client) {
    return res
      .status(500)
      .json({ success: false, message: "client not found" });
  }
  return res.status(200).json(client);
};

exports.create = async (req, res) => {
  const client = await Clients.create({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    email: req.body.email,
  });
  return res.status(201).json({ success: true, client });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const find = await Clients.findByPk(id);

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
};

exports.delete = async (req, res) => {
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
};
