const {
  addImage,
  removeImg,
  getBanner,
  addImageBanner,
  removeImgBanner,
} = require("../controllers/image");
const verifyToken = require("../helper/verifyToken");
const router = require("express").Router();

const upload = require("../helper/upload");
// router.get("/", addImage);

router.post("/", addImage);
router.get("/banner", getBanner);

router.post(
  "/banner",
  verifyToken,
  upload("public/images/banner/"),
  addImageBanner
);
router.delete("/:id", verifyToken, removeImg);
router.delete("/banner/:id", verifyToken, removeImgBanner);

module.exports = router;
