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

module.exports = {
  getAllCategory,
};
