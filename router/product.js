const Products = require("../controllers/product");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const upload = require("../helper/upload");

router.get("/", Products.getProducts);
router.get("/:id", Products.getProductsByid);
router.get("/categorie/:id", Products.getProductsByCategories);
router.post(
  "/",
  verifyToken,
  upload("public/images/item/"),
  Products.addProduct
);
router.put(
  "/:id",
  verifyToken,
  upload("public/images/item/"),
  Products.updateProduct
);
router.delete("/:id", verifyToken, Products.deleteProduct);

module.exports = router;
