"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];
    let amount = 50;
    while (amount--) {
      data.push({
        product: faker.commerce.product(),
        vendorId: faker.number.int({ min: 50, max: 101 }),
        price: faker.commerce.price({ min: 1000, max: 5000000, dec: 0 }),
        date: faker.date.between({
          from: "2023-06-01T00:00:00.000Z",
          to: "2023-07-31T00:00:00.000Z",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Offers", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Offers", null, {});
  },
};
