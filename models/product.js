"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Categorie, { foreignKey: "categorieId" });
      Product.belongsTo(models.Brand, { foreignKey: "brandId" });
      Product.hasMany(models.Image, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      categorieId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      brandId: DataTypes.INTEGER,
      tag: DataTypes.STRING,
      metaDescription: DataTypes.TEXT,
      metaKeywords: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    }
  );
  return Product;
};
