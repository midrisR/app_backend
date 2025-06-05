const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
const userRoute = require("./router/user");
const authRoute = require("./router/auth");
const productRoute = require("./router/product");
const categorieRoute = require("./router/categorie");
const brandRoute = require("./router/brand");
const vendorRoute = require("./router/vendor");
const clientRoute = require("./router/client");
const offersRoute = require("./router/offers");
const imageRoute = require("./router/image");
const { errorHandler } = require("./middleware/error");
const port = 5000;

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/api/product/", productRoute);
app.use("/api/categorie/", categorieRoute);
app.use("/api/brand/", brandRoute);
app.use("/api/vendor/", vendorRoute);
app.use("/api/client/", clientRoute);
app.use("/api/offers/", offersRoute);
app.use("/api/image/", imageRoute);

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await db.sequelize.authenticate();
    console.log("Synced db.");
  } catch (error) {
    console.log("Failed to sync db: " + error);
  }
});
