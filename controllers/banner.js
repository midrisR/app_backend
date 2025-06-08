const db = require("../models");
const Banner = db.Banner;
const brandValidation = require("../validations/brandValidation");
const asyncHandler = require("express-async-handler");

exports.findAll = asyncHandler(async (req, res) => {
  const brand = await Banner.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(brand);
});
