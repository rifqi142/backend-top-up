function generateOrderId() {
  const now = new Date();

  const formattedDateTime =
    String(now.getDate()).padStart(2, "0") +
    String(now.getMonth() + 1).padStart(2, "0") +
    now.getFullYear() +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  return `RfqTopup-${formattedDateTime}`;
}

module.exports = { generateOrderId };
