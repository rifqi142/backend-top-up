const { product } = require("@/models");

const getAllProduct = async (req, res) => {
  try {
    const products = await product.findAll(
      {
        where: { pr_is_active: "true" },
      },
      {
        attributes: {
          exclude: ["pr_createdAt", "pr_updatedAt"],
        },
      }
    );
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json({
      status: "successfully get all products",
      code: 200,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error get all products",
      code: 500,
      message: error.message,
    });
  }
};

const getProductByIdCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const productDetail = await product.findAll({
      where: { pr_ct_id: categoryId, pr_is_active: "true" },
      attributes: {
        exclude: ["pr_created_at", "pr_updated_at"],
      },
      order: [["pr_id", "ASC"]],
    });

    if (!productDetail) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: productDetail,
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
  getAllProduct,
  getProductByIdCategory,
};
