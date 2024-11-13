const express = require("express");
const router = express.Router();

const {
  createOrderAndSnapTransaction,
} = require("@/controllers/order.category");

router.post("/create-order-snap-transaction", createOrderAndSnapTransaction);

module.exports = router;
