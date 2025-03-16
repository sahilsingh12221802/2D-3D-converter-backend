const multer = require('multer');
const path = require('path');
const config = require('../config');

// Ensure the uploads directory exists
const fs = require('fs');
if (!fs.existsSync(config.UPLOAD_PATH)) {
  fs.mkdirSync(config.UPLOAD_PATH, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and JPG files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;