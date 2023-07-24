const Brand = require("../controllers/brand");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", Brand.findAll);
router.post("/", verifyToken, Brand.create);
router.put("/:id", verifyToken, Brand.update);
router.delete("/:id", verifyToken, Brand.delete);
router.get("/:id", Brand.findById);

module.exports = router;
