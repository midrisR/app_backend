const Categorie = require("../controllers/categorie");
const router = require("express").Router();
const upload = require("../helper/upload");
const verifyToken = require("../helper/verifyToken");

router.get("/", Categorie.findAll);
router.get("/:id", Categorie.findById);
router.post("/", upload("public/images/categories/"), Categorie.create);
router.put("/:id", upload("public/images/categories/"), Categorie.create);

module.exports = router;
