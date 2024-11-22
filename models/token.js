"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  token.init(
    {
      tkn_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tkn_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tkn_value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tkn_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tkn_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tkn_expired_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tkn_is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tkn_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tkn_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "token",
      tableName: "tokens",
      createdAt: "tkn_created_at",
      updatedAt: "tkn_updated_at",
    }
  );
  return token;
};
