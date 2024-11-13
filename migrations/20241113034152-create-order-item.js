"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      oi_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      oi_or_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "or_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      oi_product: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      oi_created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      oi_updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items");
  },
};
