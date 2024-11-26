const cloudinary = require("cloudinary").v2;
require("dotenv").config();

describe("Cloudinary Configuration", () => {
  it("should call cloudinary.config with the correct environment variables", () => {
    process.env.CLOUDINARY_CLOUD_NAME = "test-cloud-name";
    process.env.CLOUDINARY_API_KEY = "test-api-key";
    process.env.CLOUDINARY_API_SECRET = "test-api-secret";

    cloudinary.config = jest.fn();

    require("@/middlewares/upload/cloudinary");

    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: "test-cloud-name",
      api_key: "test-api-key",
      api_secret: "test-api-secret",
    });
  });

  it("should not call cloudinary.config if environment variables are missing", () => {
    delete process.env.CLOUDINARY_CLOUD_NAME;
    delete process.env.CLOUDINARY_API_KEY;
    delete process.env.CLOUDINARY_API_SECRET;

    cloudinary.config = jest.fn();

    require("@/middlewares/upload/cloudinary");

    expect(cloudinary.config).not.toHaveBeenCalled();
  });
});
