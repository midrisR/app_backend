const fs = require("fs");
const db = require("../models");
const Categories = db.Categorie;

exports.findAll = async (req, res) => {
  const categorie = await Categories.findAll({
    where: { published: 1 },
    order: [["id", "DESC"]],
  });
  return res.status(200).json(categorie);
};
exports.findById = async (req, res) => {
  const categorie = await Categories.findByPk(req.params.id);
  return res.status(200).json(categorie);
};

exports.create = async (req, res) => {
  const { filename } = req.files[0];

  const categorie = await Categories.create({
    name: req.body.name,
    image: filename,
    published: req.body.published,
  });
  if (categorie) {
    fs.mkdirSync(`public/images/categories/${categorie.id}`);
    const currentPath = "public/images/categories/" + filename;
    const destinationPath =
      `public/images/categories/${categorie.id}/` + filename;
    fs.renameSync(currentPath, destinationPath);
  }
  return res.status(201).json({ success: true, categorie, image: filename });
};
