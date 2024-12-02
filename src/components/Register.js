import React, { useState } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import '../styles/Login.css';

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setAlertMessage('Please fill in all fields');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });

      localStorage.setItem('token', response.data.token);

      setAlertMessage('Registration Successful!');
      setAlertType('success');
      setShowAlert(true);

      setTimeout(() => {
        onRegister(true);
      }, 500);
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Registration failed');
      setAlertType('error');
      setShowAlert(true);
    }
  };

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
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <button type="submit" className="login-button">Register</button>
        <p 
          style={{textAlign: 'center', marginTop: '10px', cursor: 'pointer'}} 
          onClick={switchToLogin}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

export default Register;