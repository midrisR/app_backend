const db = require("../models");
const Products = db.Product;
const Images = db.Image;
const Categories = db.Categorie;
const Brands = db.Brand;
const upload = require("../helper/upload");
const { getPagination, getPagingData } = require("../helper/paginate");

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
  // const {
  //   name,
  //   categorieId,
  //   description,
  //   brandId,
  //   tag,
  //   metaDescription,
  //   metaKeywords,
  //   published,
  // } = req.body;
  // const product = await Products.create({
  //   name: name,
  //   categorieId: categorieId,
  //   description: description,
  //   brandId: brandId,
  //   tag: tag,
  //   metaDescription: metaDescription,
  //   metaKeywords: metaKeywords,
  //   published: published,
  // });
  // res.json(product);
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(req.files);
    // Everything went fine.
  });
};

module.exports = { getProducts, getProductsByid, addProduct };
