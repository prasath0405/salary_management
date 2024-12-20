import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';
import CustomAlert from './CustomAlert';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setAlertMessage('Please enter username and password');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Set default axios header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      setAlertMessage('Login Successful!');
      setAlertType('success');
      setShowAlert(true);

      // Delay login to show alert
      setTimeout(() => {
        onLogin(true);
      }, 500);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Login failed');
      setAlertType('error');
      setShowAlert(true);
    }
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  // If showRegister is true, render Register component
  if (showRegister) {
    return (
      <Register 
        onRegister={onLogin} 
        switchToLogin={switchToLogin} 
      />
    );
  }

  return (
    <div className="login-container">
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
          duration={3000}
        />
      )}
      <form onSubmit={handleLoginSubmit} className="login-form">
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
        <p 
          style={{
            textAlign: 'center', 
            marginTop: '10px', 
            cursor: 'pointer'
          }} 
          onClick={switchToRegister}
        >
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}

export default Login;