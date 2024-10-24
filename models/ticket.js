"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with user
      models.ticket.belongsTo(models.user, {
        foreignKey: "tkt_us_id",
        targetKey: "us_id",
      });
      // relation one to many with ticket_comment
      models.ticket.hasMany(models.ticket_comment, {
        foreignKey: "tc_tkt_id",
        sourceKey: "tkt_id",
      });
    }
  }
  ticket.init(
    {
      tkt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tkt_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tkt_subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tkt_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tkt_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tkt_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tkt_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ticket",
      tableName: "tickets",
      createdAt: "tkt_created_at",
      updatedAt: "tkt_updated_at",
    }
  );
  return ticket;
};
