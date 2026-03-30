import React from 'react';

const Hero = ({ movie, onWatch }) => {
  const bg = movie && movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=2000';
  const handleWatch = () => {
    const title = movie ? movie.Title : 'The Batman';
    alert(`🎬 Starting playback for: ${title}\n(This is a demo button)`);
  };

  return (
    <section className="hero" style={{ 
      backgroundImage: `linear-gradient(90deg, #080808 30%, transparent 100%), url(${bg})` 
    }}>
      <div className="hero-content">
        <span className="hero-tag">{movie ? 'TOP MATCH' : 'FEATURED MOVIE'}</span>
        <h2 className="hero-title">{movie ? movie.Title : 'The Batman'}</h2>
        <div className="hero-meta">
          <span className="rating"><i className="fa-solid fa-star"></i> {movie ? movie.imdbRating : '8.5'}</span>
          <span style={{color: 'var(--text-muted)'}}>{movie ? movie.Genre : 'Action • Crime • Drama'} • {movie ? movie.Year : '2022'}</span>
        </div>
        <p className="hero-desc">{movie ? movie.Plot : 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.'}</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={handleWatch}>Watch Now</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
