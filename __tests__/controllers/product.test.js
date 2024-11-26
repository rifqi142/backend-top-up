const request = require("supertest");
const app = require("@/index");
const { product } = require("@/models");

jest.mock("@/models", () => ({
  product: {
    findAll: jest.fn(),
  },
}));

describe("GET /products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products successfully", async () => {
    const mockProducts = [
      { pr_id: 1, pr_name: "Product 1", pr_ct_id: 1, pr_price: 100 },
      { pr_id: 2, pr_name: "Product 2", pr_ct_id: 1, pr_price: 200 },
    ];

    product.findAll.mockResolvedValue(mockProducts);

    const response = await request(app).get("/product/get-all-product");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("successfully get all products");
    expect(response.body.code).toBe(200);
    expect(response.body.data).toEqual(mockProducts);
  });

  it("should return 404 when no products are found", async () => {
    product.findAll.mockResolvedValue(null);

    const response = await request(app).get("/product/get-all-product");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Products not found");
  });

  it("should return 500 when there is a server error", async () => {
    product.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/product/get-all-product");

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error get all products");
    expect(response.body.code).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});

describe("GET /products/:categoryId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return products by category ID successfully", async () => {
    const mockProductDetail = [
      { pr_id: 1, pr_name: "Product 1", pr_ct_id: 1, pr_price: 100 },
      { pr_id: 2, pr_name: "Product 2", pr_ct_id: 1, pr_price: 200 },
    ];

    product.findAll.mockResolvedValue(mockProductDetail);

    const response = await request(app).get("/product/get-product-detail/1");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.data).toEqual(mockProductDetail);
  });

  it("should return 404 when no products are found for the category", async () => {
    product.findAll.mockResolvedValue(null);

    const response = await request(app).get("/product/get-product-detail/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });

  it("should return 500 when there is a server error", async () => {
    product.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/product/get-product-detail/1");

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.code).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
