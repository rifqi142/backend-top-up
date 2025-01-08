const { user, product, Order, OrderItem, category } = require("@/models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { midtransVerifyTransaction } = require("@/services/midtrans");
const { uploadImage } = require("@/services/cloudinary.service");

// get all user count
const getUserCount = async (req, res) => {
  try {
    const userCount = await user.count();
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Get all user count successfully",
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
      message: "Get all product count successfully",
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
      message: "Get all order count successfully",
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
      message: "Get total amount successfully",
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

          if (transaction.payment_type) {
            updateData.or_payment_type = transaction.payment_type;
          }

          await Order.update(updateData, {
            where: { or_platform_id: transaction.order_id },
          });

          return { ...order.toJSON(), ...updateData };
        } catch (error) {
          return order.toJSON();
        }
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Get all orders successfully",
      code: 200,
      data: updatedOrders,
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

// set to inactive user
const setToInactiveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userToDelete = await user.findOne({
      where: { us_id: userId },
      attributes: {
        exclude: ["us_password", "us_updated_at", "us_created_at"],
      },
    });

    if (!userToDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    await user.update(
      {
        us_is_active: false,
      },
      {
        where: { us_id: userId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User set to inactive successfully",
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

const setActiveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userToActive = await user.findOne({
      where: { us_id: userId },
      attributes: {
        exclude: ["us_password", "us_updated_at", "us_created_at"],
      },
    });

    if (!userToActive) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }

    await user.update(
      {
        us_is_active: true,
      },
      {
        where: { us_id: userId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "User set to active successfully",
      data: userToActive,
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
      message: "Get all category successfully",
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
    const { pr_ct_id, pr_name, pr_price } = req.body;

    if (!pr_ct_id || !pr_name || !pr_price) {
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

    if (pr_price <= 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Price must be greater than 0",
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

const updateProduct = async (req, res) => {
  try {
    const { pr_ct_id, pr_name, pr_price } = req.body;
    const { productId } = req.params;

    if (!pr_ct_id || !pr_name || !pr_price) {
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
    };

    if (pr_price <= 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Price must be greater than 0",
      });
    }

    await product.update(
      {
        pr_ct_id,
        pr_name,
        pr_price,
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

const setToInactiveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const productToInactive = await product.findOne({
      where: { pr_id: productId },
    });

    if (!productToInactive) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Product not found",
      });
    }

    await product.update(
      {
        pr_is_active: false,
      },
      {
        where: { pr_id: productId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Product set to inactive successfully",
      data: productToInactive,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const setToActiveProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const productToActive = await product.findOne({
      where: { pr_id: productId },
    });

    if (!productToActive) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Product not found",
      });
    }

    await product.update(
      {
        pr_is_active: true,
      },
      {
        where: { pr_id: productId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Product set to active successfully",
      data: productToActive,
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
      order: [
        ["pr_ct_id", "ASC"],
        ["pr_id", "ASC"],
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

const createCategory = async (req, res) => {
  try {
    const { ct_name, ct_code, ct_game_publisher, ct_currency_type } = req.body;

    const ct_image = await uploadImage(req?.files?.ct_image[0]);
    const ct_image_cover = await uploadImage(req?.files?.ct_image_cover[0]);
    const ct_currency_type_image = await uploadImage(
      req?.files?.ct_currency_type_image[0]
    );

    if (!ct_image || !ct_image_cover || !ct_currency_type_image) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Failed to upload image",
      });
    }

    const newCategory = await category.create({
      ct_name,
      ct_code,
      ct_game_publisher,
      ct_currency_type,
      ct_image: ct_image.secure_url,
      ct_image_cover: ct_image_cover.secure_url,
      ct_currency_type_image: ct_currency_type_image.secure_url,
      ct_created_at: new Date(),
      ct_updated_at: new Date(),
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { ct_name, ct_code, ct_game_publisher, ct_currency_type } = req.body;
    const { categoryId } = req.params;

    const oldCategory = await category.findOne({
      where: { ct_id: categoryId },
    });

    if (!oldCategory) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Category not found",
      });
    }

    const previousDataCategory = {
      ct_id: oldCategory.ct_id,
      ct_name: oldCategory.ct_name,
      ct_code: oldCategory.ct_code,
      ct_game_publisher: oldCategory.ct_game_publisher,
      ct_currency_type: oldCategory.ct_currency_type,
      ct_image: oldCategory.ct_image,
      ct_image_cover: oldCategory.ct_image_cover,
      ct_currency_type_image: oldCategory.ct_currency_type_image,
    };

    const ct_image = await uploadImage(req?.files?.ct_image[0]);
    const ct_image_cover = await uploadImage(req?.files?.ct_image_cover[0]);
    const ct_currency_type_image = await uploadImage(
      req?.files?.ct_currency_type_image[0]
    );

    await category.update(
      {
        ct_name,
        ct_code,
        ct_game_publisher,
        ct_currency_type,
        ct_image: ct_image.secure_url,
        ct_image_cover: ct_image_cover.secure_url,
        ct_currency_type_image: ct_currency_type_image.secure_url,
        ct_updated_at: new Date(),
      },
      {
        where: { ct_id: categoryId },
      }
    );

    const updatedCategory = await category.findOne({
      where: { ct_id: categoryId },
      attributes: {
        exclude: ["ct_created_at", "ct_updated_at"],
      },
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Category updated successfully",
      data: {
        previousData: previousDataCategory,
        updatedData: updatedCategory,
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

const setToInactiveCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryToDelete = await category.findOne({
      where: { ct_id: categoryId },
    });

    if (!categoryToDelete) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Category not found",
      });
    }

    await category.update(
      {
        ct_is_active: false,
      },
      {
        where: { ct_id: categoryId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Category set to inactive successfully",
      data: categoryToDelete,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const setToActiveCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryToActive = await category.findOne({
      where: { ct_id: categoryId },
    });

    if (!categoryToActive) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Category not found",
      });
    }

    await category.update(
      {
        ct_is_active: true,
      },
      {
        where: { ct_id: categoryId },
      }
    );

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Category set to active successfully",
      data: categoryToActive,
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
  setActiveUser,
  getAllUser,
  updateUser,
  setToInactiveUser,
  getNameCategory,
  createProduct,
  updateProduct,
  setToInactiveProduct,
  setToActiveProduct,
  getAllProducts,
  getAllCategory,
  createCategory,
  updateCategory,
  setToInactiveCategory,
  setToActiveCategory,
};
