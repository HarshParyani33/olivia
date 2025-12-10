// server/src/models/Guestbook.js

const mongoose = require('mongoose');

// Define the schema for a Guestbook Entry
const GuestbookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot be more than 500 characters'],
  },
  // We include a timestamp for sorting messages by creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Guestbook', GuestbookSchema);