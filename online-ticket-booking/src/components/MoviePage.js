import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MoviePage.css";

const movies = [
  { title: "The Batman", language: "English", rating: "9.3/10", votes: "94.7K", image: "batman.jpg", age: "UA16+" },
  { title: "Solo Leveling", language: "Korean,English", rating: "8.8/10", votes: "42.8K", image: "sl.jpg", age: "UA13+" },
  { title: "Jaabilamma Neeku Antha Kopama", language: "Telugu", likes: "2.3K", image: "2.jpg", age: "UA13+" },
  { title: "Laila", language: "Telugu", rating: "6.8/10", votes: "2.1K", image: "animal.jpg", age: "A" },
  { title: "Captain America: Brave New World", language: "Telugu, Hindi", rating: "7/10", votes: "8.1K", image: "ssmb29.jpg", age: "UA16+" },
  { title: "Return of the Dragon", language: "Telugu", likes: "1.4K", image: "3.jpg", age: "UA16+" },
  { title: "Sankranthiki Vasthanum", language: "Telugu", rating: "8.9/10", votes: "96.2K", image: "leo.jpg", age: "UA13+" },
  { title: "Brahma Anandam", language: "Telugu", rating: "8.1/10", votes: "1.2K", image: "3.jpg", age: "UA16+" }
];

const categories = ["All", "Telugu", "Hindi", "Tamil", "English", "Malayalam", "Korean"];

const MoviePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredMovies = selectedCategory === "All"
    ? movies
    : movies.filter(movie => movie.language.includes(selectedCategory));

  return (
    <div className="movie-container">
      {/* Filters Sidebar */}
      <aside className="filters">
        <h3>Filters</h3>
        <div className="filter-section">
          <h4>Categories</h4>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </aside>

      {/* Movie Listings */}
      <main className="movie-list">
        <h2>Movies in Hyderabad</h2>
        
        {filteredMovies.length > 0 ? (
          <div className="movie-grid">
            {filteredMovies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <img src={`./images/${movie.image}`} alt={movie.title} />
                <div className="movie-details">
                  <h3>{movie.title}</h3>
                  <p className="language">Language: {movie.language}</p>
                  {movie.rating && <p className="rating">⭐ {movie.rating} ({movie.votes} votes)</p>}
                  {movie.likes && <p className="likes">❤️ {movie.likes} Likes</p>}
                  <p className="age-rating">Age: {movie.age}</p>
                </div>
                <button 
                  className="book-btn" 
                  onClick={() => navigate("/showtimes", { state: { movieTitle: movie.title } })}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-movies">No movies available in this category.</p>
        )}
      </main>
    </div>
  );
};

export default MoviePage;
