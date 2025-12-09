// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows frontend to make requests
app.use(express.json()); // Parses incoming JSON requests

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Protocol Olivia API is running!');
});

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API Routes (will be added later) ---
// const guestbookRoutes = require('./src/routes/guestbook');
// app.use('/api/guestbook', guestbookRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});