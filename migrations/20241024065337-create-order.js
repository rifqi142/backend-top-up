"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      or_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      or_us_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "us_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      or_pr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "pr_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      or_status: {
        type: Sequelize.ENUM("ordered", "finished", "reviewed", "canceled"),
        allowNull: false,
      },
      or_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      or_total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      or_payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      or_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      or_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
