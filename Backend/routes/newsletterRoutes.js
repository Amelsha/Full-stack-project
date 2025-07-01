const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const newsletter = new Newsletter({ email });
    await newsletter.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 