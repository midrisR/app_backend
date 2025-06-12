const Banner = require("../controllers/banner");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");
const upload = require("../helper/upload");

router.get("/", Banner.findAll);
router.post("/", verifyToken, upload("public/images/banner/"), Banner.create);
router.put("/:id", verifyToken, upload("public/images/banner/"), Banner.update);
router.delete("/:id", verifyToken, Banner.delete);
router.get("/:id", Banner.findById);

module.exports = router;
