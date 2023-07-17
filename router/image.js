const { addImage, removeImg } = require("../controllers/image");
const verifyToken = require("../helper/verifyToken");
// const upload = require("../helper/upload");

const router = require("express").Router();
router.get("/", addImage);
router.delete("/:id", verifyToken, removeImg);

module.exports = router;
