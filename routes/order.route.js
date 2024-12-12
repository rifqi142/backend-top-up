const express = require("express");
const router = express.Router();

const {
  createOrderAndSnapTransaction,
  cancelTransaction,
  verifyTransaction,
  getAllOrderByUserId,
  getAllOrder,
} = require("@/controllers/order.controller");

router.post("/create-order-snap-transaction", createOrderAndSnapTransaction);
router.get("/verify-payment/:orderId", verifyTransaction);
router.post("/cancel-order/:orderId", cancelTransaction);
router.get("/get-all-order", getAllOrder);
router.get("/get-all-order/:userId", getAllOrderByUserId);

module.exports = router;
