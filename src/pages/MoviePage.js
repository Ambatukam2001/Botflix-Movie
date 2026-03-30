import React from 'react';

const MoviePage = ({ movies, loading, error, categoryTitle }) => {
  return (
    <main className="content-section" style={{paddingTop: '6rem'}}>
      <div className="section-header">
        <h2 className="section-title">{categoryTitle}</h2>
      </div>
      {loading ? (
        <div style={{textAlign:'center', padding:'5rem'}}><div className="loading-circle"></div><p>Fetching {categoryTitle}...</p></div>
      ) : error ? (
        <div style={{textAlign:'center', padding:'5rem', color: 'var(--primary)'}}><p>{error}</p></div>
      ) : (
        <div className="movie-grid">
          {movies.map(m => (
            <div key={m.imdbID} className="movie-card">
              <div className="poster-wrapper">
                <img className="movie-poster" src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450"} alt={m.Title} />
                <div className="card-overlay"><div className="badge-plus"><i className="fa-solid fa-plus"></i></div></div>
              </div>
              <div className="card-info">
                <h3 className="card-title">{m.Title}</h3>
                <div className="card-meta">
                  <div className="rating"><i className="fa-solid fa-star"></i> {m.imdbRating || 'N/A'}</div>
                  <span>{m.Year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MoviePage;
