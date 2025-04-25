const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number,
  location: String,
  image: String,
});

module.exports = mongoose.model('Event', EventSchema);
