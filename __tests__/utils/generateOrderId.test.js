const { generateOrderId } = require("@/utils/generateOrderId");

describe("generateOrderId", () => {
  it("should generate a valid order ID with the correct format", () => {
    const orderId = generateOrderId();
    const now = new Date();

    const expectedFormat = `RfqTopup-${String(now.getDate()).padStart(
      2,
      "0"
    )}${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}${now.getFullYear()}${String(now.getHours()).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

    expect(orderId).toMatch(/^RfqTopup-\d{8}\d{6}$/);
    expect(orderId).toBe(expectedFormat);
  });
});
