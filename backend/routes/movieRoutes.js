const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Movie = require("../models/Movie");

// Set up storage for images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// POST route to add movie
router.post("/add-movie", upload.single("image"), async (req, res) => {
  try {
    const { title, genre, location, price, theatre, shows } = req.body;
    const image = req.file ? req.file.filename : null;

    const newMovie = new Movie({
      title,
      genre,
      location,
      price,
      theatre,
      shows,
      image,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully" });
  } catch (err) {
    console.error("Error adding movie:", err);
    res.status(500).json({ message: "Failed to add movie" });
  }
});

module.exports = router;
