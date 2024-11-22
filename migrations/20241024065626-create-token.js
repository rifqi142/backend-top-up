"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tokens", {
      tkn_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tkn_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tkn_value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tkn_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tkn_us_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tkn_expired_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tkn_is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      tkn_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tkn_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tokens");
  },
};
