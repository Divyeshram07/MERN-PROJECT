import React, { useState } from "react";
import axios from "axios";
import "./AddMovie.css";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    location: "",
    price: "",
    theatre: "",
    shows: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(movie).forEach((key) => {
      formData.append(key, movie[key]);
    });

    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/movies/add-movie", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie added successfully!");
    } catch (err) {
      alert("Failed to add movie");
      console.error(err);
    }
  };

  return (
    <div className="add-movie-form">
      <h2>Add Movie 🎬</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="theatre" placeholder="Theatre Name" onChange={handleChange} required />
        <input type="text" name="shows" placeholder="Shows (e.g., 10:00 AM,1:00 PM)" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">ADD MOVIE</button>
      </form>
    </div>
  );
};

export default AddMovie;
