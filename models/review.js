"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation many to one with user
      models.review.belongsTo(models.user, {
        foreignKey: "rv_us_id",
        targetKey: "us_id",
      });
      // relation many to one with product
      models.review.belongsTo(models.product, {
        foreignKey: "rv_pr_id",
        targetKey: "pr_id",
      });
    }
  }
  review.init(
    {
      rv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rv_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rv_pr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rv_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rv_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "review",
    }
  );
  return review;
};
