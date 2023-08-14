const fs = require("fs");
const db = require("../models");
const Categories = db.Categorie;
const Products = db.Product;
const brandValidation = require("../validations/brandValidation");
const asyncHandler = require("express-async-handler");
const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

exports.findAll = asyncHandler(async (req, res) => {
  const categorie = await Categories.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(categorie);
});

exports.findById = asyncHandler(async (req, res) => {
  const categorie = await Categories.findByPk(req.params.id, {
    include: [
      {
        model: Products,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
  return res.status(200).json(categorie);
});

exports.create = asyncHandler(async (req, res) => {
  const { error } = brandValidation(req.body);
  const errors = [];

  if (req.files.length < 1) {
    errors.push({ images: "image cannot be an empty field" });
  }

  if (error || req.files.length < 1) {
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      fs.unlinkSync(path);
    }
    error?.details?.forEach(function (detail) {
      errors.push({
        [detail.path]: detail.message,
      });
    });
    res.status(422);
    throw isEmptyFields(errors);
  }

  const categorie = await Categories.create({
    name: req.body.name,
    image: req.files[0].filename,
    published: req.body.published,
  });

  if (categorie) {
    fs.mkdirSync(`public/images/categories/${categorie.id}`);
    const currentPath = "public/images/categories/" + req.files[0].filename;
    const destinationPath =
      `public/images/categories/${categorie.id}/` + req.files[0].filename;
    fs.renameSync(currentPath, destinationPath);
  }
  return res
    .status(201)
    .json({ success: true, categorie, image: req.files[0].filename });
});

exports.updateCategorie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findCategorie = await Categories.findByPk(id);

  if (!findCategorie) {
    return res.status(500).json("categorie not found");
  }
  const { error } = brandValidation(req.body);
  const errors = [];

  if (error) {
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      fs.unlinkSync(path);
    }
    error?.details?.forEach(function (detail) {
      errors.push({
        [detail.path]: detail.message,
      });
    });
    res.status(422);
    throw isEmptyFields(errors);
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
});

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
