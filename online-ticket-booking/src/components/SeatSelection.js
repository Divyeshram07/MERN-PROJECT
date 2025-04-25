import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedShow } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [showSeatPopup, setShowSeatPopup] = useState(true);
  const ticketPrice = 250;

  // Generate random booked seats
  const generateRandomBookedSeats = useCallback(() => {
    const totalSeats = 50;
    const bookedCount = Math.floor(Math.random() * 10) + 5;
    const randomSeats = new Set();

    while (randomSeats.size < bookedCount) {
      randomSeats.add(Math.floor(Math.random() * totalSeats));
    }

    setBookedSeats([...randomSeats]);
  }, []);

  useEffect(() => {
    generateRandomBookedSeats();
  }, [generateRandomBookedSeats]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setChosenSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else if (prev.length < selectedSeats) {
        return [...prev, seatNumber];
      }
      return prev;
    });
  };

  const handleConfirmSeats = async () => {
    if (chosenSeats.length === selectedSeats) {
      const userEmail = localStorage.getItem("userEmail");

      if (!selectedShow) {
        alert("Show info missing. Please go back and try again.");
        return;
      }

      const bookingData = {
        movieTitle: selectedShow.movie,
        theater: selectedShow.theater,
        time: selectedShow.time,
        seats: chosenSeats,
        userEmail,
      };

      console.log("Booking data:", bookingData);

      try {
        const response = await fetch("http://localhost:5000/api/book-seats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Booking successful, navigating to payment-success");
          navigate("/payment-success", {
            state: {
              qrCodeUrl: data.qrCodeUrl || "", // fallback if not returned
              seats: chosenSeats,
              ...selectedShow,
            },
          });
        } else {
          alert("Booking failed: " + (data.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Booking error:", err);
        alert("Something went wrong during booking.");
      }
    } else {
      alert(`Please select ${selectedSeats} seat(s).`);
    }
  };

  return (
    <div className="seat-selection-container">
      {showSeatPopup ? (
        <div className="seat-popup">
          <h2>Select Number of Seats</h2>
          <input
            type="number"
            min="1"
            max="10"
            value={selectedSeats}
            onChange={(e) =>
              setSelectedSeats(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))
            }
          />
          <button onClick={() => setShowSeatPopup(false)}>Proceed</button>
        </div>
      ) : (
        <>
          {selectedShow ? (
            <>
              <h2>
                {selectedShow.movie} - {selectedShow.theater} ({selectedShow.time})
              </h2>
              <div className="screen">SCREEN</div>

              <div className="seat-container">
                {[...Array(5)].map((_, row) => (
                  <div className="row" key={row}>
                    {[...Array(10)].map((_, col) => {
                      const seatNum = row * 10 + col;
                      return (
                        <div
                          key={seatNum}
                          className={`seat 
                            ${bookedSeats.includes(seatNum) ? "booked" : ""}
                            ${chosenSeats.includes(seatNum) ? "selected" : ""}`}
                          onClick={() => handleSeatClick(seatNum)}
                        >
                          {seatNum + 1}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="pay-now-container">
                <p className="total-cost">
                  Total: ₹{chosenSeats.length * ticketPrice}
                </p>
                <button className="pay-now-button" onClick={handleConfirmSeats}>
                  Pay Now
                </button>
              </div>
            </>
          ) : (
            <p className="error-message">
              No show selected. Please go back and select a show.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SeatSelection;
