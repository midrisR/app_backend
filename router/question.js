const question = require("../controllers/question");
const router = require("express").Router();
const verifyToken = require("../helper/verifyToken");

router.get("/", question.findAll);
router.post("/", verifyToken, question.create);
router.get("/:id", question.findById);
router.delete("/:id", verifyToken, question.delete);

module.exports = router;
