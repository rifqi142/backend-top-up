const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getProductByIdCategory,
} = require("@/controllers/product.controller");

router.get("/get-all-product", getAllProduct);
router.get("/get-product-detail/:categoryId", getProductByIdCategory);

module.exports = router;
