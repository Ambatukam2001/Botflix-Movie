import React from 'react';

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

export default Sidebar;
