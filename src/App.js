import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const API_KEY = "9c65b6a6";

const Sidebar = ({ isOpen, onClose, onFilter }) => (
  <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
    <div className="sidebar-logo" onClick={() => onFilter("Batman")} style={{cursor: 'pointer'}}>◆</div>
    <div className="nav-icons">
      <div className="nav-icon active" onClick={() => { onFilter("Batman"); onClose(); }}><i className="fa-solid fa-house"></i></div>
      <div className="nav-icon" onClick={() => { onFilter("movie"); onClose(); }}><i className="fa-solid fa-clapperboard"></i></div>
      <div className="nav-icon" onClick={() => { onFilter("series"); onClose(); }}><i className="fa-solid fa-user"></i></div>
      <div className="nav-icon" onClick={() => { onFilter("show"); onClose(); }}><i className="fa-solid fa-message"></i></div>
      <div className="nav-icon"><i className="fa-solid fa-heart"></i></div>
      <div className="nav-icon"><i className="fa-solid fa-folder-open"></i></div>
    </div>
  </aside>
);

const Navbar = ({ searchTerm, setSearchTerm, onSearch, onToggleSidebar, onFilter }) => {
  const [mobileSearch, setMobileSearch] = useState(false);
  
  return (
    <header className="top-nav">
      <div className="nav-left">
        <div className="hamburger" onClick={onToggleSidebar}><i className="fa-solid fa-bars-staggered"></i></div>
        <div className="nav-links">
          <span style={{cursor: 'pointer'}} onClick={() => onFilter("movie")}>Movies</span>
          <span style={{cursor: 'pointer'}} onClick={() => onFilter("series")}>Series</span>
          <span style={{cursor: 'pointer'}} onClick={() => onFilter("show")}>TV Shows</span>
        </div>
      </div>
      
      <div className="filmbox-logo" onClick={() => onFilter("Batman")} style={{cursor: 'pointer'}}>Bot<span>Flix</span></div>
      
      <div className="nav-right">
        <div className={`search-container ${mobileSearch ? 'active' : ''}`}>
          <form onSubmit={(e) => { onSearch(e); setMobileSearch(false); }} className="search-box">
            <input 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search movies..."
              onBlur={() => setTimeout(() => setMobileSearch(false), 200)}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={() => setMobileSearch(!mobileSearch)}></i>
          </form>
        </div>
        <div className="avatar" style={{width: '36px', height: '36px', background: 'linear-gradient(45deg, #222, #444)'}}></div>
      </div>
    </header>
  );
};

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

const Hero = ({ movie }) => {
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

const Pricing = () => (
  <section className="pricing-section">
    <h2 className="pricing-title">Choose your plan</h2>
    <p className="pricing-subtitle">Watch all you want. Recommendations just for you. Change or cancel your plan anytime.</p>
    <div className="plans-grid">
      <div className="plan-card">
        <div className="plan-name">Gold Plan</div>
        <div className="plan-price">$9.99<span>/month</span></div>
        <ul className="feature-list">
          <li>No Ads</li>
          <li>Team watching up to 10 members</li>
          <li>720p Resolution</li>
          <li>50 Downloading</li>
        </ul>
        <button className="btn-outline">Get Trial Period</button>
      </div>
      <div className="plan-card featured">
        <div className="plan-name">Platinum Plan</div>
        <div className="plan-price">$29.99<span>/year</span></div>
        <ul className="feature-list">
          <li>Unlimited movies</li>
          <li>No Ads</li>
          <li>Team watching up to 55 members</li>
          <li>4K+HDR Resolution</li>
          <li>300 Downloading</li>
        </ul>
        <button className="btn-outline">Get Trial Period</button>
      </div>
      <div className="plan-card">
        <div className="plan-name">Diamond Plan</div>
        <div className="plan-price">$19.99<span>/year</span></div>
        <ul className="feature-list">
          <li>Unlimited movies</li>
          <li>Team watching up to 20 members</li>
          <li>1080p Resolution</li>
          <li>100 Downloading</li>
        </ul>
        <button className="btn-outline">Get Trial Period</button>
      </div>
    </div>
  </section>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Batman");
  const [view, setView] = useState("Home"); // Home, movie, series, show
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Optimized Fetcher
  const fetchMovies = useCallback(async (searchQuery, category) => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");
    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`;
      
      // Category Specific Overwrite
      if (category === "movie") url += "&type=movie&y=2024";
      if (category === "series") url += "&type=series";
      if (category === "show") url += "&type=series&s=comedy";

      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        const detailedRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${data.Search[0].imdbID}`);
        const detailedData = await detailedRes.json();
        setFeaturedMovie(detailedData);
      } else {
        setMovies([]);
        setFeaturedMovie(null);
        setError(data.Error);
      }
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === "Home") fetchMovies("Batman");
    else fetchMovies(view, view);
  }, [view, fetchMovies]);

  useEffect(() => {
    if (query !== "Batman" && query) fetchMovies(query);
  }, [query, fetchMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setView("Search Results");
      setQuery(searchTerm.trim());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFilter = (filterType) => {
    setView(filterType);
    setSearchTerm("");
    setIsSidebarOpen(false); // Close sidebar on mobile follow-through
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === "Home") {
      return (
        <React.Fragment>
          <Hero movie={featuredMovie} />
          <main className="content-section">
            <div className="section-header">
              <h2 className="section-title">Trending Now</h2>
            </div>
            {loading ? (
              <div style={{textAlign:'center', padding:'5rem'}}><div className="loading-circle"></div><p>Syncing library...</p></div>
            ) : error ? (
              <div style={{textAlign:'center', padding:'5rem', color: 'var(--primary)'}}><p>{error}</p></div>
            ) : (
              <div className="movie-grid">{movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}</div>
            )}
          </main>
        </React.Fragment>
      );
    }

    return (
      <main className="content-section" style={{paddingTop: '6rem'}}>
        <div className="section-header">
          <h2 className="section-title">{view.toUpperCase()} Highlights</h2>
        </div>
        {loading ? (
          <div style={{textAlign:'center', padding:'5rem'}}><div className="loading-circle"></div><p>Loading {view}...</p></div>
        ) : error ? (
          <div style={{textAlign:'center', padding:'5rem', color: 'var(--primary)'}}><p>{error}</p></div>
        ) : (
          <div className="movie-grid">{movies.map(m => <MovieCard key={m.imdbID} movie={m} />)}</div>
        )}
      </main>
    );
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onFilter={(type) => { 
          if (type === "Batman") setView("Home"); 
          else handleFilter(type); 
        }}
      />
      <div className="main-wrapper">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSearch={handleSearch} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onFilter={(type) => { 
            if (type === "Batman") setView("Home"); 
            else handleFilter(type); 
          }}
        />
        
        {renderContent()}

        {view === "Home" && (
          <section className="pricing-section">
            <h2 className="pricing-title">Explore Premium</h2>
            {/* Same pricing code here... */}
          </section>
        )}

        <main className="content-section">
          <div className="section-header">
            <h2 className="section-title">Recommendations</h2>
          </div>

          {loading ? (
            <div className="status-msg">
              <div className="loading-circle"></div>
              <p>Fetching movies...</p>
            </div>
          ) : error ? (
            <div className="status-msg"><p style={{color: 'var(--primary)'}}>{error}</p></div>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </main>

        <Pricing />

        <footer className="footer">
          <div className="filmbox-logo" style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Bot<span>Flix</span></div>
          <p>© 2026 BotFlix Entertainment | Premium Cinematic Experience</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
