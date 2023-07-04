const Products = require("../controllers/product");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const upload = require("../helper/upload");
router.post("/", Products.addProduct);
router.get("/", verifyToken, Products.getProducts);
router.get("/:id", verifyToken, Products.getProductsByid);
router.put("/:id", upload, Products.updateProduct);

module.exports = router;
