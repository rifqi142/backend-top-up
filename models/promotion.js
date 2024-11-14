"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promotion.init(
    {
      prm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      prm_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prm_code_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prm_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prm_discount_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prm_expired_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      prm_is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      prm_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Promotion",
      tableName: "promotions",
      createdAt: "prm_created_at",
      updatedAt: false,
    }
  );
  return Promotion;
};
