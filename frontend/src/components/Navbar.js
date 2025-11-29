// ============================================
// FILE: frontend/src/components/Navbar.js
// Navigation bar with login/signup buttons
// ============================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <BookOpen size={32} />
            <span className="logo-text">SkillSwap</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/teachers" className="nav-link">Teachers</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>

          {/* Auth Buttons */}
          <div className="navbar-auth desktop-auth">
            {user ? (
              <div className="user-menu">
                <Link to="/dashboard" className="user-btn">
                  <User size={20} />
                  <span>{user.username}</span>
                </Link>
                <button className="btn btn-outline-nav" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-nav">Login</Link>
                <Link to="/signup" className="btn btn-primary-nav">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
            <Link to="/courses" className="mobile-link" onClick={toggleMenu}>Courses</Link>
            <Link to="/teachers" className="mobile-link" onClick={toggleMenu}>Teachers</Link>
            <Link to="/about" className="mobile-link" onClick={toggleMenu}>About</Link>
            
            <div className="mobile-auth">
              {user ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary-nav" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                  <button className="btn btn-outline-nav" onClick={() => { handleLogout(); toggleMenu(); }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-nav" onClick={toggleMenu}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary-nav" onClick={toggleMenu}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;