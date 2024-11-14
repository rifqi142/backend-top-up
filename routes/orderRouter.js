const express = require("express");
const router = express.Router();

const {
  createOrderAndSnapTransaction,
  cancelTransaction,
  verifyTransaction,
} = require("@/controllers/order.controller");

router.post("/create-order-snap-transaction", createOrderAndSnapTransaction);
router.get("/verify-payment/:orderId", verifyTransaction);
router.post("/cancel-order/:orderId", cancelTransaction);

module.exports = router;
