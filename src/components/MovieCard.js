import React from 'react';

const MovieCard = ({ movie }) => (
  <div className="movie-card">
    <div className="poster-wrapper">
      <img
        className="movie-poster"
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
        alt={movie.Title}
      />
      <div className="card-overlay">
        <div className="badge-plus"><i className="fa-solid fa-plus"></i></div>
      </div>
    </div>
    <div className="card-info">
      <h3 className="card-title">{movie.Title}</h3>
      <div className="card-meta">
        <div className="card-rating"><i className="fa-solid fa-star"></i> {movie.imdbRating || 'N/A'}</div>
        <span>{movie.Year}</span>
      </div>
    </div>
  </div>
);

export default MovieCard;
