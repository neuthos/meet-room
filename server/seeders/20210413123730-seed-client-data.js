"use strict";
const fs = require("fs");
const { hash } = require("../helper/bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clients = JSON.parse(fs.readFileSync("./client.json", "utf8"));

    clients.forEach((client) => {
      client.createdAt = new Date();
      client.updatedAt = new Date();
      client.password = hash(client.password);
    });

    return queryInterface.bulkInsert("Clients", clients, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
