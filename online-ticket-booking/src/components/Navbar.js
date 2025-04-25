import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch, FaCity, FaFilm, FaCalendarAlt,
  FaFootballBall, FaPhone, FaHome, FaInfoCircle,
  FaUserPlus, FaSignInAlt, FaSignOutAlt, FaUserShield
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user info exists in localStorage
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  const isAdmin = user && /^\d{4}$/.test(user.username); // Admins have 4-digit usernames

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🎥 <span>TicketZone</span></Link>
      </div>

      {/* City Dropdown */}
      <div className="city-select">
        <FaCity className="icon" />
        <select>
          <option>Hyderabad</option>
          <option>Bangalore</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Chennai</option>
        </select>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input type="text" placeholder="Search movies or events..." />
        <FaSearch className="search-icon" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/"><FaHome className="nav-icon" /> Home</Link></li>
        {!isAdmin && <li><Link to="/movies"><FaFilm className="nav-icon" /> Movies</Link></li>}
        {!isAdmin && <li><Link to="/eventpage"><FaCalendarAlt className="nav-icon" /> Events</Link></li>}
        {!isAdmin && <li><Link to="/sports"><FaFootballBall className="nav-icon" /> Sports</Link></li>}
        {!isAdmin && <li><Link to="/contact"><FaPhone className="nav-icon" /> Contact</Link></li>}
        {!isAdmin && <li><Link to="/aboutus"><FaInfoCircle className="nav-icon" /> About Us</Link></li>}
        {isAdmin && <li><Link to="/admin"><FaUserShield className="nav-icon" /> Admin Panel</Link></li>}
      </ul>

      {/* Auth Area */}
      <div className="auth-buttons">
        {user ? (
          <>
            <span className="admin-username">👤 {user.username}</span>
            <button className="signout-btn" onClick={handleSignOut}>
              <FaSignOutAlt className="auth-icon" /> Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="register-btn">
              <FaUserPlus className="auth-icon" /> Register
            </Link>
            <Link to="/signin" className="signin-btn">
              <FaSignInAlt className="auth-icon" /> Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
