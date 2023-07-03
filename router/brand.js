const Brand = require("../controllers/brand");
const router = require("express").Router();

router.get("/", Brand.findAll);

module.exports = router;
