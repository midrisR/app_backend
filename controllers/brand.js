const db = require("../models");
const Brands = db.Brand;

exports.findAll = async (req, res) => {
  const brand = await Brands.findAll();
  return res.status(200).json(brand);
};

exports.findById = async (req, res) => {
  const brand = await Brands.findByPk(req.params.id);
  if (!brand) {
    return res.status(500).json({ success: false, message: "brand not found" });
  }
  return res.status(200).json(brand);
};

exports.create = async (req, res) => {
  const brand = await Brands.create({
    name: req.body.name,
    published: req.body.published,
  });
  return res.status(201).json({ success: true, brand });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const find = await Brands.findByPk(id);

  if (!find) {
    return res.status(500).json({ success: false, message: "brand not found" });
  }
  const brand = await Brands.update(
    {
      name: req.body.name || find.name,
      published: req.body.published || find.published,
    },
    { where: { id: id } }
  );

  return res.status(200).json({ success: true, brand });
};

exports.delete = async (req, res) => {
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
};
