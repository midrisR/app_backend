"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categorie.hasMany(models.Product, { foreignKey: "categorieId" });
    }
  }
  Categorie.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Categorie",
    }
  );
  return Categorie;
};
