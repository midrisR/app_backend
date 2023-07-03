const Categorie = require("../controllers/categorie");
const router = require("express").Router();

router.get("/", Categorie.findAll);

module.exports = router;
