"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      pr_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pr_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pr_currency_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pr_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pr_stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pr_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pr_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pr_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      pr_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
