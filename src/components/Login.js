import React, { useState } from 'react';
import CustomAlert from './CustomAlert';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (username && password) {
      // Show success alert
      setShowAlert(true);
      
      // Immediately log in after showing alert
      // Alert will automatically disappear after 3 seconds
      setTimeout(() => {
        onLogin(true);
      }, 500); // Small delay to ensure alert is visible
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="login-container">
      {/* Custom Alert Component */}
      {showAlert && (
        <CustomAlert 
          message="Login Successful!" 
          type="success" 
          onClose={() => setShowAlert(false)}
          duration={3000} 
        />
      )}
      
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Salary Management</h2>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;