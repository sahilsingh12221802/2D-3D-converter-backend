const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/files', fileRoutes);

// Database connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Serve static files from the uploads folder
app.use('/uploads', express.static(config.UPLOAD_PATH));

module.exports = app;