const { login, refreshToken } = require("../controllers/auth");
const router = require("express").Router();
router.post("/login", login);

router.post("/refreshtoken", refreshToken);
module.exports = router;
