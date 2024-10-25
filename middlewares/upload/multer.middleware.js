const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const res = {
      status: 400,
      description: "Bad Request",
      result: "Only JPG, JPEG and PNG are allowed.",
    };

    cb(JSON.stringify(res, null, 2), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
