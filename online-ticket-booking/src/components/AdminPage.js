import React from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleAddMovie = () => {
    navigate("/admin/add-movie");
  };

  const handleAddEvent = () => {
    navigate("/admin/add-event");
  };

  return (
    <div className="admin-container">
      <h1>Welcome, Admin 👑</h1>
      <div className="admin-buttons">
        <button onClick={handleAddMovie} className="admin-btn">🎬 Add Movie</button>
        <button onClick={handleAddEvent} className="admin-btn">🎉 Add Event</button>
      </div>
    </div>
  );
};

export default AdminPage;
