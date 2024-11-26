const request = require("supertest");
const app = require("@/index");
const jwt = require("jsonwebtoken");
const { user } = require("@/models");

jest.mock("@/models", () => ({
  user: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  decode: jest.fn(),
  verify: jest.fn(),
}));

describe("GET /auth/verify-email", () => {
  let mockToken;
  const mockUser = {
    id: 1,
    email: "johndoe@example.com",
    us_active: false,
    us_is_active: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockToken = jwt.sign(
      { id: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET
    );
  });

  it("should return 200 and redirect to verify-success for valid token and inactive user", async () => {
    jwt.verify.mockResolvedValue({ id: mockUser.id, email: mockUser.email });

    user.findOne.mockResolvedValue(mockUser);

    user.update.mockResolvedValue([1, [mockUser]]);

    const response = await request(app).get(`/auth/verify-email`);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(
      `${process.env.FRONTEND_URL}/verify-success`
    );
  });

  it("should return 400 if email is already verified", async () => {
    jwt.verify.mockResolvedValue({ id: mockUser.id, email: mockUser.email });

    user.findOne.mockResolvedValue({ ...mockUser, us_active: true });

    const response = await request(app).get(
      `/auth/verify-email?token=${mockToken}`
    );

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Email already verified");
  });

  it("should return 401 if token is not valid", async () => {
    user.findOne.mockResolvedValue(null);

    const response = await request(app).get(`/auth/verify-email`);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Token is not valid");
  });

  it("should return 302 if there is an error in the process", async () => {
    jwt.verify.mockResolvedValue({ id: mockUser.id, email: mockUser.email });

    user.findOne.mockResolvedValue(mockUser);

    user.update.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get(
      `/auth/verify-email?token=${mockToken}`
    );

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(
      `${process.env.FRONTEND_URL}/verify-failed`
    );
  });
});
