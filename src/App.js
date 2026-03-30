import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

// Import Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";

const API_KEY = "9c65b6a6";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Batman");
  const [view, setView] = useState("Home"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchMovies = useCallback(async (searchQuery, category) => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");
    try {
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`;
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
    setIsSidebarOpen(false);
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
            <div className="plans-grid">
              <div className="plan-card">
                <div className="plan-name">GOLD</div>
                <div className="plan-price">$9.99<span>/mo</span></div>
                <button className="btn-outline">Join Gold</button>
              </div>
              <div className="plan-card featured">
                <div className="plan-name">PLATINUM</div>
                <div className="plan-price">$29.99<span>/yr</span></div>
                <button className="btn-outline">Join Platinum</button>
              </div>
              <div className="plan-card">
                <div className="plan-name">DIAMOND</div>
                <div className="plan-price">$19.99<span>/yr</span></div>
                <button className="btn-outline">Join Diamond</button>
              </div>
            </div>
          </section>
        )}

        <footer className="footer">
          <div className="filmbox-logo" style={{fontSize: '1.2rem', marginBottom: '1.5rem'}}>Bot<span>Flix</span></div>
          <p>© 2026 BotFlix Entertainment | Premium Cinematic Experience</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
