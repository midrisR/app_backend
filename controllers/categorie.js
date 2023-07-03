const db = require("../models");
const Categories = db.Categorie;

exports.findAll = async (req, res) => {
  const categorie = await Categories.findAll({
    where: { published: 1 },
  });
  return res.status(200).json(categorie);
};
