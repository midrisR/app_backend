const client = require("../controllers/client");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", client.findAll);
router.post("/", verifyToken, client.create);
router.put("/:id", verifyToken, client.update);
router.delete("/:id", verifyToken, client.delete);
router.get("/:id", client.findById);

module.exports = router;
