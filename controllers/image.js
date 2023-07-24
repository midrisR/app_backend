const db = require("../models");
const fs = require("fs");
const Images = db.Image;
const { readdir } = require("fs/promises");
const path = require("path");
const upload = require("../helper/upload");

const findByName = async (dir, name) => {
  const matchedFiles = [];

  const files = await readdir(dir);

  for (const file of files) {
    if (file.includes(name)) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

exports.addImage = async (req, res) => {
  const uploadImg = upload("public/images/");
  (req, res, next) => {
    console.log(req.body);
    next(); // next is what allows processing to continue
  },
    uploadImg(req, res, function (err) {
      if (err) {
        res.send(err.message);
      }
    });
};

exports.removeImg = async (req, res) => {
  const image = await Images.findByPk(req.params.id);
  if (image) {
    fs.unlinkSync(`public/images/item/${image.productId}/` + image.name);
    image.destroy();
    return res
      .status(200)
      .json({ success: true, message: "image has been deleted", image });
  }
  return res.status(400).json({ success: false, message: "something error" });
};
