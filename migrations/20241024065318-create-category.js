"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      ct_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ct_name: {
        type: Sequelize.STRING,
      },
      ct_code: {
        type: Sequelize.STRING,
      },
      ct_game_publisher: {
        type: Sequelize.STRING,
      },
      ct_image: {
        type: Sequelize.STRING,
      },
      ct_image_cover: {
        type: Sequelize.STRING,
      },
      ct_currency_type: {
        type: Sequelize.STRING,
      },
      ct_currency_type_image: {
        type: Sequelize.STRING,
      },
      ct_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      ct_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      ct_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("categories");
  },
};
