const cloudinary = require("@/utils/cloudinary");
const { BadRequest } = require("http-errors");

const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

const uploadImage = (file) => {
  if (!allowedTypes.includes(file.mimetype)) {
    throw new BadRequest(
      "Invalid file type. Only JPEG, PNG, and JPG, WEBP are allowed."
    );
  }

  if (file.size > MAX_SIZE) {
    throw new BadRequest("File size exceeds the maximum limit of 10 MB.");
  }

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "final-project-img/img-uploads",
        transformation: [
          { gravity: "auto", height: 215, width: 215, crop: "fill" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    upload.end(file.buffer);
  });
};

module.exports = { uploadImage };
