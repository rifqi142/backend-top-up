"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with order
      models.product.hasMany(models.order, {
        foreignKey: "or_pr_id",
        sourceKey: "pr_id",
      });
      // relation one to many with review
      models.product.hasMany(models.review, {
        foreignKey: "rv_pr_id",
        sourceKey: "pr_id",
      });
      // relation many to one with category
      models.product.belongsTo(models.category, {
        foreignKey: "pr_ct_id",
        targetKey: "ct_id",
      });
    }
  }
  product.init(
    {
      pr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pr_ct_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pr_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pr_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pr_stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pr_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      pr_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "product",
      tableName: "products",
      createdAt: "pr_created_at",
      updatedAt: "pr_updated_at",
    }
  );
  return product;
};
