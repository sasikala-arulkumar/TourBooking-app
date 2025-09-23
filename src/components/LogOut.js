// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogOut.css'; // Optional styling

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();              // Call parent to update state
    navigate('/login');      // Redirect to login
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;
