const Products = require("../controllers/product");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
router.post("/", Products.addProduct);
router.get("/", verifyToken, Products.getProducts);
router.get("/:id", verifyToken, Products.getProductsByid);

module.exports = router;
