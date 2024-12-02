import React from 'react';
import '../styles/Navbar.css';

function Navbar({ onLogout }) {
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;