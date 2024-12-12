const express = require("express");
const router = express.Router();

const { getAllPromotion } = require("@/controllers/promo.controller");

router.get("/get-all-promotion", getAllPromotion);

module.exports = router;
