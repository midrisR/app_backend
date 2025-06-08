const Banner = require("../controllers/banner");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", Banner.findAll);
// router.post("/", verifyToken, Brand.create);
// router.put("/:id", verifyToken, Brand.update);
// router.delete("/:id", verifyToken, Brand.delete);
// router.get("/:id", Brand.findById);

module.exports = router;
