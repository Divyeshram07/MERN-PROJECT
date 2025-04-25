const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  location: String,
  price: Number,
  image: String,
  theatre: String,
  shows: String,
});

module.exports = mongoose.model("Movie", movieSchema);
