const offers = require("../controllers/offers");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", offers.findAll);
router.get("/:id", offers.findById);
router.post("/", verifyToken, offers.create);
router.put("/:id", verifyToken, offers.update);
router.delete("/:id", verifyToken, offers.delete);

module.exports = router;
