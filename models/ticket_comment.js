"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with user
      models.ticket_comment.belongsTo(models.user, {
        foreignKey: "tc_us_id",
        targetKey: "us_id",
      });
      // relation one to many with ticket
      models.ticket_comment.belongsTo(models.ticket, {
        foreignKey: "tc_tkt_id",
        targetKey: "tkt_id",
      });
    }
  }
  ticket_comment.init(
    {
      tc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tc_tkt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tc_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tc_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tc_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ticket_comment",
      tableName: "ticket_comments",
      createdAt: "tc_created_at",
      updatedAt: false,
    }
  );
  return ticket_comment;
};
