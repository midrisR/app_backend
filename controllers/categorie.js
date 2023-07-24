const fs = require("fs");
const db = require("../models");
const { log } = require("console");
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
exports.updateCategorie = async (req, res) => {
  const { id } = req.params;

  const findCategorie = await Categories.findByPk(id);

  if (!findCategorie) {
    return res.status(500).json("categorie not found");
  }

  const categorie = await Categories.update(
    {
      name: req.body.name,
      image: req?.files[0]?.filename || findCategorie.image,
      published: req.body.published,
    },
    { where: { id: req.params.id } }
  );

  if (req.files.length > 0) {
    const { filename } = req?.files[0];
    const currentPath = "public/images/categories/" + filename;
    const destinationPath = `public/images/categories/${id}/` + filename;
    fs.renameSync(currentPath, destinationPath);
    fs.unlinkSync(`public/images/categories/${id}/${findCategorie.image}`);
  }
  return res.status(200).json({
    success: true,
    categorie,
    images: req?.files[0]?.filename || findCategorie.image,
  });
};

exports.deleteCategorie = async (req, res) => {
  const { id } = req.params;

  const findCategorie = await Categories.findByPk(id);

  if (!findCategorie) {
    return res.status(500).json("categorie not found");
  }
  const remove = await Categories.destroy({
    where: {
      id: id,
    },
  });
  fs.rmSync(`public/images/categories/${req.params.id}`, { recursive: true });
  return res
    .status(200)
    .json({ success: true, message: "Categorie has been deleted" });
};
