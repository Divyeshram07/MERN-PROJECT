import React from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./PaymentSucess.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const { seats = [], movie, theater, time } = location.state || {};

  const ticketInfo = {
    movie,
    theater,
    time,
    seats,
  };

  const qrData = JSON.stringify(ticketInfo);

  return (
    <div className="payment-success-container">
      <h1>🎉 Booking Confirmed!</h1>
      <p><strong>Movie:</strong> {movie}</p>
      <p><strong>Theater:</strong> {theater}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Seats:</strong> {seats.join(", ")}</p>
      <div className="qr-code-container">
        <QRCodeCanvas value={qrData} size={200} />
      </div>
    </div>
  );
};

export default PaymentSuccess;
