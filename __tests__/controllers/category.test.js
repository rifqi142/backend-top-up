const app = require("@/index");
const request = require("supertest");
const { getAllCategory } = require("@/controllers/category.controller");
const { category } = require("@/models");
const { Op } = require("sequelize");

jest.mock("@/models", () => ({
  category: {
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
}));

describe("GET category/get-all-category", () => {
  it("should return all categories", async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    category.findAll.mockResolvedValue([
      {
        ct_code: "CT001",
        ct_name: "Category 1",
        ct_image: "image.jpg",
      },
      {
        ct_code: "CT002",
        ct_name: "Category 2",
        ct_image: "image.jpg",
      },
    ]);

    await getAllCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "successfully get all categories",
      code: 200,
      data: [
        {
          ct_code: "CT001",
          ct_name: "Category 1",
          ct_image: "image.jpg",
        },
        {
          ct_code: "CT002",
          ct_name: "Category 2",
          ct_image: "image.jpg",
        },
      ],
    });
  });

  it("should return error if categories not found", async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    category.findAll.mockResolvedValue(null);

    await getAllCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Categories not found" });
  });

  it("should return error if catch block is executed", async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    category.findAll.mockRejectedValue(new Error("Server Error"));

    await getAllCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error get all categories",
      code: 500,
      message: "Server Error",
    });
  });
});

describe("GET /category/get-category-detail/:categoryCode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return category details when category is found", async () => {
    const mockCategory = {
      ct_code: "CAT123",
      ct_name: "Category Name",
      ct_game_publisher: "Game Publisher",
      ct_currency_type: "USD",
      ct_image: "image_url",
      ct_image_cover: "cover_image_url",
      ct_currency_type_image: "currency_image_url",
    };

    // Mocking the database response
    category.findOne.mockResolvedValue(mockCategory);

    const response = await request(app).get(
      "/category/get-category-detail/CAT123"
    );

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.data).toEqual(mockCategory);
  });

  it("should return 404 when category is not found", async () => {
    category.findOne.mockResolvedValue(null);

    const response = await request(app).get(
      "/category/get-category-detail/CAT999"
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Category not found");
  });

  it("should return 500 when there is a server error", async () => {
    category.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get(
      "/category/get-category-detail/CAT123"
    );

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.code).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});

describe("GET /search-category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return categories matching the search name", async () => {
    const mockCategories = [
      {
        ct_code: "CAT123",
        ct_name: "Category 123",
        ct_image: "image_url",
      },
      {
        ct_code: "CAT124",
        ct_name: "Category 124",
        ct_image: "image_url",
      },
    ];

    category.findAll.mockResolvedValue(mockCategories);

    const response = await request(app)
      .get("/category/search-category")
      .query({ categoryName: "Category" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.data).toEqual(mockCategories);
  });

  it("should return 404 when no categories match the search", async () => {
    category.findAll.mockResolvedValue([]);

    const response = await request(app)
      .get("/category/search-category")
      .query({ categoryName: "NonExistingCategory" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No categories found");
  });

  it("should return 500 when there is a server error", async () => {
    category.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/category/search-category")
      .query({ categoryName: "Category" });

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.code).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
