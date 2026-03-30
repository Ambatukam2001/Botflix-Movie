import React, { useState } from 'react';

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

export default Navbar;
