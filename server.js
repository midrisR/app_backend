const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const verifyToken = require("./helper/verifyToken");
const userRoute = require("./router/user");
const authRoute = require("./router/auth");
const productRoute = require("./router/product");
const categorieRoute = require("./router/categorie");
const brandRoute = require("./router/brand");
const imageRoute = require("./router/image");
const { errorHandler } = require("./middleware/error");
const multer = require("multer");
const port = 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/images", express.static("images"));

// api route
app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/api/product/", productRoute);
app.use("/api/categorie/", verifyToken, categorieRoute);
app.use("/api/brand/", verifyToken, brandRoute);
app.use("/api/image/", imageRoute);

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await db.sequelize.authenticate();
    console.log("Synced db.");
  } catch (error) {
    console.log("Failed to sync db: " + error.message);
  }
});
