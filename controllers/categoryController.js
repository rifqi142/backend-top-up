const { category } = require("@/models");

const getAllCategory = async (req, res) => {
  try {
    const categories = await category.findAll();
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

const getCategoryByName = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const categoryDetail = await category.findOne({
      where: { ct_code: categoryName },
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

module.exports = {
  getAllCategory,
  getCategoryByName,
};
