const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event added!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add event' });
  }
});

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
