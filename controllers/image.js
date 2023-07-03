const upload = require("../helper/upload");
exports.addImage = async (req, res) => {
  console.log(req.files);
  res.send("success");
};
