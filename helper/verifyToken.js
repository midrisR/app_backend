const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verify = jwt.verify(token, process.env.SALT);
    req.user = verify;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
