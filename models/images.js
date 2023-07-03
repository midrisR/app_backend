"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.hasMany(models.Product, {
        foreignKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Image.init(
    {
      name: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
