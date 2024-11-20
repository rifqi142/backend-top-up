const { user, product, Order, OrderItem, category } = require("@/models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { midtransVerifyTransaction } = require("@/services/midtrans");
const { uploadImage } = require("@/services/cloudinary.service");

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
    const allOrder = await Order.findAll({
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

    if (!allOrder || allOrder.length === 0) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Orders not found",
      });
    }

    const updatedOrders = await Promise.all(
      allOrder.map(async (order) => {
        try {
          const transaction = await midtransVerifyTransaction(
            order.or_platform_id
          );

          if (!transaction) {
            console.warn(
              `Transaction not found for order ID: ${order.or_platform_id}`
            );
            return order.toJSON();
          }

          let statusOrder = order.or_status;

          if (transaction.transaction_status === "settlement") {
            statusOrder = "settlement";
          } else if (transaction.transaction_status === "expire") {
            statusOrder = "expire";
          } else if (transaction.transaction_status === "cancel") {
            statusOrder = "cancel";
          }

          const updateData = {
            or_status: statusOrder,
            or_payment_status: transaction.transaction_status,
            or_updated_at: new Date(),
          };

          if (transaction.va_numbers) {
            updateData.or_vaNumber = transaction.va_numbers;
          }

          await Order.update(updateData, {
            where: { or_platform_id: transaction.order_id },
          });

          return { ...order.toJSON(), ...updateData };
        } catch (error) {
          console.error(`Error updating order ${order.or_platform_id}:`, error);
          return order.toJSON();
        }
      })
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      data: updatedOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
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

// get all category
const getNameCategory = async (req, res) => {
  try {
    const allCategory = await category.findAll({
      attributes: ["ct_id", "ct_name"],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// create product
const createProduct = async (req, res) => {
  try {
    const { pr_ct_id, pr_name, pr_price, pr_stock_quantity } = req.body;

    if (!pr_ct_id || !pr_name || !pr_price || !pr_stock_quantity) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Please fill all required fields",
      });
    }

    const categoryExists = await category.findOne({
      where: { ct_id: pr_ct_id },
    });

    if (!categoryExists) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Category not found",
      });
    }

    if (pr_price <= 0 || pr_stock_quantity < 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Price must be greater than 0 and stock must be non-negative",
      });
    }

    const existingProduct = await product.findOne({
      where: {
        pr_name: {
          [Op.iLike]: pr_name,
        },
      },
    });

    if (existingProduct) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Product name already exists",
      });
    }

    const newProduct = await product.create({
      pr_ct_id,
      pr_name,
      pr_price,
      pr_stock_quantity,
      pr_created_at: new Date(),
      pr_updated_at: new Date(),
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await product.findAll({
      where: {
        pr_ct_id: categoryId,
      },
      attributes: {
        exclude: ["pr_created_at", "pr_updated_at"],
      },
      include: [
        {
          model: category,
          as: "category",
          attributes: ["ct_name"],
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pr_ct_id, pr_name, pr_price, pr_stock_quantity } = req.body;
    const { productId } = req.params;

    if (!pr_ct_id || !pr_name || !pr_price || !pr_stock_quantity) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Please fill all required fields",
      });
    }

    const oldProduct = await product.findOne({
      where: { pr_id: productId },
    });

    if (!oldProduct) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Product not found",
      });
    }

    const previousDataProduct = {
      pr_id: oldProduct.pr_id,
      pr_ct_id: oldProduct.pr_ct_id,
      pr_name: oldProduct.pr_name,
      pr_price: oldProduct.pr_price,
      pr_stock_quantity: oldProduct.pr_stock_quantity,
    };

    if (pr_price <= 0 || pr_stock_quantity < 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Price must be greater than 0 and stock must be non-negative",
      });
    }

    await product.update(
      {
        pr_ct_id,
        pr_name,
        pr_price,
        pr_stock_quantity,
        pr_updated_at: new Date(),
      },
      {
        where: { pr_id: productId },
      }
    );

    const updatedProduct = await product.findOne({
      where: { pr_id: productId },
      attributes: {
        exclude: ["pr_created_at", "pr_updated_at"],
      },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Product updated successfully",
      data: {
        previousData: previousDataProduct,
        updatedData: updatedProduct,
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

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const productToDelete = await product.findOne({
      where: { pr_id: productId },
    });

    if (!productToDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Product not found",
      });
    }

    await product.destroy({
      where: { pr_id: productId },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Product deleted successfully",
      data: productToDelete,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await product.findAll({
      attributes: {
        exclude: ["pr_created_at", "pr_updated_at"],
      },
      include: [
        {
          model: category,
          as: "category",
          attributes: ["ct_name"],
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

// categories
// get all category
const getAllCategory = async (req, res) => {
  try {
    const allCategory = await category.findAll({
      attributes: {
        exclude: ["ct_created_at", "ct_updated_at"],
      },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: allCategory,
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
  getNameCategory,
  createProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllCategory,
};