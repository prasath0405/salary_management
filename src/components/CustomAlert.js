import React, { useEffect } from 'react';
import '../styles/CustomAlert.css';

function CustomAlert({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) {
  useEffect(() => {
    // Auto-dismiss the alert after specified duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`custom-alert ${type}`}>
      <div className="alert-content">
        <span className="alert-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✖'}
          {type === 'warning' && '⚠'}
        </span>
        <span className="alert-message">{message}</span>
        <button 
          className="alert-close" 
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;