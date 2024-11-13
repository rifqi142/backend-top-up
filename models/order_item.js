"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Define association here
      models.OrderItem.belongsTo(models.Order, {
        foreignKey: "oi_or_id",
        targetKey: "or_id",
      });
    }
  }
  OrderItem.init(
    {
      oi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      oi_or_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      oi_product: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      oi_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      oi_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items",
      underscored: true,
      createdAt: "oi_created_at",
      updatedAt: "oi_updated_at",
    }
  );
  return OrderItem;
};
