const request = require("supertest");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = require("@/utils/multer");

describe("Multer Upload Helper", () => {
  let app;

  beforeEach(() => {
    app = express();

    // Updated route handler to properly handle file upload errors
    app.post("/upload", (req, res, next) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          // Parse the stringified error if it's a JSON string
          try {
            const parsedError = JSON.parse(err);
            return res.status(parsedError.status).json(parsedError);
          } catch {
            // If it's not a JSON string, return a generic error
            return res.status(400).json({
              status: 400,
              description: "Bad Request",
              result: err.toString(),
            });
          }
        }

        // If no file
        if (!req.file) {
          return res.status(400).json({
            status: 400,
            description: "Bad Request",
            result: "Only JPG, JPEG and PNG are allowed.",
          });
        }

        // Successful upload
        res.status(200).json({
          message: "File uploaded successfully",
          filename: req.file.originalname,
        });
      });
    });
  });

  // Helper function to create test files
  const createTestFile = (filename, mimetype) => {
    const testFilePath = path.join(__dirname, filename);
    fs.writeFileSync(testFilePath, "Test file content");
    return {
      path: testFilePath,
      originalname: filename,
      mimetype: mimetype,
    };
  };

  // Clean up test files after each test
  afterEach(() => {
    const testFiles = [
      path.join(__dirname, "test-valid.jpg"),
      path.join(__dirname, "test-valid.jpeg"),
      path.join(__dirname, "test-valid.png"),
      path.join(__dirname, "test-invalid.txt"),
    ];

    testFiles.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  });

  describe("File Upload Validation", () => {
    // Test case for valid JPEG file
    it("should successfully upload a valid JPEG file", async () => {
      const validJpegFile = createTestFile("test-valid.jpg", "image/jpeg");

      const response = await request(app)
        .post("/upload")
        .attach("file", validJpegFile.path)
        .expect(200);

      expect(response.body.filename).toBe("test-valid.jpg");
    });

    // Test case for valid PNG file
    it("should successfully upload a valid PNG file", async () => {
      const validPngFile = createTestFile("test-valid.png", "image/png");

      const response = await request(app)
        .post("/upload")
        .attach("file", validPngFile.path)
        .expect(200);

      expect(response.body.filename).toBe("test-valid.png");
    });

    // Test case for valid JPG file
    it("should successfully upload a valid JPG file", async () => {
      const validJpgFile = createTestFile("test-valid.jpeg", "image/jpg");

      const response = await request(app)
        .post("/upload")
        .attach("file", validJpgFile.path)
        .expect(200);

      expect(response.body.filename).toBe("test-valid.jpeg");
    });

    // Test case for invalid file type
    // it("should reject files with unsupported mime types", async () => {
    //   const invalidFile = createTestFile("test-invalid.txt", "text/plain");

    //   const response = await request(app)
    //     .post("/upload")
    //     .attach("file", invalidFile.path)
    //     .expect(400);

    //   expect(response.body).toEqual({
    //     status: 400,
    //     description: "Bad Request",
    //     result: "Error: Unsupported file type!",
    //   });
    // });
  });

  describe("Filename Handling", () => {
    it("should use the original filename", async () => {
      const validPngFile = createTestFile(
        "test-original-name.png",
        "image/png"
      );

      const response = await request(app)
        .post("/upload")
        .attach("file", validPngFile.path)
        .expect(200);

      expect(response.body.filename).toBe("test-original-name.png");
    });
  });
});
