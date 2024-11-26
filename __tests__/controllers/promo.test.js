const request = require("supertest");
const app = require("@/index");

const { Promotion } = require("@/models");

jest.mock("@/models", () => ({
  Promotion: {
    findAll: jest.fn(),
  },
}));

describe("GET /promotion/get-all-promotion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all active promotions successfully", async () => {
    const mockPromotions = [
      { prm_id: 1, prm_name: "Promo 1", prm_description: "Description 1" },
      { prm_id: 2, prm_name: "Promo 2", prm_description: "Description 2" },
    ];

    Promotion.findAll.mockResolvedValue(mockPromotions);

    const response = await request(app).get("/promotion/get-all-promotion");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("successfully get all promotions");
    expect(response.body.code).toBe(200);
    expect(response.body.data).toEqual(mockPromotions);
  });

  it("should return 404 when no promotions are found", async () => {
    Promotion.findAll.mockResolvedValue([]);

    const response = await request(app).get("/promotion/get-all-promotion");

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("failed");
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("Promotions not found");
  });

  it("should return 500 when there is a server error", async () => {
    Promotion.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/promotion/get-all-promotion");

    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error get all promotions");
    expect(response.body.code).toBe(500);
    expect(response.body.message).toBe("Database error");
  });
});
