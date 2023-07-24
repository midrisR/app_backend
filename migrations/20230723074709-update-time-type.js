"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("images", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("images", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),

      queryInterface.changeColumn("brands", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("brands", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),

      queryInterface.changeColumn("categories", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("categories", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),

      queryInterface.changeColumn("users", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("users", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),

      queryInterface.changeColumn("types", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("types", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("categories", "createdAt"),
      queryInterface.changeColumn("categories", "createdAt"),
      queryInterface.changeColumn("brands", "updatedAt"),
      queryInterface.changeColumn("brands", "updatedAt"),
      queryInterface.changeColumn("images", "updatedAt"),
      queryInterface.changeColumn("images", "updatedAt"),
      queryInterface.changeColumn("users", "updatedAt"),
      queryInterface.changeColumn("users", "updatedAt"),
      queryInterface.changeColumn("types", "updatedAt"),
      queryInterface.changeColumn("types", "updatedAt"),
    ]);
  },
};
