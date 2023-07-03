const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.User;
const tokenList = {};
const { loginValidation } = require("../validations/userValidation");
const login = async (req, res) => {
  const { email, password } = req.body;
  const error = loginValidation(req.body);
  const err = [];
  if (error) {
    error.forEach((element) => {
      err.push({
        [element.path]: [element.message],
      });
    });
    const errorResponse = err.reduce((val, cur) => ({ ...val, ...cur }), {});
    return res.status(422).json({ status: false, message: errorResponse });
  }

  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: false, message: "Email or password is invalid !!" });
  }
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword)
    return res
      .status(400)
      .json({ status: false, message: "Email or password is invalid !!" });

  const token = jwt.sign({ email: user.email }, process.env.SALT, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign({ email: user.email }, process.env.SALT, {
    expiresIn: "356d",
  });

  const response = {
    email: user.email,
    accessToken: token,
    refreshToken: refreshToken,
  };
  tokenList[refreshToken] = response;
  res.status(200).json(response);
};

const refreshToken = async (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  try {
    if (token) {
      jwt.verify(token, process.env.SALT, function (err, decoded) {
        if (err) {
          return res.status(401).json({ error: true, message: err.message });
        }
        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.SALT,
          {
            expiresIn: "30d",
          }
        );
        console.log("new token", {
          email: decoded.email,
          accessToken,
          refreshToken: token,
        });
        return res
          .status(200)
          .json({ email: decoded.email, accessToken, refreshToken: token });
      });
    }
  } catch (error) {
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
module.exports = { login, refreshToken };
