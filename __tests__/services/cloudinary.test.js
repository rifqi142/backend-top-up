const { uploadImage } = require("@/services/cloudinary.service");
const { BadRequest } = require("http-errors");
const cloudinary = require("@/utils/cloudinary");

jest.mock("@/utils/cloudinary");

describe("uploadImage", () => {
  const mockFile = {
    mimetype: "image/jpeg",
    size: 5 * 1024 * 1024,
    buffer: Buffer.from("mockBuffer"),
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should upload a valid image successfully", async () => {
    const mockResult = { url: "https://cloudinary.com/mock-url" };
    const mockUploadStream = jest.fn((options, callback) => {
      callback(null, mockResult);
      return { end: jest.fn() };
    });
    cloudinary.uploader.upload_stream.mockImplementation(mockUploadStream);
    const result = await uploadImage(mockFile);
    expect(result).toEqual(mockResult);
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledTimes(1);
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Function)
    );
  });
  it("should throw BadRequest error for invalid file type", async () => {
    const invalidFile = { ...mockFile, mimetype: "application/pdf" };
    await expect(() => uploadImage(invalidFile)).toThrow(
      "Invalid file type. Only JPEG, PNG, and JPG, WEBP are allowed."
    );
  });
  it("should throw BadRequest error for file size exceeding limit", async () => {
    const largeFile = { ...mockFile, size: 15 * 1024 * 1024 };
    await expect(() => uploadImage(largeFile)).toThrow(
      "File size exceeds the maximum limit of 10 MB."
    );
  });
  it("should handle Cloudinary upload error", async () => {
    const mockError = new Error("Cloudinary error");
    const mockUploadStream = jest.fn((options, callback) => {
      callback(mockError, null);
      return { end: jest.fn() };
    });
    cloudinary.uploader.upload_stream.mockImplementation(mockUploadStream);
    await expect(uploadImage(mockFile)).rejects.toThrow("Cloudinary error");
  });
});
