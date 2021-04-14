"use strict";
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const meetingRooms = JSON.parse(
      fs.readFileSync("./meetingroom.json", "utf8")
    );

    meetingRooms.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    return queryInterface.bulkInsert("MeetingRooms", meetingRooms, {});
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
