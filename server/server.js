// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure cors is imported
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORRECTION: Explicit CORS Configuration ---
const allowedOrigins = [
  // 1. Your Deployed Frontend URL (Vercel)
  'https://olivia-zeta.vercel.app', 
  // 2. Localhost for development testing
  'http://localhost:5173'
];

const corsOptions = {
  // Check if the request's origin is in the allowedOrigins list
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true); 
    
    // Check if the origin is in our list or if it's localhost (for development)
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'), false); // Block the request
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow common methods
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 200
};

// Middleware
// MODIFIED: Apply the configured CORS options
app.use(cors(corsOptions)); 
app.use(express.json()); // Parses incoming JSON requests

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Protocol Olivia API is running!');
});

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API Routes ---
const guestbookRoutes = require('./src/routes/guestbook'); 
app.use('/api/guestbook', guestbookRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});