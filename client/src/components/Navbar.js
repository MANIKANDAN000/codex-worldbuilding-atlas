import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">📜</span> Codex Atlas
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-welcome">Welcome, {user.name}!</span>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button onClick={logoutUser} className="nav-logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;