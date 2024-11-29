const express = require("express");
const router = express.Router();
const upload = require("@/utils/multer");

const {
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
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("@/controllers/admin.controller");
const {
  registerBodyValidation,
  registerCheckDuplicate,
} = require("@/validations/authValidation");

const { categoryBodyValidation } = require("@/validations/categoryValidation");

// dashboard
router.get("/get-user-count", getUserCount);
router.get("/get-product-count", getProductCount);
router.get("/get-order-count", getOrderCount);
router.get("/get-total-amount", getTotalAmount);
router.get("/get-order-today", getOrderToday);

// order
router.get("/get-all-order", getAllOrder);

// users
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
router.delete("/set-inactive-user/:userId", setToInactiveUser);
router.put("/set-active-user/:userId", setActiveUser);

// products
router.get("/get-name-category", getNameCategory);
router.post("/create-product", createProduct);
router.put("/update-product/:productId", updateProduct);
router.delete("/delete-product/:productId", deleteProduct);
router.get("/get-all-product", getAllProducts);

// categories
router.get("/get-all-category", getAllCategory);
router.post(
  "/create-category",
  upload.fields([
    { name: "ct_image", maxCount: 1 },
    { name: "ct_image_cover", maxCount: 1 },
    { name: "ct_currency_type_image", maxCount: 1 },
  ]),
  categoryBodyValidation,
  createCategory
);
router.put(
  "/update-category/:categoryId",
  upload.fields([
    { name: "ct_image", maxCount: 1 },
    { name: "ct_image_cover", maxCount: 1 },
    { name: "ct_currency_type_image", maxCount: 1 },
  ]),
  categoryBodyValidation,
  updateCategory
);
router.delete("/delete-category/:categoryId", deleteCategory);

module.exports = router;
