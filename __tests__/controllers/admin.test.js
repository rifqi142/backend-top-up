const request = require("supertest");
const app = require("@/index");

const multer = require("multer");
const { user, product, Order, OrderItem, category } = require("@/models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { midtransVerifyTransaction } = require("@/services/midtrans");
const { uploadImage } = require("@/services/cloudinary.service");

console.warn = jest.fn();

jest.mock("@/models", () => ({
  user: {
    findOne: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  product: {
    count: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Order: {
    sum: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  OrderItem: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  category: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  decode: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  decode: jest.fn(),
  verify: jest.fn(),
}));

jest.mock("@/services/midtrans", () => ({
  midtransVerifyTransaction: jest.fn(),
}));

jest.mock("@/services/cloudinary.service", () => ({
  uploadImage: jest.fn(() => ({
    secure_url: "https://example.com/image.jpg",
  })),
}));

jest.mock("sequelize");
const upload = multer({ storage: multer.memoryStorage() });

describe("GET /admin/get-user-count", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user count successfully", async () => {
    user.count.mockResolvedValue(100);

    const response = await request(app).get("/admin/get-user-count");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all user count successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("totalUser", 100);

    expect(user.count).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when an error occurs", async () => {
    user.count.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/admin/get-user-count");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(user.count).toHaveBeenCalledTimes(1);
  });
});

describe("GET /admin/get-product-count", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return product count successfully", async () => {
    product.count.mockResolvedValue(50);

    const response = await request(app).get("/admin/get-product-count");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all product count successfully"
    );
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("totalProduct", 50);

    expect(product.count).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when an error occurs", async () => {
    product.count.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/admin/get-product-count");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(product.count).toHaveBeenCalledTimes(1);
  });
});

describe("GET /admin/get-order-count", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return order count successfully", async () => {
    Order.count.mockResolvedValue(10);

    const response = await request(app).get("/admin/get-order-count");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all order count successfully"
    );
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("totalOrder", 10);

    expect(Order.count).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when an error occurs", async () => {
    Order.count.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/admin/get-order-count");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(Order.count).toHaveBeenCalledTimes(1);
  });
});

describe("GET /admin/get-total-amount", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return total amount successfully", async () => {
    Order.sum.mockResolvedValue(100000);

    const response = await request(app).get("/admin/get-total-amount");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Get total amount successfully"
    );
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("totalAmount", 100000);

    expect(Order.sum).toHaveBeenCalledTimes(1);
  });

  it("should return 500 when an error occurs", async () => {
    Order.sum.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/admin/get-total-amount");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(Order.sum).toHaveBeenCalledTimes(1);
  });
});

describe("GET /admin/get-all-order", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all orders successfully", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    const mockTransaction = {
      transaction_status: "settlement",
      order_id: "ORDER123",
      payment_type: "credit_card",
    };

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(mockTransaction);

    Order.update.mockResolvedValue([1]);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("or_platform_id", "ORDER123");
    expect(response.body.data[0]).toHaveProperty("or_status", "settlement");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).toHaveBeenCalledWith(
      {
        or_status: "settlement",
        or_payment_status: "settlement",
        or_payment_type: "credit_card",
        or_updated_at: expect.any(Date),
      },
      { where: { or_platform_id: "ORDER123" } }
    );
  });

  it("should return 404 if no orders are found", async () => {
    Order.findAll.mockResolvedValue([]);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "Orders not found");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).not.toHaveBeenCalled();
    expect(Order.update).not.toHaveBeenCalled();
  });

  it("should return transaction not found if not have transaction", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(null);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).not.toHaveBeenCalled();
  });

  it("should change transaction status to settlement if transaction status is settlement", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    const mockTransaction = {
      transaction_status: "settlement",
      order_id: "ORDER123",
      payment_type: "credit_card",
    };

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(mockTransaction);

    Order.update.mockResolvedValue([1]);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("or_platform_id", "ORDER123");
    expect(response.body.data[0]).toHaveProperty("or_status", "settlement");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).toHaveBeenCalledWith(
      {
        or_status: "settlement",
        or_payment_status: "settlement",
        or_payment_type: "credit_card",
        or_updated_at: expect.any(Date),
      },
      { where: { or_platform_id: "ORDER123" } }
    );
  });

  it("should change transaction status to cancel if transaction status is cancel", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    const mockTransaction = {
      transaction_status: "cancel",
      order_id: "ORDER123",
      payment_type: "bank_transfer",
    };

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(mockTransaction);

    Order.update.mockResolvedValue([1]);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("or_platform_id", "ORDER123");
    expect(response.body.data[0]).toHaveProperty("or_status", "cancel");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).toHaveBeenCalledWith(
      {
        or_status: "cancel",
        or_payment_status: "cancel",
        or_payment_type: "bank_transfer",
        or_updated_at: expect.any(Date),
      },
      { where: { or_platform_id: "ORDER123" } }
    );
  });

  it("should update payment type if transaction.payment_type is provided", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    const mockTransaction = {
      transaction_status: "settlement",
      order_id: "ORDER123",
      payment_type: "e-wallet",
    };

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(mockTransaction);

    Order.update.mockResolvedValue([1]);

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("or_platform_id", "ORDER123");
    expect(response.body.data[0]).toHaveProperty("or_status", "settlement");
    expect(response.body.data[0]).toHaveProperty("or_payment_type", "e-wallet");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).toHaveBeenCalledWith(
      {
        or_status: "settlement",
        or_payment_status: "settlement",
        or_payment_type: "e-wallet",
        or_updated_at: expect.any(Date),
      },
      { where: { or_platform_id: "ORDER123" } }
    );
  });

  it("should return 500 if an error occurs", async () => {
    Order.findAll.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).not.toHaveBeenCalled();
    expect(Order.update).not.toHaveBeenCalled();
  });

  it("should log an error when failing to update an order", async () => {
    const mockOrders = [
      {
        or_platform_id: "ORDER123",
        or_status: "pending",
        toJSON: jest.fn().mockReturnValue({
          or_platform_id: "ORDER123",
          or_status: "pending",
        }),
      },
    ];

    const mockTransaction = {
      transaction_status: "settlement",
      order_id: "ORDER123",
      payment_type: "credit_card",
    };

    Order.findAll.mockResolvedValue(mockOrders);

    midtransVerifyTransaction.mockResolvedValue(mockTransaction);

    Order.update.mockImplementation(() => {
      throw new Error("Database update error");
    });

    const response = await request(app).get("/admin/get-all-order");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("or_platform_id", "ORDER123");
    expect(response.body.data[0]).toHaveProperty("or_status", "pending");

    expect(Order.findAll).toHaveBeenCalledTimes(1);
    expect(midtransVerifyTransaction).toHaveBeenCalledWith("ORDER123");
    expect(Order.update).toHaveBeenCalledWith(
      {
        or_status: "settlement",
        or_payment_status: "settlement",
        or_payment_type: "credit_card",
        or_updated_at: expect.any(Date),
      },
      { where: { or_platform_id: "ORDER123" } }
    );
  });
});

describe("GET /admin/get-order-today", () => {
  it("should return all orders made today successfully", async () => {
    const mockOrders = [
      {
        id: 1,
        or_created_at: new Date(),
        or_status: "pending",
        orderItem: [
          {
            id: 1,
            product_id: 1,
            quantity: 2,
            price: 50000,
          },
        ],
      },
    ];

    Order.findAll.mockResolvedValue(mockOrders);

    const response = await request(app).get("/admin/get-order-today");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty(
      "message",
      "Get all orders today successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("id", 1);
    expect(response.body.data[0]).toHaveProperty("or_status", "pending");
    expect(response.body.data[0].orderItem).toHaveLength(1);
    expect(response.body.data[0].orderItem[0]).toHaveProperty("id", 1);
    expect(response.body.data[0].orderItem[0]).toHaveProperty("product_id", 1);
    expect(response.body.data[0].orderItem[0]).toHaveProperty("quantity", 2);
    expect(response.body.data[0].orderItem[0]).toHaveProperty("price", 50000);
  });

  it("should return 500 when an error occurs", async () => {
    Order.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/admin/get-order-today");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("POST /admin/create-user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    user.findOne.mockResolvedValue(null);
    user.create.mockResolvedValue({
      dataValues: {
        us_id: 1,
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_password: "password",
        us_is_verified: false,
        us_is_admin: false,
        us_created_at: "2024-11-15T16:02:55.445Z",
        us_updated_at: "2024-11-15T16:02:55.445Z",
      },
    });
    const newUser = {
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_password: "password",
    };
    const response = await request(app)
      .post("/admin/create-user")
      .send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );
    expect(response.body).toHaveProperty("code", 201);
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });

  it("should return 400 email already taken", async () => {
    user.findOne.mockResolvedValueOnce(null);
    user.findOne.mockResolvedValue({
      us_id: 1,
    });
    const newUser = {
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_password: "password",
    };
    const response = await request(app).post("/auth/register").send(newUser);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is already taken");
  });

  it("should return 500 when error occurs", async () => {
    bcrypt.hash.mockRejectedValue(new Error("Hashing error"));
    const newUser = {
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_password: "password",
    };
    const response = await request(app)
      .post("/admin/create-user")
      .send(newUser);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET /admin/get-all-user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users successfully", async () => {
    user.findAll.mockResolvedValue([
      {
        id: 1,
        us_username: "testuser1",
        us_email: "test1@example.com",
        us_phone_number: "1234567890",
        us_is_active: true,
        us_is_admin: false,
        createdAt: "2021-08-01T00:00:00.000Z",
      },
      {
        id: 2,
        us_username: "testuser2",
        us_email: "test2@example.com",
        us_phone_number: "0987654321",
        us_is_active: true,
        us_is_admin: false,
        createdAt: "2021-08-02T00:00:00.000Z",
      },
    ]);

    const response = await request(app).get("/admin/get-all-user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(2);

    expect(response.body.data[0]).toEqual({
      id: 1,
      us_username: "testuser1",
      us_email: "test1@example.com",
      us_phone_number: "1234567890",
      us_is_active: true,
      us_is_admin: false,
      createdAt: "2021-08-01T00:00:00.000Z",
    });

    expect(response.body.data[1]).toEqual({
      id: 2,
      us_username: "testuser2",
      us_email: "test2@example.com",
      us_phone_number: "0987654321",
      us_is_active: true,
      us_is_admin: false,
      createdAt: "2021-08-02T00:00:00.000Z",
    });
  });

  it("should return 500 when an error occurs", async () => {
    user.findAll.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/admin/get-all-user");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("PUT /admin/update-user/:userId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a user successfully", async () => {
    bcrypt.hash.mockResolvedValue("hashed_password");

    const mockOldUser = {
      us_id: 1,
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_is_active: true,
      us_is_admin: false,
    };

    const mockUpdatedUser = {
      us_id: 1,
      us_username: "John Doe Updated",
      us_email: "johnupdated@gmail.com",
      us_phone_number: "08987654321",
      us_is_active: true,
      us_is_admin: false,
    };

    user.findOne
      .mockResolvedValueOnce(mockOldUser)
      .mockResolvedValueOnce(mockUpdatedUser);
    user.update.mockResolvedValue([1]);

    const response = await request(app).put("/admin/update-user/1").send({
      us_username: "John Doe Updated",
      us_email: "johnupdated@gmail.com",
      us_phone_number: "08987654321",
      us_password: "newpassword",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body.message).toBe("User updated successfully");
    expect(response.body.data.previousData).toEqual(mockOldUser);
    expect(response.body.data.updatedData).toEqual(mockUpdatedUser);
  });

  it("should return 404 when user not found", async () => {
    user.findOne.mockResolvedValueOnce(null);

    const response = await request(app).put("/admin/update-user/999").send({
      us_username: "NonExistent User",
      us_email: "nonexistent@gmail.com",
      us_phone_number: "09123456789",
      us_password: "password",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 500 when error occurs during update", async () => {
    const mockOldUser = {
      us_id: 1,
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_is_active: true,
      us_is_admin: false,
    };

    user.findOne.mockResolvedValueOnce(mockOldUser);
    user.update.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).put("/admin/update-user/1").send({
      us_username: "John Doe Updated",
      us_email: "johnupdated@gmail.com",
      us_phone_number: "08987654321",
      us_password: "newpassword",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("PUT /admin/set-active0user/:userId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set a user to active successfully", async () => {
    const mockUser = {
      us_id: 1,
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_is_active: false,
      us_is_admin: false,
    };

    user.findOne.mockResolvedValue(mockUser);
    user.update.mockResolvedValue([1]);

    const response = await request(app).put("/admin/set-active-user/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "User set to active successfully"
    );
    expect(response.body.data).toEqual(mockUser);
  });

  it("should return 404 if user not found", async () => {
    user.findOne.mockResolvedValue(null);

    const response = await request(app).put("/admin/set-active-user/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 500 if an error occurs", async () => {
    user.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).put("/admin/set-active-user/1");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("DELETE /admin/set-inactive-user/:userId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set to inactive a user successfully", async () => {
    const mockUser = {
      us_id: 1,
      us_username: "John Doe",
      us_email: "johndoe@gmail.com",
      us_phone_number: "08123456789",
      us_is_active: true,
      us_is_admin: false,
    };

    user.findOne.mockResolvedValue(mockUser);
    user.destroy.mockResolvedValue(1);

    const response = await request(app).delete("/admin/set-inactive-user/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "User set to inactive successfully"
    );
    expect(response.body.data).toEqual(mockUser);
  });

  it("should return 404 if user not found", async () => {
    user.findOne.mockResolvedValue(null);

    const response = await request(app).delete("/admin/set-inactive-user/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 500 if an error occurs", async () => {
    user.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).delete("/admin/set-inactive-user/1");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("GET /admin/get-name-category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all categories successfully", async () => {
    category.findAll.mockResolvedValue([
      {
        ct_id: 1,
        ct_name: "Category 1",
      },
      {
        ct_id: 2,
        ct_name: "Category 2",
      },
    ]);

    const response = await request(app).get("/admin/get-name-category");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Get all category successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(2);

    expect(category.findAll).toHaveBeenCalledTimes(1);
    expect(category.findAll).toHaveBeenCalledWith({
      attributes: ["ct_id", "ct_name"],
    });
  });

  it("should handle errors gracefully", async () => {
    category.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/admin/get-name-category");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(category.findAll).toHaveBeenCalledTimes(1);
    expect(category.findAll).toHaveBeenCalledWith({
      attributes: ["ct_id", "ct_name"],
    });
  });
});

describe("POST /admin/create-product", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new product successfully", async () => {
    const mockCategory = { ct_id: 1, ct_name: "Electronics" };
    const mockNewProduct = {
      pr_id: 1,
      pr_ct_id: 1,
      pr_name: "New Product",
      pr_price: 1000,
    };

    category.findOne.mockResolvedValue(mockCategory);
    product.findOne.mockResolvedValue(null);
    product.create.mockResolvedValue(mockNewProduct);

    const response = await request(app).post("/admin/create-product").send({
      pr_ct_id: 1,
      pr_name: "New Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 201);
    expect(response.body).toHaveProperty(
      "message",
      "Product created successfully"
    );
    expect(response.body.data).toEqual(mockNewProduct);

    expect(category.findOne).toHaveBeenCalledTimes(1);
    expect(product.findOne).toHaveBeenCalledTimes(1);
    expect(product.create).toHaveBeenCalledTimes(1);
  });

  it("should return 400 when required fields are missing", async () => {
    const response = await request(app).post("/admin/create-product").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 400);
    expect(response.body).toHaveProperty(
      "message",
      "Please fill all required fields"
    );
  });

  it("should return 404 when category does not exist", async () => {
    category.findOne.mockResolvedValue(null);

    const response = await request(app).post("/admin/create-product").send({
      pr_ct_id: 999,
      pr_name: "New Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "Category not found");
  });

  it("should return 400 when price is less than 0", async () => {
    category.findOne.mockResolvedValue({ ct_id: 1 });

    const response = await request(app).post("/admin/create-product").send({
      pr_ct_id: 1,
      pr_name: "New Product",
      pr_price: -1000,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 400);
    expect(response.body).toHaveProperty(
      "message",
      "Price must be greater than 0"
    );
  });

  it("should return 400 when product name already exists", async () => {
    category.findOne.mockResolvedValue({ ct_id: 1 });
    product.findOne.mockResolvedValue({ pr_name: "Existing Product" });

    const response = await request(app).post("/admin/create-product").send({
      pr_ct_id: 1,
      pr_name: "Existing Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 400);
    expect(response.body).toHaveProperty(
      "message",
      "Product name already exists"
    );
  });

  it("should handle server errors gracefully", async () => {
    category.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/admin/create-product").send({
      pr_ct_id: 1,
      pr_name: "New Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("PUT /admin/update-product/:productId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a product successfully", async () => {
    const mockOldProduct = {
      pr_id: 1,
      pr_ct_id: 1,
      pr_name: "Old Product",
      pr_price: 1000,
    };

    const mockUpdatedProduct = {
      pr_id: 1,
      pr_ct_id: 2,
      pr_name: "Updated Product",
      pr_price: 1500,
    };

    product.findOne.mockResolvedValueOnce(mockOldProduct);
    product.update.mockResolvedValue([1]);
    product.findOne.mockResolvedValueOnce(mockUpdatedProduct);

    const response = await request(app).put("/admin/update-product/1").send({
      pr_ct_id: 2,
      pr_name: "Updated Product",
      pr_price: 1500,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Product updated successfully"
    );
    expect(response.body.data.previousData).toEqual(mockOldProduct);
    expect(response.body.data.updatedData).toEqual(mockUpdatedProduct);

    expect(product.findOne).toHaveBeenCalledTimes(2);
    expect(product.update).toHaveBeenCalledTimes(1);
  });

  it("should return 400 when required fields are missing", async () => {
    const response = await request(app).put("/admin/update-product/1").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 400);
    expect(response.body).toHaveProperty(
      "message",
      "Please fill all required fields"
    );
  });

  it("should return 404 when product does not exist", async () => {
    product.findOne.mockResolvedValueOnce(null);

    const response = await request(app).put("/admin/update-product/999").send({
      pr_ct_id: 1,
      pr_name: "Nonexistent Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });

  it("should return 400 when price is less than 0", async () => {
    product.findOne.mockResolvedValue({ pr_id: 1 });

    const response = await request(app).put("/admin/update-product/1").send({
      pr_ct_id: 1,
      pr_name: "Updated Product",
      pr_price: -1000,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 400);
    expect(response.body).toHaveProperty(
      "message",
      "Price must be greater than 0"
    );
  });

  it("should handle server errors gracefully", async () => {
    product.findOne.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).put("/admin/update-product/1").send({
      pr_ct_id: 1,
      pr_name: "Updated Product",
      pr_price: 1000,
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("DELETE /admin/delete-product/:productId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a product successfully", async () => {
    const mockProduct = {
      pr_id: 1,
      pr_ct_id: 1,
      pr_name: "Product",
      pr_price: 1000,
    };

    product.findOne.mockResolvedValue(mockProduct);
    product.destroy.mockResolvedValue(1);

    const response = await request(app).delete("/admin/delete-product/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Product deleted successfully"
    );
    expect(response.body.data).toEqual(mockProduct);
  });

  it("should return 404 if product not found", async () => {
    product.findOne.mockResolvedValue(null);

    const response = await request(app).delete("/admin/delete-product/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });

  it("should return 500 if an error occurs", async () => {
    product.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).delete("/admin/delete-product/1");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("GET /admin/get-all-product", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products successfully", async () => {
    const mockProducts = [
      {
        pr_id: 1,
        pr_name: "Product 1",
        pr_price: 1000,
        category: { ct_name: "Category 1" },
      },
      {
        pr_id: 2,
        pr_name: "Product 2",
        pr_price: 2000,
        category: { ct_name: "Category 2" },
      },
    ];

    product.findAll.mockResolvedValueOnce(mockProducts);

    const response = await request(app).get("/admin/get-all-product");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(mockProducts);

    expect(product.findAll).toHaveBeenCalledTimes(1);
  });

  it("should handle server errors gracefully", async () => {
    product.findAll.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/admin/get-all-product");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(product.findAll).toHaveBeenCalledTimes(1);
  });
});

describe("GET /admin/get-all-category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all categories successfully", async () => {
    const mockCategories = [
      {
        ct_id: 1,
        ct_name: "Category 1",
      },
      {
        ct_id: 2,
        ct_name: "Category 2",
      },
    ];

    category.findAll.mockResolvedValueOnce(mockCategories);

    const response = await request(app).get("/admin/get-all-category");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(mockCategories);

    expect(category.findAll).toHaveBeenCalledTimes(1);
  });

  it("should handle server errors gracefully", async () => {
    category.findAll.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/admin/get-all-category");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(category.findAll).toHaveBeenCalledTimes(1);
  });
});

describe("POST /create-category", () => {
  const mockImageFile = {
    buffer: Buffer.from("test image"),
    originalname: "test.jpg",
    mimetype: "image/jpeg",
  };

  const validCategoryData = {
    ct_name: "Test Category",
    ct_code: "TEST001",
    ct_game_publisher: "Test Publisher",
    ct_currency_type: "USD",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully create a category with valid data", async () => {
    uploadImage.mockResolvedValue({
      secure_url: "https://example.com/image.jpg",
    });

    category.create.mockResolvedValue({
      ...validCategoryData,
      ct_image: "https://example.com/image.jpg",
      ct_image_cover: "https://example.com/image-cover.jpg",
      ct_currency_type_image: "https://example.com/currency.jpg",
    });

    const res = await request(app)
      .post("/admin/create-category")
      .field("ct_name", validCategoryData.ct_name)
      .field("ct_code", validCategoryData.ct_code)
      .field("ct_game_publisher", validCategoryData.ct_game_publisher)
      .field("ct_currency_type", validCategoryData.ct_currency_type)
      .attach("ct_image", mockImageFile.buffer, mockImageFile.originalname)
      .attach(
        "ct_image_cover",
        mockImageFile.buffer,
        mockImageFile.originalname
      )
      .attach(
        "ct_currency_type_image",
        mockImageFile.buffer,
        mockImageFile.originalname
      );

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Category created successfully");
    expect(res.body.data).toHaveProperty("ct_name", validCategoryData.ct_name);

    expect(uploadImage).toHaveBeenCalledTimes(3);
    expect(category.create).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if image upload fails", async () => {
    uploadImage.mockResolvedValue(null);

    const res = await request(app)
      .post("/admin/create-category")
      .field("ct_name", validCategoryData.ct_name)
      .field("ct_code", validCategoryData.ct_code)
      .field("ct_game_publisher", validCategoryData.ct_game_publisher)
      .field("ct_currency_type", validCategoryData.ct_currency_type)
      .attach("ct_image", mockImageFile.buffer, mockImageFile.originalname)
      .attach(
        "ct_image_cover",
        mockImageFile.buffer,
        mockImageFile.originalname
      )
      .attach(
        "ct_currency_type_image",
        mockImageFile.buffer,
        mockImageFile.originalname
      );

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Failed to upload image");
  });

  it("should handle internal server error", async () => {
    category.create.mockRejectedValue(new Error("Database connection error"));

    uploadImage.mockResolvedValue({
      secure_url: "https://example.com/image.jpg",
    });

    const res = await request(app)
      .post("/admin/create-category")
      .field("ct_name", validCategoryData.ct_name)
      .field("ct_code", validCategoryData.ct_code)
      .field("ct_game_publisher", validCategoryData.ct_game_publisher)
      .field("ct_currency_type", validCategoryData.ct_currency_type)
      .attach("ct_image", mockImageFile.buffer, mockImageFile.originalname)
      .attach(
        "ct_image_cover",
        mockImageFile.buffer,
        mockImageFile.originalname
      )
      .attach(
        "ct_currency_type_image",
        mockImageFile.buffer,
        mockImageFile.originalname
      );

    expect(res.status).toBe(500);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Database connection error");
  });
});

describe("Middleware - categoryBodyValidation", () => {
  const {
    categoryBodyValidation,
  } = require("../../validations/category.validation");

  it("should pass validation with valid data", () => {
    const req = {
      body: {
        ct_name: "Valid Name",
        ct_code: "VAL123",
        ct_game_publisher: "Valid Publisher",
        ct_currency_type: "USD",
      },
    };
    const res = {};
    const next = jest.fn();

    categoryBodyValidation(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 400 with empty name", () => {
    const req = {
      body: {
        ct_name: "",
        ct_code: "VAL123",
        ct_game_publisher: "Valid Publisher",
        ct_currency_type: "USD",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    categoryBodyValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringMatching(/"ct_name" is not allowed to be empty/),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 with invalid ct_code length", () => {
    const req = {
      body: {
        ct_name: "Valid Name",
        ct_code: "AB",
        ct_game_publisher: "Valid Publisher",
        ct_currency_type: "USD",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    categoryBodyValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringMatching(
        /"ct_code" length must be at least 3 characters long/
      ),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 with missing ct_game_publisher", () => {
    const req = {
      body: {
        ct_name: "Valid Name",
        ct_code: "VAL123",
        ct_currency_type: "USD",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    categoryBodyValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringMatching(/"ct_game_publisher" is required/),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 with invalid ct_currency_type length", () => {
    const req = {
      body: {
        ct_name: "Valid Name",
        ct_code: "VAL123",
        ct_game_publisher: "Valid Publisher",
        ct_currency_type: "X", // Too short
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    categoryBodyValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringMatching(
        /"ct_currency_type" length must be at least 3 characters long/
      ),
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("PUT /admin/update-category/:categoryId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the category successfully", async () => {
    const categoryId = 1;
    const mockOldCategory = {
      ct_id: categoryId,
      ct_name: "Old Category",
      ct_code: "OLD123",
      ct_game_publisher: "Old Publisher",
      ct_currency_type: "USD",
      ct_image: "old-image-url",
      ct_image_cover: "old-cover-url",
      ct_currency_type_image: "old-currency-image-url",
    };

    const mockUpdatedCategory = {
      ct_id: categoryId,
      ct_name: "Updated Category",
      ct_code: "NEW123",
      ct_game_publisher: "New Publisher",
      ct_currency_type: "EUR",
      ct_image: "new-image-url",
      ct_image_cover: "new-cover-url",
      ct_currency_type_image: "new-currency-image-url",
    };

    category.findOne.mockResolvedValueOnce(mockOldCategory);
    uploadImage.mockResolvedValueOnce({ secure_url: "new-image-url" });
    uploadImage.mockResolvedValueOnce({ secure_url: "new-cover-url" });
    uploadImage.mockResolvedValueOnce({ secure_url: "new-currency-image-url" });
    category.update.mockResolvedValueOnce([1]);
    category.findOne.mockResolvedValueOnce(mockUpdatedCategory);

    const response = await request(app)
      .put(`/admin/update-category/${categoryId}`)
      .send({
        ct_name: "Updated Category",
        ct_code: "NEW123",
        ct_game_publisher: "New Publisher",
        ct_currency_type: "EUR",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Category updated successfully"
    );
    expect(response.body.data.previousData).toEqual(mockOldCategory);
    expect(response.body.data.updatedData).toEqual(mockUpdatedCategory);

    expect(category.findOne).toHaveBeenCalledTimes(2);
    expect(category.update).toHaveBeenCalledTimes(1);
    expect(uploadImage).toHaveBeenCalledTimes(3);
  });

  it("should return 404 if category is not found", async () => {
    category.findOne.mockResolvedValueOnce(null);

    const response = await request(app).put(`/admin/update-category/999`).send({
      ct_name: "Non-existent Category",
      ct_code: "NONE123",
      ct_game_publisher: "Non-existent Publisher",
      ct_currency_type: "XYZ",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 404);
    expect(response.body).toHaveProperty("message", "Category not found");

    expect(category.findOne).toHaveBeenCalledTimes(1);
    expect(category.update).not.toHaveBeenCalled();
    expect(uploadImage).not.toHaveBeenCalled();
  });

  it("should handle server errors gracefully", async () => {
    category.findOne.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).put(`/admin/update-category/1`).send({
      ct_name: "Any Category",
      ct_code: "ANY123",
      ct_game_publisher: "Any Publisher",
      ct_currency_type: "XYZ",
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("code", 500);
    expect(response.body).toHaveProperty("message", "Database error");

    expect(category.findOne).toHaveBeenCalledTimes(1);
    expect(category.update).not.toHaveBeenCalled();
    expect(uploadImage).not.toHaveBeenCalled();
  });
});

describe("DELETE /delete-category/:categoryId", () => {
  it("should return status 404 if category is not found", async () => {
    category.findOne.mockResolvedValue(null);

    const res = await request(app).delete("/admin/delete-category/1");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Category not found");
  });

  it("should return status 200 and delete category successfully", async () => {
    const mockCategory = {
      ct_id: 1,
      ct_name: "Gaming",
      ct_code: "G123",
    };

    category.findOne.mockResolvedValue(mockCategory);
    category.destroy.mockResolvedValue(1);

    const res = await request(app).delete("/admin/delete-category/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category deleted successfully");
    expect(res.body.data.ct_id).toBe(mockCategory.ct_id);
    expect(res.body.data.ct_name).toBe(mockCategory.ct_name);
  });

  it("should return status 500 if there's an error", async () => {
    category.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app).delete("/admin/delete-category/1");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Database error");
  });
});
