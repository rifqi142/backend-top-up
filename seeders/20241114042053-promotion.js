"use strict";

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
    const prm_expired_on = new Date();
    prm_expired_on.setFullYear(prm_expired_on.getFullYear() + 1);
    return queryInterface.bulkInsert("promotions", [
      {
        prm_type: "voucher",
        prm_code_value: "RFQDISCNOV202410",
        prm_quantity: 50,
        prm_discount_percentage: 10,
        prm_expired_on: prm_expired_on,
        prm_is_active: true,
        prm_created_at: new Date(),
      },
      {
        prm_type: "voucher",
        prm_code_value: "RFQDISCNOV202411",
        prm_quantity: 50,
        prm_discount_percentage: 30,
        prm_expired_on: prm_expired_on,
        prm_is_active: true,
        prm_created_at: new Date(),
      },
      {
        prm_type: "voucher",
        prm_code_value: "RFQDISCNOV202412",
        prm_quantity: 50,
        prm_discount_percentage: 50,
        prm_expired_on: prm_expired_on,
        prm_is_active: true,
        prm_created_at: new Date(),
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
    return queryInterface.bulkDelete("promotions", null, {});
  },
};
