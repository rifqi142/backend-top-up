const express = require("express");
const router = express.Router();

const { getAllCategory } = require("@/controllers/homeController");

router.get("/get-all-category", getAllCategory);

module.exports = router;
