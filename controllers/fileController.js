const File = require('../models/File');
const path = require('path');
const config = require('../config');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
    });

    await file.save();
    res.status(201).json({ filePath: `/uploads/${req.file.filename}` });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: err.message });
  }
};