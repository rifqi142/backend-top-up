const express = require("express");
const router = express.Router();

const {
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
  getAllCategory,
  createProduct,
  getProductByCategory,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("@/controllers/admin.controller");
const {
  registerBodyValidation,
  registerCheckDuplicate,
} = require("@/validations/authValidation");

router.get("/get-user-count", getUserCount);
router.get("/get-product-count", getProductCount);
router.get("/get-order-count", getOrderCount);
router.get("/get-total-amount", getTotalAmount);
router.get("/get-all-order", getAllOrder);
router.get("/get-order-today", getOrderToday);
router.post(
  "/create-user",
  createUser,
  registerBodyValidation,
  registerCheckDuplicate
);
router.get("/get-all-user", getAllUser);
router.put(
  "/update-user/:userId",
  updateUser,
  registerBodyValidation,
  registerCheckDuplicate
);
router.delete("/delete-user/:userId", deleteUser);

// products
router.get("/get-all-category", getAllCategory);
router.post("/create-product", createProduct);
router.get("/categories/:categoryId/products", getProductByCategory);
router.put("/update-product/:productId", updateProduct);
router.delete("/delete-product/:productId", deleteProduct);
router.get("/get-all-product", getAllProducts);

module.exports = router;
