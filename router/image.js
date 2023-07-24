const { addImage, removeImg } = require("../controllers/image");
const verifyToken = require("../helper/verifyToken");
const router = require("express").Router();

// const upload = require("../helper/upload");
// router.get("/", addImage);

router.post("/", addImage);
router.delete("/:id", verifyToken, removeImg);

module.exports = router;
