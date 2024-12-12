const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  getCategoryByCode,
  searchCategory,
} = require("@/controllers/category.controller");

router.get("/get-all-category", getAllCategory);
router.get("/get-category-detail/:categoryCode", getCategoryByCode);
router.get("/search-category", searchCategory);

module.exports = router;
