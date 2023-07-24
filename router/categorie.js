const Categorie = require("../controllers/categorie");
const router = require("express").Router();
const upload = require("../helper/upload");
const verifyToken = require("../helper/verifyToken");

router.get("/", Categorie.findAll);
router.get("/:id", Categorie.findById);
router.post(
  "/",
  verifyToken,
  upload("public/images/categories/"),
  Categorie.create
);
router.put(
  "/:id",
  verifyToken,
  upload("public/images/categories/"),
  Categorie.updateCategorie
);
router.delete("/:id", verifyToken, Categorie.deleteCategorie);

module.exports = router;
