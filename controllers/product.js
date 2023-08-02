const fs = require("fs");
const db = require("../models");
const Products = db.Product;
const Images = db.Image;
const Categories = db.Categorie;
const Brands = db.Brand;
const validation = require("../validations/productValidation");
const asyncHandler = require("express-async-handler");
const { getPagination, getPagingData } = require("../helper/paginate");

const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

const getProducts = async (req, res) => {
  const { page, perPage } = req.query;
  const { limit, offset } = getPagination(page, perPage);
  const { count, rows } = await Products.findAndCountAll({
    distinct: true,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Brands,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Categories,
        attributes: {
          exclude: ["id", "image", "published", "createdAt", "updatedAt"],
        },
      },
      {
        model: Images,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
    limit,
    offset,
  });
  const data = { count: count, rows };
  const products = getPagingData(data, page, limit);
  return res.status(200).json({ products, total: products.length });
};

const getProductsByid = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findByPk(id, {
    include: [
      {
        model: Images,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.status(200).json(product);
};

const addProduct = asyncHandler(async (req, res) => {
  const images = [];
  const { error } = validation(req.body);
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
  const product = await Products.create({
    name: req.body.name,
    categorieId: req.body.categorieId,
    description: req.body.description,
    brandId: req.body.brandId,
    tag: req.body.tag,
    metaDescription: req.body.metaDescription,
    metaKeywords: req.body.metaKeywords,
    published: req.body.published,
  });

  fs.mkdirSync(`public/images/item/${product.id}`);

  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];
    images.push({ name: filename, productId: product.id });
    const currentPath = "public/images/item/" + filename;
    const destinationPath = `public/images/item/${product.id}/` + filename;
    fs.renameSync(currentPath, destinationPath);
  }
  const image = await Images.bulkCreate(images);
  return res.status(201).json({ success: true, product, image });
});

const updateProduct = asyncHandler(async (req, res) => {
  const images = [];
  const { id } = req.params;
  const { error } = validation(req.body);
  const errors = [];

  const findPrc = await Products.findByPk(id, {
    include: [
      {
        model: Images,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!findPrc) {
    return res.status(500).json("someting error");
  }

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

  const product = await Products.update(
    {
      name: req.body.name,
      categorieId: req.body.categorieId,
      description: req.body.description,
      brandId: req.body.brandId,
      tag: req.body.tag,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,
      published: req.body.published,
    },
    { where: { id: req.params.id } }
  );

  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      const { filename } = req.files[i];
      images.push({ name: filename, productId: id });
      const currentPath = "public/images/item/" + filename;
      const destinationPath = `public/images/item/${id}/` + filename;
      fs.renameSync(currentPath, destinationPath);
    }
    await Images.bulkCreate(images);
  }

  return res.status(200).json({ success: true, product, images: images });
});

const deleteProduct = async (req, res) => {
  const remove = await Products.destroy({
    where: {
      id: req.params.id,
    },
  });
  fs.rmSync(`public/images/item/${req.params.id}`, { recursive: true });
  return res.status(200).json({ success: true, remove });
};
module.exports = {
  getProducts,
  getProductsByid,
  addProduct,
  updateProduct,
  deleteProduct,
};
