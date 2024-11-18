const { Promotion } = require("@/models");

const getAllPromotion = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      where: { prm_is_active: true },
      order: [["prm_id", "ASC"]],
      attributes: {
        exclude: [
          "prm_is_active",
          "prm_type",
          "prm_created_at",
          "prm_updated_at",
        ],
      },
    });

    if (!promotions || promotions.length === 0) {
      return res.status(404).json({
        status: "failed",
        code: 404,
        message: "Promotions not found",
      });
    }

    return res.status(200).json({
      status: "successfully get all promotions",
      code: 200,
      data: promotions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error get all promotions",
      code: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllPromotion,
};
