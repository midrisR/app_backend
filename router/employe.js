const employe = require("../controllers/employe");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", employe.findAll);
router.post("/", verifyToken, employe.create);
router.get("/:id", employe.findById);
router.put("/:id", verifyToken, employe.update);
router.delete("/:id", verifyToken, employe.delete);

module.exports = router;
