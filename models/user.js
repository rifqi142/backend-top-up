"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relation one to many with order
      models.user.hasMany(models.Order, {
        foreignKey: "or_us_id",
        sourceKey: "us_id",
      });
    }
  }
  user.init(
    {
      us_id: {
        type: DataTypes.INTEGER,
      primaryKey: true,
        autoIncrement: true,
      },
      us_username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      us_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      us_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      us_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      us_is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      us_is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      us_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      us_updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      timestamps: true,
      createdAt: "us_created_at",
      updatedAt: "us_updated_at",
    }
  );
  return user;
};
