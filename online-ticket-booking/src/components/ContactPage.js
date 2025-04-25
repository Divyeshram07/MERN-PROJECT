import React, { useState } from "react";
import axios from "axios";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaLinkedin
} from "react-icons/fa";
import "./ContactPage.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">We'd love to hear from you! Reach out to us.</p>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Name</label>
          </div>
          <div className="input-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Email</label>
          </div>
          <div className="input-group">
            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
            <label>Message</label>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
          {status && <p className="status-message">{status}</p>}
        </form>

        {/* contact-info unchanged */}
      </div>
    </div>
  );
};

export default Contact;
