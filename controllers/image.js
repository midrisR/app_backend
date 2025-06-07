const db = require("../models");
const fs = require("fs");
const Images = db.Image;
const Banner = db.Banner;
const asyncHandler = require("express-async-handler");
const path = require("path");
const upload = require("../helper/upload");

exports.addImage = async (req, res) => {
  const uploadImg = upload("public/images/");
  uploadImg(req, res, function (err) {
    if (err) {
      res.send(err.message);
    }
  });
};

exports.removeImg = async (req, res) => {
  try {
    const image = await Images.findByPk(req.params.id);
    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    const dir = `public/images/item/${image.productId}/`;
    const folderPath = path.join(process.cwd(), dir);
    const fileName = image.name;
    const filePath = path.join(folderPath, fileName);

    fs.access(filePath, fs.constants.F_OK, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `${fileName} does not exist`,
        });
      } else {
        fs.unlinkSync(filePath);
        await image.destroy();
        return res.status(200).json({
          success: true,
          message: "Image has been deleted",
          image,
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// banner
exports.getBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findAll();
  return res.status(200).json(banner);
});

exports.addImageBanner = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // 1. Simpan banner dulu
  const fileNames = req.files.map((file) => file.filename);
  const banner = await Banner.create({
    information: req.body.information,
    images: fileNames[0],
  });
  const folderPath = `public/images/banner/${banner.id}`;

  // 2. Buat folder sesuai ID banner
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  for (const file of req.files) {
    const tempPath = file.path; // e.g. public/images/temp/xyz.jpg
    const destPath = path.join(folderPath, file.filename); // e.g. public/images/banner/3/xyz.jpg

    fs.renameSync(tempPath, destPath);
  }

  return res.status(201).json({
    success: true,
    message: "Upload success",
    banner,
  });
});

exports.removeImgBanner = async (req, res) => {
  const folderPath = `/public/images/banner/${req.params.id}`;
  if (fs.existsSync(folderPath)) {
    const image = await Images.destroy({
      where: {
        id: req.params.id,
      },
    });
    fs.rmSync(folderPath, { recursive: true, force: true });
  } else {
    return res
      .status(400)
      .json({ success: false, message: `images does not exist` });
  }
  return res.status(200).json({
    success: true,
    message: "image success deleted",
  });
};
