// server/src/routes/guestbook.js

const express = require('express');
const router = express.Router();
const GuestbookEntry = require('../models/guestbook.js');

// @route   GET /api/guestbook
// @desc    Get all guestbook entries (Read)
router.get('/', async (req, res) => {
  try {
    // Sort by most recent entry first
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/guestbook
// @desc    Create a new guestbook entry (Create)
router.post('/', async (req, res) => {
  const { author, message } = req.body;

  try {
    const newEntry = new GuestbookEntry({
      author,
      message,
    });

    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).send(errors);
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;