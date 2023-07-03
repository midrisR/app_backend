const { addImage } = require("../controllers/image");
// const upload = require("../helper/upload");
const router = require("express").Router();
router.get("/", addImage);

module.exports = router;
