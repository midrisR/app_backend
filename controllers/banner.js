const fs = require("fs");
const path = require("path");
const db = require("../models");
const Banner = db.Banner;
const brandValidation = require("../validations/brandValidation");
const asyncHandler = require("express-async-handler");

const isEmptyFields = (data) => {
  const error = data.reduce((val, cur) => ({ ...val, ...cur }), {});
  return error;
};

exports.findAll = asyncHandler(async (req, res) => {
  const banner = await Banner.findAll({
    order: [["id", "DESC"]],
  });
  return res.status(200).json(banner);
});

exports.findById = asyncHandler(async (req, res) => {
  const banner = await Banner.findByPk(req.params.id);
  return res.status(200).json(banner);
});

exports.create = asyncHandler(async (req, res) => {
  const { error } = brandValidation(req.body);
  const errors = [];

  if (req.files.length < 1) {
    errors.push({ image: "image cannot be an empty field" });
  }

  if (error || req.files.length < 1) {
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
      fs.unlinkSync(path);
    }
    error?.details?.forEach(function (detail) {
      errors.push({
        [detail.path]: detail.message,
      });
    });
    res.status(422);
    throw isEmptyFields(errors);
  }

  const banner = await Banner.create({
    name: req.body.name,
    image: req.files[0].filename,
    published: req.body.published,
  });

  if (banner) {
    fs.mkdirSync(`public/images/banner/${banner.id}`);
    const currentPath = "public/images/banner/" + req.files[0].filename;
    const destinationPath =
      `public/images/banner/${banner.id}/` + req.files[0].filename;
    fs.renameSync(currentPath, destinationPath);
  }
  return res
    .status(201)
    .json({ success: true, banner, image: req.files[0].filename });
});

exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findBanner = await Banner.findByPk(id);

  if (!findBanner) {
    return res.status(404).json({ error: "Banner not found" });
  }

  const { error } = brandValidation(req.body);
  const errors = [];

  // Hapus file jika ada error validasi
  if (error) {
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const filePath = req.files[i].path;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    error?.details?.forEach((detail) => {
      errors.push({ [detail.path]: detail.message });
    });

    res.status(422);
    throw isEmptyFields(errors);
  }

  const newImage = req?.files?.[0]?.filename || findBanner.image;

  // Update kategori di DB
  await Banner.update(
    {
      name: req.body.name,
      image: newImage,
      published: req.body.published,
    },
    { where: { id } }
  );

  // Kelola file gambar
  if (req.files && req.files.length > 0) {
    const { filename } = req.files[0];
    const folderPath = path.join("public/images/banner", id.toString());

    // Pastikan folder tujuan ada
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const currentPath = path.join("public/images/banner", filename);
    const destinationPath = path.join(folderPath, filename);

    fs.renameSync(currentPath, destinationPath);

    const oldImagePath = path.join(folderPath, findBanner.image);

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  return res.status(200).json({
    success: true,
    banner: {
      id,
      name: req.body.name,
      image: newImage,
      published: req.body.published,
    },
  });
});

exports.delete = async (req, res) => {
  const { id } = req.params;
  const findBanner = await Banner.findByPk(id);

  if (!findBanner) {
    return res.status(500).json("banner not found");
  }

  await Banner.destroy({
    where: {
      id: id,
    },
  });

  fs.rmSync(`public/images/banner/${req.params.id}`, { recursive: true });
  return res
    .status(200)
    .json({ success: true, message: "Categorie has been deleted" });
};
