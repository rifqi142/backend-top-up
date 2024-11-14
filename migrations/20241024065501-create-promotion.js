"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("promotions", {
      prm_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prm_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prm_code_value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prm_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prm_discount_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prm_expired_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      prm_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      prm_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("promotions");
  },
};
