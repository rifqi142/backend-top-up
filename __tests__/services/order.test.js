const app = require("@/index");
const request = require("supertest");
const { Order, OrderItem, Promotion } = require("@/models");
const {
  getAllOrderByUserId,
  getAllOrder,
} = require("@/controllers/order.controller");
const {
  midtransCreateSnapTransaction,
  midtransVerifyTransaction,
  midtransCancelTransaction,
} = require("@/services/midtrans");

jest.mock("@/models", () => ({
  Order: {
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  },
  OrderItem: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
  Promotion: {
    findOne: jest.fn(),
  },
}));
jest.mock("@/services/midtrans", () => ({
  midtransCreateSnapTransaction: jest.fn(),
  midtransVerifyTransaction: jest.fn(),
  midtransCancelTransaction: jest.fn(),
}));

describe("Order Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("createOrderAndSnapTransaction", () => {
    it("should create order and snap transaction successfully with code 201", async () => {
      midtransCreateSnapTransaction.mockResolvedValue({
        token_id: "token123",
      });
      Order.destroy.mockResolvedValue({});
      Order.create.mockResolvedValue({
        or_id: 1,
        or_platform_id: "platform123",
        or_status: "pending",
      });
      OrderItem.create.mockResolvedValue({});
      const response = await request(app)
        .post("/order/create-order-snap-transaction")
        .send({
          oi_product: [
            {
              id: 1,
              name: "Product 1",
              price: 10000,
              quantity: 2,
            },
          ],
          or_total_amount: 10000,
          userId: 1,
          email: "johndoe@example.com",
          voucher_code: null,
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        status: "success",
        message: "Order created successfully",
        data: {
          order: {
            or_id: 1,
            or_platform_id: "platform123",
            or_status: "pending",
          },
          snapToken: "token123",
        },
      });
    });
    it("should create order with voucher code and snap transaction successfully with code 201", async () => {
      Promotion.findOne.mockResolvedValue({
        prm_id: 1,
        prm_code_value: "mockVoucherCode",
        prm_discount_percentage: 10,
      });
      midtransCreateSnapTransaction.mockResolvedValue({
        token_id: "token123",
      });
      Order.destroy.mockResolvedValue({});
      Order.create.mockResolvedValue({
        or_id: 1,
        or_platform_id: "platform123",
        or_status: "pending",
      });
      OrderItem.create.mockResolvedValue({});
      const response = await request(app)
        .post("/order/create-order-snap-transaction")
        .send({
          oi_product: [
            {
              id: 1,
              name: "Product 1",
              price: 10000,
              quantity: 2,
            },
          ],
          or_total_amount: 10000,
          userId: 1,
          email: "johndoe@example.com",
          voucher_code: "mockVoucherCode",
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        status: "success",
        message: "Order created successfully",
        data: {
          order: {
            or_id: 1,
            or_platform_id: "platform123",
            or_status: "pending",
          },
          snapToken: "token123",
        },
      });
    });
    it("should return Invalid or expired voucher code with code 400", async () => {
      Promotion.findOne.mockResolvedValue(null);
      const response = await request(app)
        .post("/order/create-order-snap-transaction")
        .send({
          oi_product: [
            {
              id: 1,
              name: "Product 1",
              price: 10000,
              quantity: 2,
            },
          ],
          or_total_amount: 10000,
          userId: 1,
          email: "johndoe@example.com",
          voucher_code: "mockVoucherCode",
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: "error",
        message: "Invalid or expired voucher code",
      });
    });
    it("should return 500 when error occurs", async () => {
      midtransCreateSnapTransaction.mockImplementation(() => {
        throw new Error("Database error");
      });
      const response = await request(app)
        .post("/order/create-order-snap-transaction")
        .send({
          oi_product: [
            {
              id: 1,
              name: "Product 1",
              price: 10000,
              quantity: 2,
            },
          ],
          or_total_amount: 10000,
          userId: 1,
          email: "john@gmail.com",
          voucher_code: null,
        });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: "error",
        message: "Failed to create order",
      });
    });
  });
  describe("verifyTransaction", () => {
    it("should verify transaction successfully with code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
      });
      Order.findOne.mockResolvedValue({
        or_status: "settlement",
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
        },
      });
    });
    it("should return Order not found with code 404", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
      });
      Order.findOne.mockResolvedValue(null);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: "error",
        message: "Order not found",
      });
    });
    it("should verify transaction status settlement successfully with promo code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "settlement",
        payment_type: "bank_transfer",
      });
      Order.findOne.mockResolvedValue({
        or_status: "settlement",
        orderItem: {
          oi_product: [{ id: 1, type: "promo" }],
        },
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "settlement",
          payment_type: "bank_transfer",
        },
      });
    });
    it("should verify transaction status settlement successfully without promo but code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "settlement",
      });
      Order.findOne.mockResolvedValue({
        or_status: "settlement",
        orderItem: {
          oi_product: [],
        },
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "settlement",
        },
      });
    });
    it("should verify transaction status settlement successfully with promo and order status pending, code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "settlement",
        payment_type: "bank_transfer",
      });
      Order.findOne.mockResolvedValue({
        or_status: "pending",
        orderItem: {
          oi_product: [{ type: "promo" }],
        },
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
        update: jest.fn().mockResolvedValue(true),
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "settlement",
          payment_type: "bank_transfer",
        },
      });
    });
    it("should verify transaction status cancel successfully with code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "cancel",
      });
      Order.findOne.mockResolvedValue({
        or_status: "cancelled",
        orderItem: {
          oi_product: [{ type: "promo" }],
        },
        update: jest.fn().mockResolvedValue(true),
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "cancel",
        },
      });
    });
    it("should verify transaction status expire successfully with code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "expire",
      });
      Order.findOne.mockResolvedValue({
        or_status: "expired",
        orderItem: {
          oi_product: [{ type: "promo" }],
        },
        update: jest.fn().mockResolvedValue(true),
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "expire",
        },
      });
    });
    it("should verify transaction status settlement successfully with bank transfer, code 200", async () => {
      midtransVerifyTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "settlement",
        payment_type: "bank_transfer",
      });
      Order.findOne.mockResolvedValue({
        or_status: "paid",
        orderItem: {
          oi_product: [{ type: "promo" }],
        },
        update: jest.fn().mockResolvedValue(true),
      });
      Promotion.findOne.mockResolvedValue({
        prm_quantity: 1,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction verified successfully",
        data: {
          order_id: "platform123",
          transaction_status: "settlement",
          payment_type: "bank_transfer",
        },
      });
    });
    it("should return code 500 when error occurs", async () => {
      midtransVerifyTransaction.mockImplementation(() => {
        throw new Error("Database error");
      });
      const response = await request(app).get("/order/verify-payment/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: "error",
        message: "Failed to verify transaction",
      });
    });
  });
  describe("cancelTransaction", () => {
    it("should cancel transaction successfully with code 200", async () => {
      midtransCancelTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "cancel",
        payment_type: "credit_card",
      });
      Order.findOne.mockResolvedValue({
        or_status: "pending",
        or_platform_id: null,
        or_platform_token: "token123",
      });
      const response = await request(app).post("/order/cancel-order/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction cancelled successfully",
        data: {
          order_id: "platform123",
          transaction_status: "cancel",
          payment_type: "credit_card",
        },
      });
    });
    it("should return order not found with code 404", async () => {
      midtransCancelTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "cancel",
        payment_type: "credit_card",
      });
      Order.findOne.mockResolvedValue(null);
      const response = await request(app).post("/order/cancel-order/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: "error",
        message: "Order not found",
      });
    });
    it("should cancel transaction successfully and update midtrans with code 200", async () => {
      midtransCancelTransaction.mockResolvedValue({
        order_id: "platform123",
        transaction_status: "cancel",
        payment_type: "credit_card",
      });
      Order.findOne.mockResolvedValue({
        or_status: "pending",
        or_platform_id: "platform123",
        or_platform_token: null,
      });
      Order.update.mockResolvedValue([1]);
      const response = await request(app).post("/order/cancel-order/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Transaction cancelled successfully",
        data: {
          order_id: "platform123",
          transaction_status: "cancel",
          payment_type: "credit_card",
        },
      });
    });
    it("should return 500 when error occurs", async () => {
      midtransCancelTransaction.mockImplementation(() => {
        throw new Error("Database error");
      });
      const response = await request(app).post("/order/cancel-order/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: "error",
        message: "Failed to cancel transaction",
      });
    });
  });
  describe("getAllOrderByUserId", () => {
    it("should get all order with code 200", async () => {
      Order.findAll.mockResolvedValue([
        {
          or_id: "1",
          or_us_id: "user123",
          or_status: "pending",
          or_payment_status: "credit_card",
        },
      ]);
      const response = await request(app).get("/order/get-all-order/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Order retrieved successfully",
        data: [
          {
            or_id: "1",
            or_us_id: "user123",
            or_status: "pending",
            or_payment_status: "credit_card",
          },
        ],
      });
    });
    it("should return 500 when error occurs", async () => {
      Order.findAll.mockImplementation(() => {
        throw new Error("Database error");
      });
      const response = await request(app).get("/order/get-all-order/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: "error",
        message: "Failed to retrieve order",
      });
    });
  });
  describe("getAllOrderByUserId", () => {
    it("should get all order with code 200", async () => {
      Order.findAll.mockResolvedValue([
        {
          or_id: "1",
          or_us_id: "user123",
          or_status: "pending",
          or_payment_status: "credit_card",
        },
      ]);
      const response = await request(app).get("/order/get-all-order");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: "success",
        message: "Order retrieved successfully",
        data: [
          {
            or_id: "1",
            or_us_id: "user123",
            or_status: "pending",
            or_payment_status: "credit_card",
          },
        ],
      });
    });
    it("should return 500 when error occurs", async () => {
      Order.findAll.mockImplementation(() => {
        throw new Error("Database error");
      });
      const response = await request(app).get("/order/get-all-order");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        status: "error",
        message: "Failed to retrieve order",
      });
    });
  });
});
