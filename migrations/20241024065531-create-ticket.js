"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      tkt_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tkt_us_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "us_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tkt_subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tkt_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tkt_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tkt_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      tkt_updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tickets");
  },
};
