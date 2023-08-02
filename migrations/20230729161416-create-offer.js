"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Offers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "vendors",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Offers");
  },
};
