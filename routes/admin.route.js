const express = require("express");
const router = express.Router();

const {
  getUserCount,
  getProductCount,
  getOrderCount,
  getTotalAmount,
  getAllOrder,
  getOrderToday,
} = require("@/controllers/admin.controller");

router.get("/get-user-count", getUserCount);
router.get("/get-product-count", getProductCount);
router.get("/get-order-count", getOrderCount);
router.get("/get-total-amount", getTotalAmount);
router.get("/get-all-order", getAllOrder);
router.get("/get-order-today", getOrderToday);

module.exports = router;
