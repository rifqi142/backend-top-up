const app = require("@/index");
const request = require("supertest");
const { Order, OrderItem } = require("@/models");
const {
  getAllOrderByUserId,
  getAllOrder,
} = require("@/controllers/order.controller");

jest.mock("@/models", () => ({
  Order: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
  OrderItem: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

describe("Order Controller", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.get("/orders/user/:userId", getAllOrderByUserId);
    app.get("/orders", getAllOrder);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllOrderByUserId", () => {
    it("should return orders for a specific user", async () => {
      const mockUserId = 1;
      const mockOrders = [
        {
          id: 1,
          or_us_id: mockUserId,
          orderItem: [
            {
              id: 1,
              product_name: "Product 1",
              quantity: 2,
            },
          ],
        },
      ];

      Order.findAll.mockResolvedValue(mockOrders);

      const response = await request(app)
        .get(`/orders/user/${mockUserId}`)
        .expect(200);

      expect(response.body).toEqual({
        status: "success",
        message: "Order retrieved successfully",
        data: mockOrders,
      });

      expect(Order.findAll).toHaveBeenCalledWith({
        where: { or_us_id: mockUserId },
        attributes: {
          exclude: ["or_updated_at"],
        },
        include: [
          {
            model: OrderItem,
            as: "orderItem",
            attributes: {
              exclude: ["oi_created_at", "oi_updated_at"],
            },
          },
        ],
      });
    });

    it("should handle server errors gracefully", async () => {
      const mockUserId = 1;

      Order.findAll.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get(`/orders/user/${mockUserId}`)
        .expect(500);

      expect(response.body).toEqual({
        status: "error",
        message: "Failed to retrieve order",
      });
    });
  });

  describe("getAllOrder", () => {
    it("should return all orders", async () => {
      const mockOrders = [
        {
          id: 1,
          or_us_id: 1,
          orderItem: [
            {
              id: 1,
              product_name: "Product 1",
              quantity: 2,
            },
          ],
        },
      ];

      Order.findAll.mockResolvedValue(mockOrders);

      const response = await request(app).get("/orders").expect(200);

      expect(response.body).toEqual({
        status: "success",
        message: "Order retrieved successfully",
        data: mockOrders,
      });

      expect(Order.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ["or_updated_at", "or_updated_at"],
        },
        include: [
          {
            model: OrderItem,
            as: "orderItem",
            attributes: {
              exclude: ["oi_created_at", "oi_updated_at"],
            },
          },
        ],
      });
    });

    it("should handle server errors gracefully", async () => {
      Order.findAll.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/orders").expect(500);

      expect(response.body).toEqual({
        status: "error",
        message: "Failed to retrieve order",
      });
    });
  });
});
