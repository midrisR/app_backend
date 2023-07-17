const fs = require("fs");
const db = require("../models");
const Products = db.Product;
const Images = db.Image;
const Categories = db.Categorie;
const Brands = db.Brand;
const { getPagination, getPagingData } = require("../helper/paginate");
const upload = require("../helper/upload");
const path = require("path");
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
  return res.status(200).json({ products, total: products.length });
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

  fs.mkdirSync(`public/images/${product.id}`);

  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];
    images.push({ name: filename, productId: product.id });
    const currentPath = "public/images/" + filename;
    const destinationPath = `public/images/${product.id}/` + filename;
    fs.renameSync(currentPath, destinationPath);
  }
  const image = await Images.bulkCreate(images);
  return res.status(201).json({ success: true, product, image });
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

  if (!findPrc) {
    return res.status(500).json("someting error");
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

  // findPrc.Images.map(({ name }) => {
  //   fs.unlinkSync(`public/images/${id}/` + name);
  // });

  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      const { filename } = req.files[i];
      images.push({ name: filename, productId: id });
      const currentPath = "public/images/" + filename;
      const destinationPath = `public/images/${id}/` + filename;
      fs.renameSync(currentPath, destinationPath);
    }
    await Images.bulkCreate(images);
  }

  return res.status(200).json({ success: true, product, images: images });
};
const deleteProduct = async (req, res) => {
  const remove = await Products.destroy({
    where: {
      id: req.params.id,
    },
  });
  fs.rmSync(`public/images/${req.params.id}`, { recursive: true });
  return res.status(200).json({ success: true, remove });
};
module.exports = {
  getProducts,
  getProductsByid,
  addProduct,
  updateProduct,
  deleteProduct,
};
