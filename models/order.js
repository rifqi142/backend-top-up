"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define association here
      // Relation one-to-many with User
      models.Order.belongsTo(models.user, {
        foreignKey: "or_us_id",
        targetKey: "us_id",
      });
      // Relation one-to-one with OrderItem
      models.Order.hasOne(models.OrderItem, {
        foreignKey: "oi_or_id",
        targetKey: "or_id",
        as: "orderItem",
      });
    }
  }
  Order.init(
    {
      or_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      or_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 777,
      },
      or_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      or_platform_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      or_platform_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      or_payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      or_payment_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      or_total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      or_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      or_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      createdAt: "or_created_at",
      updatedAt: "or_updated_at",
    }
  );
  return Order;
};
