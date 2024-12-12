const request = require("supertest");
const app = require("@/index");

const admin = require("@/controllers/firebase.controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user, token } = require("@/models");

jest.mock("@/models", () => ({
  user: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  token: {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
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
jest.mock("sequelize");
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(),
  }),
}));

jest.mock("@/controllers/firebase.controller", () => ({
  auth: jest.fn().mockReturnValue({
    verifyIdToken: jest.fn(),
  }),
}));

const sendEmail = jest.fn();
const generateToken = jest.fn();

describe("POST /auth/register", () => {
  describe("authRegister", () => {
    it("should register a new user successfully with code 201", async () => {
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
      generateToken.mockReturnValue("test_verification_token");
      token.create.mockResolvedValue("token_created");
      const newUser = {
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_password: "password",
      };
      const response = await request(app).post("/auth/register").send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User successfully created"
      );
      expect(response.body).toHaveProperty("code", 201);
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
    it("should return 400 username already taken", async () => {
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
      expect(response.body).toHaveProperty(
        "message",
        "Username is already taken"
      );
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
    it("should return 400 phone number is already taken", async () => {
      user.findOne.mockResolvedValueOnce(null);
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
      expect(response.body).toHaveProperty(
        "message",
        "Phone number is already taken"
      );
    });
    it("should return 500 when error occurs", async () => {
      user.findOne.mockImplementation(() => {
        throw new Error("Error");
      });
      const newUser = {
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_password: "password",
      };
      const response = await request(app).post("/auth/register").send(newUser);
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    it("should return 400 when missing required fields", async () => {
      const newUser = {
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
      };
      const response = await request(app).post("/auth/register").send(newUser);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    it("should return 500 when error occurs", async () => {
      user.findOne.mockResolvedValue(null);
      bcrypt.hash.mockImplementation(() => {
        throw new Error("Error");
      });
      const newUser = {
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_password: "password",
      };
      const response = await request(app).post("/auth/register").send(newUser);
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("message", "Internal server error");
      expect(response.body).toHaveProperty("error", expect.any(String));
      expect(response.body).toHaveProperty("code", 500);
    });
  });
});

describe("POST /auth/login", () => {
  it("should login successfully with code 200", async () => {
    user.findOne.mockResolvedValue({
      dataValues: {
        us_id: 1,
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_is_admin: false,
        token: "token_data",
        rememberMe: true,
      },
      us_is_active: true,
    });
    bcrypt.compare.mockResolvedValue(true);
    generateToken.mockReturnValue("test_login_token");
    token.create.mockResolvedValue("token_created");

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "password",
      rememberMe: true,
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Login success");
    expect(response.body).toHaveProperty("code", 200);
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });

  it("should set cookies expired 7 days", async () => {
    user.findOne.mockResolvedValue({
      dataValues: {
        us_id: 1,
        us_username: "John Doe",
        us_email: "johndoe@gmail.com",
        us_phone_number: "08123456789",
        us_is_admin: false,
        token: "token_data",
        rememberMe: false,
      },
      us_is_active: true,
    });

    bcrypt.compare.mockResolvedValue(true);
    generateToken.mockReturnValue("test_login_token");
    token.create.mockResolvedValue("token_created");

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "password",
      rememberMe: false,
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Login success");
    expect(response.body).toHaveProperty("code", 200);
  });

  it("should return 400 when missing required fields", async () => {
    const loginData = {
      input: "johndoe@gmail.com",
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should return 400 when user not found", async () => {
    user.findOne.mockResolvedValue(null);

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "password",
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Login Failed");
  });

  it("should return 400 when password does not match", async () => {
    user.findOne.mockResolvedValue({
      us_id: 1,
      us_username: "JohnDoe",
      us_email: "johndoe@gmail.com",
      us_password: "$2b$10$hashedpassword",
      us_is_active: true,
    });
    bcrypt.compare.mockResolvedValue(false);

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "wrongpassword",
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Login Failed");
  });

  it("should return 400 when email is not verified", async () => {
    user.findOne.mockResolvedValue({
      us_id: 1,
      us_username: "JohnDoe",
      us_email: "johndoe@gmail.com",
      us_password: "$2b$10$hashedpassword",
      us_is_active: false,
    });
    bcrypt.compare.mockResolvedValue(true);

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "password",
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Please verify your email first"
    );
  });

  it("should return 500 when an error occurs", async () => {
    user.findOne.mockImplementation(() => {
      throw new Error("Internal server error");
    });

    const loginData = {
      input: "johndoe@gmail.com",
      us_password: "password",
    };

    const response = await request(app).post("/auth/login").send(loginData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal server error");
  });
});

describe("POST /auth/logout", () => {
  it("should logout successfully with code 200", async () => {
    jwt.decode.mockReturnValue({ us_id: 1 });
    token.findOne.mockResolvedValue({
      update: jest.fn().mockResolvedValue(true),
    });

    const response = await request(app)
      .post("/auth/logout")
      .set("Cookie", "Authentication=valid_token;");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Logout successfully");
    expect(response.body).toHaveProperty("code", 200);
  });

  it("should deactivate user token if exists", async () => {
    jwt.decode.mockReturnValue({ us_id: 1 });

    token.findOne.mockResolvedValue(null);

    const decodedToken = jwt.decode("some_token");
    if (decodedToken && decodedToken.us_id) {
      const { us_id } = decodedToken;

      const userToken = await token.findOne({
        where: { tkn_us_id: us_id },
      });

      if (userToken) {
        await userToken.update({ tkn_is_active: false }); // Pastikan update dipanggil
      }
    }

    // Pastikan response status code dan body sesuai
    const response = await request(app)
      .post("/auth/logout")
      .set("Cookie", "Authentication=some_token;");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Logout successfully");
    expect(response.body).toHaveProperty("code", 200);
  });

  it("should return 200 even if no token found", async () => {
    jwt.decode.mockReturnValue(null);

    const response = await request(app)
      .post("/auth/logout")
      .set("Cookie", "Authentication=valid_token;");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Logout successfully");
    expect(response.body).toHaveProperty("code", 200);
  });

  it("should handle invalid token gracefully", async () => {
    jwt.decode.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const response = await request(app)
      .post("/auth/logout")
      .set("Cookie", "Authentication=invalid_token;");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });

  it("should return 400 if an error occurs", async () => {
    jwt.decode.mockReturnValue({ us_id: 1 });
    token.findOne.mockImplementation(() => {
      throw new Error("Database error");
    });

    const response = await request(app)
      .post("/auth/logout")
      .set("Cookie", "Authentication=valid_token;");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Database error");
  });

  it("should handle missing Authentication cookie", async () => {
    const response = await request(app).post("/auth/logout");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Logout successfully");
    expect(response.body).toHaveProperty("code", 200);
  });
});

describe("POST /auth/forgot-password", () => {
  it("should send forgot password email successfully", async () => {
    user.findOne.mockResolvedValue({
      us_id: 1,
      us_email: "john@gmail.com",
    });

    const requestBody = { us_email: "john@gmail.com" };
    generateToken.mockReturnValue("test_login_token");
    token.create.mockResolvedValue("token_created");

    sendEmail.mockResolvedValue(true);
    const response = await request(app)
      .post("/auth/forgot-password")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Email sent successfully");
  });

  it("should return 400 when user not found", async () => {
    user.findOne.mockResolvedValue(null);

    const requestBody = { us_email: "nonexistentuser@gmail.com" };

    const response = await request(app)
      .post("/auth/forgot-password")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 400 when email is not provided", async () => {
    const requestBody = {};

    const response = await request(app)
      .post("/auth/forgot-password")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should return 500 when an error occurs", async () => {
    user.findOne.mockImplementation(() => {
      throw new Error("Database error");
    });

    const requestBody = { us_email: "johndoe@gmail.com" };

    const response = await request(app)
      .post("/auth/forgot-password")
      .send(requestBody);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("POST /auth/send-email-verification", () => {
  it("should send email verification successfully", async () => {
    user.findOne.mockResolvedValue({
      us_id: 1,
      us_email: "john@gmail.com",
      us_username: "John Doe",
      us_is_active: false,
    });

    generateToken.mockReturnValue("test_verification_token");
    token.create.mockResolvedValue("token_created");
    sendEmail.mockResolvedValue(true);

    const requestBody = { us_email: "john@gmail.com" };

    const response = await request(app)
      .post("/auth/send-email-verification")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Email sent successfully");
  });

  it("should return 400 when user not found", async () => {
    user.findOne.mockResolvedValue(null);

    const requestBody = { us_email: "nonexistentuser@gmail.com" };

    const response = await request(app)
      .post("/auth/send-email-verification")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "User not found");
  });

  it("should return 500 when email is already verified", async () => {
    user.findOne.mockResolvedValue({
      us_id: 1,
      us_email: "verifieduser@gmail.com",
      us_username: "Verified User",
      us_is_active: true,
    });

    const requestBody = { us_email: "verifieduser@gmail.com" };

    const response = await request(app)
      .post("/auth/send-email-verification")
      .send(requestBody);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", "Email already verified");
  });

  it("should return 500 when an error occurs", async () => {
    user.findOne.mockImplementation(() => {
      throw new Error("Database error");
    });

    const requestBody = { us_email: "johndoe@gmail.com" };

    const response = await request(app)
      .post("/auth/send-email-verification")
      .send(requestBody);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("PUT /auth/update-reset-password", () => {
  it("should update the password successfully", async () => {
    jwt.verify.mockReturnValue({ us_id: 1 });
    bcrypt.hash.mockResolvedValue("hashed_password");
    user.update.mockResolvedValue(true);

    const requestBody = { us_password: "new_password" };
    const query = { token: "valid_token" };

    const response = await request(app)
      .put("/auth/update-reset-password")
      .query(query)
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Password updated successfully"
    );
  });

  it("should return 400 for expired or invalid token", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Token expired or invalid");
    });

    const requestBody = { us_password: "new_password" };
    const query = { token: "invalid_or_expired_token" };

    const response = await request(app)
      .put("/auth/update-reset-password")
      .query(query)
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Token expired or invalid, please request a new link to reset password"
    );
  });

  it("should return 400 when password hashing fails", async () => {
    jwt.verify.mockReturnValue({ us_id: 1 });

    bcrypt.hash.mockImplementation(() => {
      throw new Error("Hashing error");
    });

    const requestBody = { us_password: "new_password" };
    const query = { token: "valid_token" };

    const response = await request(app)
      .put("/auth/update-reset-password")
      .query(query)
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Hashing error");
  });

  it("should return 400 when database update fails", async () => {
    // Mock jwt.verify untuk mendekode token
    jwt.verify.mockReturnValue({ us_id: 1 });

    // Mock bcrypt.hash untuk hashing password
    bcrypt.hash.mockResolvedValue("hashed_password");

    // Simulasi error pada user.update
    user.update.mockImplementation(() => {
      throw new Error("Database error");
    });

    const requestBody = { us_password: "new_password" };
    const query = { token: "valid_token" };

    const response = await request(app)
      .put("/auth/update-reset-password")
      .query(query)
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Database error");
  });
});

describe("POST /auth/google-login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should login successfully with an existing user with cookie expire in 7 days", async () => {
    admin.auth().verifyIdToken.mockResolvedValue({
      email: "john@gmail.com",
      name: "John Doe",
    });

    const mockUser = {
      us_id: 1,
      us_email: "john@gmail.com",
      us_username: "John Doe",
      us_is_admin: false,
      us_phone_number: "08123456789",
      us_password: "hashed_password",
      dataValues: {
        us_id: 1,
        us_email: "john@gmail.com",
        us_username: "John Doe",
        us_is_admin: false,
        us_phone_number: "08123456789",
      },
    };

    user.findOne.mockResolvedValue(mockUser);

    const mockToken = "test_login_token";
    generateToken.mockReturnValue(mockToken);
    token.create.mockResolvedValue(true);

    const requestBody = {
      idToken: "valid_id_token",
      rememberMe: false,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Login success");
  });
  it("should login successfully with an existing user with cookie expire in 30 days", async () => {
    admin.auth().verifyIdToken.mockResolvedValue({
      email: "john@gmail.com",
      name: "John Doe",
    });

    const mockUser = {
      us_id: 1,
      us_email: "john@gmail.com",
      us_username: "John Doe",
      us_is_admin: false,
      us_phone_number: "08123456789",
      us_password: "hashed_password",
      dataValues: {
        us_id: 1,
        us_email: "john@gmail.com",
        us_username: "John Doe",
        us_is_admin: false,
        us_phone_number: "08123456789",
      },
    };

    user.findOne.mockResolvedValue(mockUser);

    const mockToken = "test_login_token";
    generateToken.mockReturnValue(mockToken);
    token.create.mockResolvedValue(true);

    const requestBody = {
      idToken: "valid_id_token",
      rememberMe: true,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Login success");
  });

  it("should create and login a new user if not found", async () => {
    admin.auth().verifyIdToken.mockResolvedValue({
      email: "newuser@gmail.com",
      name: "New User",
    });

    user.findOne.mockResolvedValue(null);

    const mockCreatedUser = {
      us_id: 2,
      us_email: "newuser@gmail.com",
      us_username: "New User",
      us_is_admin: false,
      us_phone_number: "08xxxxxxxxxx",
      dataValues: {
        us_id: 2,
        us_email: "newuser@gmail.com",
        us_username: "New User",
        us_is_admin: false,
        us_phone_number: "08xxxxxxxxxx",
      },
    };

    user.create.mockResolvedValue(mockCreatedUser);

    bcrypt.hash.mockResolvedValue("hashed_random_password");

    const mockToken = "new_user_token";
    generateToken.mockReturnValue(mockToken);
    token.create.mockResolvedValue(true);

    const requestBody = {
      idToken: "valid_id_token",
      rememberMe: false,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Login success");
  });

  it("should handle Firebase verification failure", async () => {
    admin.auth().verifyIdToken.mockRejectedValue(new Error("Invalid token"));

    const requestBody = {
      idToken: "invalid_id_token",
      rememberMe: false,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      status: "error",
      code: 400,
      message: "Invalid token",
    });
  });

  it("should return 400 for invalid Google token", async () => {
    admin.auth().verifyIdToken.mockImplementation(() => {
      throw new Error("Invalid Google token");
    });

    const requestBody = {
      idToken: "invalid_id_token",
      rememberMe: false,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message", "Invalid Google token");
  });

  it("should return 400 when user creation fails", async () => {
    admin.auth().verifyIdToken.mockResolvedValue({
      email: "newuserfail@gmail.com",
      name: "New User Fail",
    });

    user.findOne.mockResolvedValue(null);

    bcrypt.hash.mockResolvedValue("hashed_random_password");

    user.create.mockImplementation(() => {
      throw new Error("Database error");
    });

    const requestBody = {
      idToken: "valid_id_token",
      rememberMe: false,
    };

    const response = await request(app)
      .post("/auth/google-login")
      .send(requestBody);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status", "error");
    expect(response.body).toHaveProperty("message", "Database error");
  });
});
