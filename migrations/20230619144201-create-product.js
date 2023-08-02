"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      categorieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: "brands",
          key: "id",
        },
      },
      tag: {
        type: Sequelize.STRING,
      },
      metaDescription: {
        type: Sequelize.TEXT,
      },
      metaKeywords: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
