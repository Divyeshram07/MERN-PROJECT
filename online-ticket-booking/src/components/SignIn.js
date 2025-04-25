import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      const { token, role } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Redirect based on role
      if (role === "admin") {
        navigate("/adminpage"); // Redirect to admin page
      } else if (role === "user") {
        navigate("/"); // Redirect to home page
      } else {
        setErrorMessage("Unauthorized access. Invalid role.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/salaar.mp4" type="video/mp4" />
      </video>
      <div className="signin-box">
        <h2>Welcome Back!</h2>
        <p>Sign in to continue</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;