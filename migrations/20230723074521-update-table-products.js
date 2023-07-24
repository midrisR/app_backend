"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("products", "createdAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
      queryInterface.changeColumn("products", "updatedAt", {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("products", "createdAt"),
      queryInterface.changeColumn("products", "updatedAt"),
    ]);
  },
};
