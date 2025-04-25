import React, { useState } from "react";
import "./ForgotPasswordPopup.css";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = () => {
    // Send OTP logic (backend integration)
    console.log("Sending OTP to:", email);
    setOtpSent(true);
  };

  const handleResetPassword = () => {
    // Reset password logic
    console.log("Verifying OTP:", otp);
    console.log("Setting new password:", newPassword);
    onClose(); // close popup after success
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={onClose}>✖</button>
        {!otpSent ? (
          <>
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="popup-btn" onClick={handleSendOtp}>Send OTP</button>
          </>
        ) : (
          <>
            <h3>Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="popup-btn" onClick={handleResetPassword}>Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
