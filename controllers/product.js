const fs = require("fs");
const db = require("../models");
const Products = db.Product;
const Images = db.Image;
const Categories = db.Categorie;
const Brands = db.Brand;
const upload = require("../helper/upload");
const { getPagination, getPagingData } = require("../helper/paginate");
const { json } = require("body-parser");

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
        attributes: { exclude: ["image", "createdAt", "updatedAt"] },
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
  res.status(200).json({ products, total: products.length });
};

const getProductsByid = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findByPk(id, {
    include: [
      {
        model: Brands,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Categories,
        attributes: { exclude: ["image", "createdAt", "updatedAt"] },
      },
      {
        model: Images,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
  res.status(200).json(product);
};

const addProduct = async (req, res) => {
  const images = [];
  upload(req, res, async function (err) {
    if (err) {
      res.status(400).send("Multer error: " + err.message);
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
    for (let i = 0; i < req.files.length; i++) {
      const { filename } = req.files[i];
      images.push({ name: filename, productId: product.id });
    }
    const image = await Images.bulkCreate(images);
    res.status(201).json({ product, image });
  });
};

const updateProduct = async (req, res) => {
  const images = [];
  const { id } = req.params;

  const findPrc = await Products.findByPk(id, {
    include: [
      {
        model: Images,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
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
    {
      where: {
        id: req.params.id,
      },
    }
  );

  if (req.files) {
    await Images.destroy({
      where: { productId: id },
    });
    findPrc.Images.map(({ name }) => {
      fs.unlinkSync("public/images/" + name);
    });
    for (let i = 0; i < req.files.length; i++) {
      const { filename } = req.files[i];
      images.push({ name: filename, productId: id });
    }
    await Images.bulkCreate(images);
  }
  return res.status(201).json({ product, images: images });
};
module.exports = { getProducts, getProductsByid, addProduct, updateProduct };
