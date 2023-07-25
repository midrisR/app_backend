const vendor = require("../controllers/vendor");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", vendor.findAll);
router.post("/", verifyToken, vendor.create);
router.put("/:id", verifyToken, vendor.update);
router.delete("/:id", verifyToken, vendor.delete);
router.get("/:id", vendor.findById);

module.exports = router;
