"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("banners", "information", "name");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("banners", "name", "information");
  },
};
