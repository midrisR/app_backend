const db = require("../models");
const fs = require("fs");
const Images = db.Image;

exports.addImage = async (req, res) => {
  console.log(req.files);
  res.send("success");
};

exports.removeImg = async (req, res) => {
  const image = await Images.findByPk(req.params.id);
  if (image) {
    image.destroy();
    fs.unlinkSync(`public/images/${image.productId}/` + image.name);
    return res
      .status(200)
      .json({ success: true, message: "image has been deleted", image });
  }
  return res.status(400).json({ success: false, message: "something error" });
};
