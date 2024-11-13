const { Order, OrderItem } = require("@/models");
const generateRandomString = require("@/helpers/generateRandomString");
const {
  midtransCreateSnapTransaction,
  midtransVerifyTransaction,
  midtransCancelTransaction,
} = require("@/services/midtrans");

const createOrderAndSnapTransaction = async (req, res) => {
  const { oi_product, or_total_amount, userId, email } = req.body;
  const randomChar1 = generateRandomString(5);
  const randomChar2 = generateRandomString(5);

  console.log(oi_product, "oi product");

  const order_id = `RfqTopup-${randomChar1}-${randomChar2}`;

  try {
    const transactionDetails = {
      transaction_details: {
        order_id,
        gross_amount: or_total_amount,
      },
      customer_details: {
        email,
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: `${process.env.FRONTEND_URL}/order/finish`,
        error: `${process.env.FRONTEND_URL}/order/error`,
      },
      item_details: oi_product.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const transaction = await midtransCreateSnapTransaction(transactionDetails);
    console.log("Transaction details from Midtrans:", transaction);

    const newOrder = await Order.create({
      or_us_id: userId,
      or_status: "pending",
      or_platform_id: order_id,
      or_platform_token: transaction?.token,
      or_payment_status: "pending",
      or_vaNumber: null,
      or_total_amount,
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
    console.error("Error during order creation:", error);
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
      where: { or_platform_id: transaction.orderId },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    let statusOrder = order.or_status;

    if (
      transaction.transactionStatus === "settlement" ||
      transaction.transactionStatus === "success"
    ) {
      statusOrder = "settlement";
    }

    if (transaction.transactionStatus === "cancel") {
      statusOrder = "cancelled";
    }

    if (transaction.transactionStatus === "expire") {
      statusOrder = "expired";
    }

    await Order.update(
      {
        or_status: statusOrder,
        or_payment_status: transaction.transactionStatus,
        or_updated_at: new Date(),
      },
      {
        where: { or_platform_id: transaction.orderId },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Transaction verified successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error during transaction verification:", error);
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
      where: { or_platform_id: transaction.orderId },
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
          where: { or_platform_id: transaction.orderId },
        }
      );
    }

    if (order.or_platform_id && order.or_platform_token === null) {
      const transaction = await midtransCancelTransaction(orderId);
      if (transaction.status_code === "404") {
        await Order.update(
          {
            or_status: "cancelled",
            or_payment_status: "cancel",
            or_updated_at: new Date(),
          },
          {
            where: { or_platform_id: transaction.orderId },
          }
        );
      } else {
        await Order.update(
          {
            or_status: "cancelled",
            or_payment_status: "cancel",
            or_updated_at: new Date(),
          },
          {
            where: { or_platform_id: transaction.orderId },
          }
        );
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Transaction cancelled successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error during transaction cancellation:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to cancel transaction",
    });
  }
};
module.exports = {
  createOrderAndSnapTransaction,
  verifyTransaction,
  cancelTransaction,
};
