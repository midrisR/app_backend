const Products = require("../controllers/product");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const upload = require("../helper/upload");

router.post("/", upload("public/images/item/"), Products.addProduct);
router.get("/", Products.getProducts);
router.get("/:id", verifyToken, Products.getProductsByid);
router.put("/:id", upload("public/images/item/"), Products.updateProduct);
router.delete("/:id", Products.deleteProduct);

module.exports = router;
