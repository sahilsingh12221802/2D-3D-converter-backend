const express = require('express');
const upload = require('../middleware/upload');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
