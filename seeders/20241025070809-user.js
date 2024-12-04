"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("users", [
      {
        us_username: "admin",
        us_email: "rfqtopup@admin.com",
        us_phone_number: "08123456789",
        us_password: await bcrypt.hash("rfqadmin", 10),
        us_is_active: true,
        us_is_admin: true,
        us_created_at: new Date(),
        us_updated_at: new Date(),
      },
      {
        us_username: "fadlan123",
        us_email: "fadlan123@gmail.com",
        us_phone_number: "08221155448",
        us_password: await bcrypt.hash("fadlan123", 10),
        us_is_active: true,
        us_is_admin: false,
        us_created_at: new Date(),
        us_updated_at: new Date(),
      },
      {
        us_username: "rifqi142",
        us_email: "muhrifqi@gmail.com",
        us_phone_number: "08122554478",
        us_password: await bcrypt.hash("rifqi142", 10),
        us_is_active: true,
        us_is_admin: false,
        us_created_at: new Date(),
        us_updated_at: new Date(),
      },
      {
        us_username: "guest",
        us_email: "777@rifqitopup.com",
        us_phone_number: "088221155778",
        us_password: await bcrypt.hash("guest", 10),
        us_is_active: true,
        us_is_admin: false,
        us_created_at: new Date(),
        us_updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("users", null, {});
  },
};
