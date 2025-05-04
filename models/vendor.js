"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vendor.hasMany(models.Offer, { foreignKey: "vendorId" });
    }
  }
  Vendor.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      contact: DataTypes.STRING,
      email: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Vendor",
      tableName: "vendors",
    }
  );
  return Vendor;
};
