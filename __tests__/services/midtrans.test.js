const axios = require("axios");
const {
  midtransCreateSnapTransaction,
  midtransVerifyTransaction,
  midtransCancelTransaction,
} = require("@/services/midtrans");
require("dotenv").config();

jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));
console.log = jest.fn();

describe("services/midtrans", () => {
  const snapUrl = "https://app.sandbox.midtrans.com/snap/v1";
  const baseUrl = "https://api.sandbox.midtrans.com/v2";
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  describe("midtransCreateSnapTransaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("should return transaction data when API call is successful", async () => {
      const transactionDetails = {
        order_id: "order-123",
        gross_amount: 100000,
      };
      const mockResponse = {
        data: {
          token: "dummy-token",
          redirect_url: "https://midtrans.com/redirect",
        },
      };
      axios.post.mockResolvedValue(mockResponse);
      const result = await midtransCreateSnapTransaction(transactionDetails);
      expect(axios.post).toHaveBeenCalledWith(
        `${snapUrl}/transactions`,
        transactionDetails,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
    it("should throw an error with error messages when API call fails", async () => {
      const transactionDetails = {
        order_id: "order-123",
        gross_amount: 100000,
      };
      const mockError = {
        response: {
          error_messages: ["Invalid server key"],
        },
      };
      axios.post.mockRejectedValue(mockError);
      await expect(
        midtransCreateSnapTransaction(transactionDetails)
      ).rejects.toThrow("Failed to create snap transaction");
      expect(axios.post).toHaveBeenCalledWith(
        `${snapUrl}/transactions`,
        transactionDetails,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
    });
    it("should throw a generic error message when API call fails without error messages", async () => {
      const transactionDetails = {
        order_id: "order-123",
        gross_amount: 100000,
      };
      const mockError = {
        response: {
          data: {},
        },
      };
      axios.post.mockRejectedValue(mockError);
      await expect(
        midtransCreateSnapTransaction(transactionDetails)
      ).rejects.toThrow("Failed to create snap transaction");
      expect(axios.post).toHaveBeenCalledWith(
        `${snapUrl}/transactions`,
        transactionDetails,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
    });
  });
  describe("midtransVerifyTransaction", () => {
    it("should return transaction status when API call is successful", async () => {
      const orderId = "order-123";
      const mockResponse = {
        data: {
          status_code: "200",
          status_message: "Transaction found",
          transaction_status: "settlement",
          order_id: orderId,
        },
      };
      axios.get.mockResolvedValue(mockResponse);
      const result = await midtransVerifyTransaction(orderId);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
            "base64"
          )}`,
        },
      });
      expect(result).toEqual(mockResponse.data);
    });
    it("should throw an error with error messages when API call fails", async () => {
      const orderId = "order-123";
      const mockError = {
        response: {
          error_messages: ["Invalid order ID"],
        },
      };
      axios.get.mockRejectedValue(mockError);
      await expect(midtransVerifyTransaction(orderId)).rejects.toThrow(
        "Failed to verify transaction"
      );
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
            "base64"
          )}`,
        },
      });
    });
    it("should throw a generic error message when API call fails without error messages", async () => {
      const orderId = "order-123";
      const mockError = {
        response: {
          data: {},
        },
      };
      axios.get.mockRejectedValue(mockError);
      await expect(midtransVerifyTransaction(orderId)).rejects.toThrow(
        "Failed to verify transaction"
      );
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
            "base64"
          )}`,
        },
      });
    });
  });
  describe("midtransCancelTransaction", () => {
    it("should return success data when transaction is successfully canceled", async () => {
      const orderId = "order-123";
      const mockResponse = {
        data: {
          status_code: "200",
          status_message: "Transaction is canceled",
          order_id: orderId,
        },
      };
      axios.post.mockResolvedValue(mockResponse);
      const result = await midtransCancelTransaction(orderId);
      expect(axios.post).toHaveBeenCalledWith(
        `${baseUrl}/${orderId}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
    it("should throw an error with error messages when API call fails", async () => {
      const orderId = "order-123";
      const mockError = {
        response: {
          error_messages: ["Invalid order ID"],
        },
      };
      axios.post.mockRejectedValue(mockError);
      await expect(midtransCancelTransaction(orderId)).rejects.toThrow(
        "Failed to Cancel Transaction"
      );
      expect(axios.post).toHaveBeenCalledWith(
        `${baseUrl}/${orderId}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
    });
    it("should throw a generic error message when API call fails without error messages", async () => {
      const orderId = "order-123";
      const mockError = {
        response: {
          data: {},
        },
      };
      axios.post.mockRejectedValue(mockError);
      await expect(midtransCancelTransaction(orderId)).rejects.toThrow(
        "Failed to Cancel Transaction"
      );
      expect(axios.post).toHaveBeenCalledWith(
        `${baseUrl}/${orderId}/cancel`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(serverKey + ":").toString(
              "base64"
            )}`,
          },
        }
      );
    });
  });
});
