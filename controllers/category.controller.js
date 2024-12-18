const { category } = require("@/models");
const { Op } = require("sequelize");

const getAllCategory = async (req, res) => {
  try {
    const categories = await category.findAll({
      where: { ct_is_active: "true" },
    });
    if (!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    return res.status(200).json({
      status: "successfully get all categories",
      code: 200,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error get all categories",
      code: 500,
      message: error.message,
    });
  }
};

const getCategoryByCode = async (req, res) => {
  const { categoryCode } = req.params;

  try {
    const categoryDetail = await category.findOne({
      where: { ct_code: categoryCode },
    });

    if (!categoryDetail) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: categoryDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

const searchCategory = async (req, res) => {
  const { categoryName } = req.query;

  try {
    const categoryDetail = await category.findAll({
      where: {
        ct_name: {
          [Op.iLike]: `%${categoryName}%`,
        },
      },
      attributes: ["ct_code", "ct_name", "ct_image"],
    });

    if (categoryDetail.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: categoryDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategory,
  getCategoryByCode,
  searchCategory,
};
