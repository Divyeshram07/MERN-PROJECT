import React, { useState } from 'react';
import axios from 'axios';
import './AddEvent.css';

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    price: '',
    location: '',
    image: '',
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', event);
      alert('Event added successfully!');
      setEvent({ name: '', date: '', price: '', location: '', image: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to add event');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add Event 🎉</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={event.name} onChange={handleChange} required />
        <input type="date" name="date" value={event.date} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={event.location} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={event.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={event.image} onChange={handleChange} required />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
