"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with product
      models.category.hasMany(models.product, {
        foreignKey: "pr_ct_id",
        sourceKey: "ct_id",
      });
    }
  }
  category.init(
    {
      ct_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ct_name: {
        type: DataTypes.STRING,
      },
      ct_code: {
        type: DataTypes.STRING,
      },
      ct_game_publisher: {
        type: DataTypes.STRING,
      },
      ct_image: {
        type: DataTypes.STRING,
      },
      ct_image_cover: {
        type: DataTypes.STRING,
      },
      ct_currency_type: {
        type: DataTypes.STRING,
      },
      ct_currency_type_image: {
        type: DataTypes.STRING,
      },
      ct_is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      ct_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      ct_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "category",
      tableName: "categories",
      createdAt: "ct_created_at",
      updatedAt: "ct_updated_at",
    }
  );
  return category;
};
