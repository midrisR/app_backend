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
    uploadImg(req, res, function (err) {
      if (err) {
        res.send(err.message);
      }
    });
};

exports.removeImg = async (req, res) => {
  const image = await Images.findByPk(req.params.id);
  const dir = `/public/images/item/${image.productId}/`
  const folderPath = path.join(__dirname, dir);

  // Nama file yang ingin dicek
  const fileName = image.name; // bisa diganti sesuai kebutuhan
  const filePath = path.join(folderPath, fileName);

  // Cek apakah file tersebut ada
  
  if (image) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      console.log(`${filePath} ${err ? 'does not exist' : 'exists'}`);
    });
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: `${fileName} does not exist` });
      } else {
        fs.unlinkSync(`public/images/item/${image.productId}/` + image.name);
        image.destroy();
        return res
          .status(200)
          .json({ success: true, message: "image has been deleted", image });
      }
    });
  }
  
};
