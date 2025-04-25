const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movieTitle: String,
  theater: String,
  time: String,
  seats: [Number],
  userEmail: String,
  qrCodeUrl: String,
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
