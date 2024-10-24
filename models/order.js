"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with user
      models.order.belongsTo(models.user, {
        foreignKey: "or_us_id",
        targetKey: "us_id",
      });
      // relation one to many with product
      models.order.belongsTo(models.product, {
        foreignKey: "or_pr_id",
        targetKey: "pr_id",
      });
      // relation one to one with payment
      models.order.hasOne(models.payment, {
        foreignKey: "py_or_id",
        sourceKey: "or_id",
      });
    }
  }
  order.init(
    {
      or_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      or_us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      or_pr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      or_status: {
        type: DataTypes.ENUM("ordered", "finished", "reviewed", "canceled"),
        allowNull: false,
      },
      or_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      or_total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      or_payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "order",
      tableName: "orders",
      createdAt: "or_created_at",
      updatedAt: "or_updated_at",
    }
  );
  return order;
};
