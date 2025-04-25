const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json({ message: 'Movie added!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add movie' });
  }
});

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

module.exports = router;
