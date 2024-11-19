const { user, product, Order, OrderItem } = require("@/models");
const { Op } = require("sequelize");

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

module.exports = {
  getUserCount,
  getProductCount,
  getOrderCount,
  getTotalAmount,
  getAllOrder,
  getOrderToday,
};
