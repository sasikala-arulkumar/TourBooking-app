import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import Logout from './LogOut';
import './Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Track menu state

  useEffect(() => {
  const updateUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUsername(user.name);
    } else {
      setUsername('');
    }
  };

  updateUser(); // Run immediately on mount

  // Listen for storage changes
  window.addEventListener('storage', updateUser);

  return () => {
    window.removeEventListener('storage', updateUser);
  };
}, []);


  const handleLogoutState = () => {
    setUsername('');
    setMenuOpen(false); // Close menu on logout
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Tour Booking</Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className={`menu-toggle ${menuOpen ? 'open' : ''}`} // 👈 Add open class
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu Links */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/tours" onClick={() => setMenuOpen(false)}>Tours</Link></li>
        <li><Link to="/mybookings" onClick={() => setMenuOpen(false)}>My Bookings</Link></li>

        {!username ? (
          <>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          </>
        ) : (
          <>
            <li className="welcome-text">
              Welcome, <strong>{username}</strong>
            </li>
            <li>
              <Logout onLogout={handleLogoutState} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
