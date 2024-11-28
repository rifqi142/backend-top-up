const { Order, OrderItem, Promotion } = require("@/models");
const { generateOrderId } = require("@/utils/generateOrderId");
const {
  midtransCreateSnapTransaction,
  midtransVerifyTransaction,
  midtransCancelTransaction,
} = require("@/services/midtrans");
const { Op } = require("sequelize");

const createOrderAndSnapTransaction = async (req, res) => {
  const { oi_product, or_total_amount, userId, email, voucher_code } = req.body;

  const order_id = generateOrderId();

  try {
    let totalAmount = or_total_amount;
    let priceDiscount = 0;

    let transactionDetails = {
      transaction_details: {
        order_id,
        gross_amount: totalAmount,
      },
      customer_details: {
        email,
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: `${process.env.FRONTEND_URL}`,
        error: `${process.env.FRONTEND_URL}`,
      },
      item_details: oi_product.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    if (voucher_code) {
      const promotion = await Promotion.findOne({
        where: {
          prm_code_value: voucher_code,
          prm_is_active: true,
          prm_expired_on: { [Op.gte]: new Date() },
          prm_quantity: { [Op.gt]: 0 },
        },
      });

      if (promotion) {
        const discount =
          (promotion.prm_discount_percentage / 100) * totalAmount;
        totalAmount -= discount;
        priceDiscount = discount;
        transactionDetails.item_details.push({
          id: promotion.prm_id,
          name: promotion.prm_code_value,
          price: -priceDiscount,
          quantity: 1,
          type: "promo",
        });
        oi_product.push({
          id: promotion.prm_id,
          name: promotion.prm_code_value,
          price: -priceDiscount,
          quantity: 1,
          type: "promo",
        });
        transactionDetails.transaction_details.gross_amount -= priceDiscount;
      } else {
        return res.status(400).json({
          status: "error",
          message: "Invalid or expired voucher code",
        });
      }
    }
    const transaction = await midtransCreateSnapTransaction(transactionDetails);

    await Order.destroy({
      where: {
        or_us_id: userId,
        or_status: "pending",
        or_payment_type: {
          [Op.eq]: null,
        },
      },
    });

    const newOrder = await Order.create({
      or_us_id: userId,
      or_status: "pending",
      or_platform_id: order_id,
      or_platform_token: transaction?.token,
      or_payment_status: "pending",
      or_or_payment_type: null,
      or_total_amount: totalAmount,
      or_created_at: new Date(),
      or_updated_at: new Date(),
    });

    await OrderItem.create({
      oi_or_id: newOrder.or_id,
      oi_product: oi_product,
      oi_created_at: new Date(),
      oi_updated_at: new Date(),
    });

    return res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: {
        order: newOrder,
        snapToken: transaction?.token_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create order",
    });
  }
};

const verifyTransaction = async (req, res) => {
  const { orderId } = req.params;

  try {
    const transaction = await midtransVerifyTransaction(orderId);

    let order = await Order.findOne({
      where: { or_platform_id: transaction.order_id },
      include: [
        {
          model: OrderItem,
          as: "orderItem",
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    let statusOrder = order.or_status;

    if (
      transaction.transaction_status === "settlement" ||
      transaction.transaction_status === "success"
    ) {
      statusOrder = "settlement";

      const promo = order?.orderItem?.oi_product?.find(
        (product) => product.type === "promo"
      );

      if (promo) {
        const promotion = await Promotion.findOne({
          where: {
            prm_id: promo.id,
          },
        });

        if (promotion && order.or_status === "pending") {
          await promotion.update({ prm_quantity: promotion.prm_quantity - 1 });
        }
      }
    } else if (transaction.transaction_status === "cancel") {
      statusOrder = "cancelled";
    } else if (transaction.transaction_status === "expire") {
      statusOrder = "expired";
    }

    const updateData = {
      or_status: statusOrder,
      or_payment_status: transaction.transaction_status,
      or_updated_at: new Date(),
    };

    if (transaction.payment_type === "bank_transfer") {
      updateData.or_payment_type = "bank transfer";
    } else {
      updateData.or_payment_type = transaction.payment_type;
    }

    await Order.update(updateData, {
      where: { or_platform_id: transaction.order_id },
    });

    return res.status(200).json({
      status: "success",
      message: "Transaction verified successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to verify transaction",
    });
  }
};

const cancelTransaction = async (req, res) => {
  const { orderId } = req.params;

  try {
    const transaction = await midtransCancelTransaction(orderId);

    let order = await Order.findOne({
      where: { or_platform_id: transaction.order_id },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    if (order.or_platform_id && order.or_platform_token === null) {
      await Order.update(
        {
          or_status: "cancelled",
          or_payment_status: "cancel",
          or_updated_at: new Date(),
        },
        {
          where: { or_platform_id: transaction.order_id },
        }
      );
    }

    return res.status(200).json({
      status: "success",
      message: "Transaction cancelled successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to cancel transaction",
    });
  }
};

const getAllOrderByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { or_us_id: userId },
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
      message: "Order retrieved successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve order",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: {
        exclude: ["or_updated_at", "or_updated_at"],
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
      message: "Order retrieved successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve order",
    });
  }
};

module.exports = {
  createOrderAndSnapTransaction,
  verifyTransaction,
  cancelTransaction,
  getAllOrderByUserId,
  getAllOrder,
};
