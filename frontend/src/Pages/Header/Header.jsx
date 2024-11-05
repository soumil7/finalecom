import React, { useState } from "react";
import "./Header.css"; // Link to your standard CSS
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../assets/assets";
import LoginPopup from "../../Components/LoginPopup/LoginPopup";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to toggle login popup

  const [token, setToken] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Mock login/logout functions
    const handleLogin = () => setIsLoggedIn(true); 
    const handleLogout = () => setIsLoggedIn(false);  

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src="../Assets/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Search Box */}
        <div className="search-container">
          <input
            type="search"
            placeholder="Search for products"
            className="search-input"
          />
          <div className="search-button">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart"><img src={assets.bag_icon} alt="" /></Link>
            </li>
            <li className="nav-item">
              <Link to="/bookmark">Bookmark</Link>
            </li>
            <li className="nav-item">
              <Link to="/profiles">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="user-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </li>
            <li className="sign">
              <div className="navbar-right">
                {!isLoggedIn ? (
                  <button onClick={() => setShowLoginPopup(true)}>Sign In</button>
                ) : (
                  <div className="navbar-profile">
                    <img onClick={handleLogout} src={assets.logout_icon} alt="Profile" />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>

        {/* Mobile Sidebar Toggle */}
        <div className="mobile-sidebar-toggle">
          <button onClick={toggleSidebar} className="menu-toggle-btn">
            <svg
              className="menu-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {isSidebarOpen && (
            <div className="sidebar">
              <button onClick={toggleSidebar} className="close-sidebar-btn">
                &times;
              </button>
              <ul className="sidebar-items">
                <li className="sidebar-link">
                  <Link to="/profiles">Profiles</Link>
                </li>
                <li className="sidebar-link">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="sidebar-link">
                  <Link to="/bookmark">Bookmark</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Categories */}
      <div className="categories-bar">
        <ul className="categories-list">
          <li className="category-link">
            <Link to="/">Kitchen appliances</Link>
          </li>
          <li className="category-link">
            <Link to="/pooja">Pooja products</Link>
          </li>
          <li className="category-link">
            <Link to="/home">Home Decorations</Link>
          </li>
          <li className="category-link">
            <Link to="/fashion">Fashion Wears</Link>
          </li>
        </ul>
      </div>
      {showLoginPopup && (
        <LoginPopup setShowLogin={setShowLoginPopup} onLoginSuccess={handleLogin} />
      )}
    </header>
  );
};

export default Header;
