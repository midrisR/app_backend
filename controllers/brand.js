const db = require("../models");
const Brands = db.Brand;

exports.findAll = async (req, res) => {
  const brand = await Brands.findAll({
    where: { published: 1 },
  });
  return res.status(200).json(brand);
};
