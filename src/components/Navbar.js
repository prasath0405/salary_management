import React from 'react';
import '../styles/Navbar.css';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Salary Management</div>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </nav>
  );
}

export default Navbar;