"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Offer.belongsTo(models.Vendor, { foreignKey: "vendorId" });
    }
  }
  Offer.init(
    {
      product: DataTypes.STRING,
      price: DataTypes.STRING,
      vendorId: DataTypes.STRING,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Offer",
    }
  );
  return Offer;
};
