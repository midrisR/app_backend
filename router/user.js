const userController = require("../controllers/user");
const router = require("express").Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/profile", userController.findProfile);
// router.put("/:id", userController.update);
// router.put("/:id", userController.update);
router.delete("/", userController.deleteUser);
// router.get("/:id", userController.findOne);

module.exports = router;
