import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMoviesWithDetails = async () => {
      if (!query) return;

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${"9c65b6a6"}&s=${query}`
        );
        const data = await response.json();

        data.Response === "True"
          ? setMovies(
              await Promise.all(
                data.Search.map(async (movie) => {
                  const detailsResponse = await fetch(
                    `https://www.omdbapi.com/?apikey=${"9c65b6a6"}&i=${
                      movie.imdbID
                    }`
                  );
                  const details = await detailsResponse.json();
                  return { ...movie, ...details };
                })
              )
            ) || setError("")
          : setMovies([]) || setError(data.Error);
      } catch (err) {
        setError("Something went wrong!");
        setMovies([]);
      }
    };

    fetchMoviesWithDetails();
  }, [query]);

  const handleSearch = () => {
    setQuery(searchMovie.trim());
  };

  return (
    <div>
      <div className="navbar">
        <h1>Botflix Movie</h1>
        <div className="search">
          <input
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            type="text"
            placeholder="Search for a movie..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="app">
        {error ? <p className="error">{error}</p> : null}
        <div className="movies">
          {movies.length > 0
            ? movies.map((movie) => (
                <div className="movie" key={movie.imdbID}>
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150"
                    }
                    alt={movie.Title}
                  />
                  <div className="movie-info">
                    <h3>{movie.Title}</h3>
                    <p>
                      <strong>Year:</strong> {movie.Year}
                    </p>
                    <p>
                      <strong>Plot:</strong> {movie.Plot}
                    </p>
                    <p>
                      <strong>Director:</strong> {movie.Director}
                    </p>
                    <p>
                      <strong>Actors:</strong> {movie.Actors}
                    </p>
                    {movie.imdbRating && (
                      <p>
                        <strong>Rating:</strong> {movie.imdbRating}
                      </p>
                    )}
                  </div>
                </div>
              ))
            : !error && <p>Try searching for your favorite movie!</p>}
        </div>

        <div className="Footer">
          <p>
            © 2024 Botflix Movies | Watching Great Moments | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
