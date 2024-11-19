const { user, product, Order, OrderItem } = require("@/models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

// get all user count
const getUserCount = async (req, res) => {
  try {
    const userCount = await user.count();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        totalUser: userCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get all product count
const getProductCount = async (req, res) => {
  try {
    const productCount = await product.count();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        totalProduct: productCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get all order count
const getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.count();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        totalOrder: orderCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get total amount of all orders where or_payment_status = settlement
const getTotalAmount = async (req, res) => {
  try {
    const totalAmount = await Order.sum("or_total_amount", {
      where: { or_payment_status: "settlement" },
    });
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        totalAmount: totalAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get all order
const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.findAll();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        allOrder: allOrder,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get all order where date only today
const getOrderToday = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const orderToday = await Order.findAll({
      where: {
        or_created_at: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
      attributes: {
        exclude: ["or_updated_at"],
      },
      include: [
        {
          model: OrderItem,
          as: "orderItem",
          attributes: {
            exclude: ["oi_created_at", "oi_updated_at"],
          },
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      message: "Get all orders today successfully",
      data: orderToday,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// create user
const createUser = async (req, res) => {
  try {
    const { us_username, us_email, us_phone_number, us_password } = req.body;

    if (!us_username || !us_email || !us_phone_number || !us_password) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Please fill all required fields",
      });
    }

    const hashedPassword = await bcrypt.hash(us_password, 10);

    const newUser = await user.create({
      us_username,
      us_email,
      us_phone_number,
      us_password: hashedPassword,
      us_is_active: true,
      us_is_admin: false,
    });

    delete newUser.dataValues.us_password;

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const allUser = await user.findAll({
      where: {
        us_is_admin: false,
      },
      attributes: {
        exclude: ["us_password", "us_updated_at"],
      },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { us_username, us_email, us_phone_number, us_password } = req.body;
    const { userId } = req.params;

    if (!us_username || !us_email || !us_phone_number || !us_password) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Please fill all required fields",
      });
    }

    const oldUser = await user.findOne({
      where: { us_id: userId },
    });

    if (!oldUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    const previousDataUser = {
      us_id: oldUser.us_id,
      us_username: oldUser.us_username,
      us_email: oldUser.us_email,
      us_phone_number: oldUser.us_phone_number,
      us_is_active: oldUser.us_is_active,
      us_is_admin: oldUser.us_is_admin,
    };

    const hashedPassword = await bcrypt.hash(us_password, 10);

    await user.update(
      {
        us_username,
        us_email,
        us_phone_number,
        us_password: hashedPassword,
      },
      {
        where: { us_id: userId },
      }
    );

    const updatedCustomer = await user.findOne({
      where: { us_id: userId },
      attributes: {
        exclude: ["us_password", "us_updated_at", "us_created_at"],
      },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User updated successfully",
      data: {
        previousData: previousDataUser,
        updatedData: updatedCustomer,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userToDelete = await user.findOne({
      where: { us_id: userId },
    });

    if (!userToDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    await user.destroy({
      where: { us_id: userId },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User deleted successfully",
      data: userToDelete,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getUserCount,
  getProductCount,
  getOrderCount,
  getTotalAmount,
  getAllOrder,
  getOrderToday,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
};
