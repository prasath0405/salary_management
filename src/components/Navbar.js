import React from 'react';
import '../styles/Navbar.css';

function Navbar({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <nav>
      <div>
        <h1>Salary Management</h1>
      </div>
      <div>
        <span className="welcome-text">Welcome,</span>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;