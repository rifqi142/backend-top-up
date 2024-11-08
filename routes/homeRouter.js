const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  getCategoryByName,
} = require("@/controllers/homeController");

router.get("/get-all-category", getAllCategory);
router.get("/get-category-detail/:categoryName", getCategoryByName);

module.exports = router;
