"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_promos", {
      pp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pp_pr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "pr_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      pp_prm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "promotions",
          key: "prm_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_promos");
  },
};
