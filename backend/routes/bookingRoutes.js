const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Booking = require("../models/Booking");

// POST /api/book-seats
router.post("/book-seats", async (req, res) => {
  const { movieTitle, theater, time, seats, userEmail } = req.body;

  try {
    // 1. Generate QR Code
    const qrText = `Movie: ${movieTitle}, Theater: ${theater}, Time: ${time}, Seats: ${seats.join(", ")}`;
    const qrCodeUrl = await QRCode.toDataURL(qrText);

    // 2. Save Booking
    const newBooking = new Booking({
      movieTitle,
      theater,
      time,
      seats,
      userEmail,
      qrCodeUrl,
    });
    await newBooking.save();

    // 3. Return QR code to frontend
    res.status(200).json({
      message: "Booking successful",
      qrCodeUrl,
    });
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

module.exports = router;
