"use strict";
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
      or_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      or_platform_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      or_platform_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      or_payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      or_payment_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      or_total_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
