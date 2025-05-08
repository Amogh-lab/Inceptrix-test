import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { MdSearch, MdMessage } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debouncedTerm}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Logged out');
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-title">SOS Sentinel</div>
      <div className="navbar-search">
        <MdSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="navbar-icons">
        <MdMessage className="message-icon" onClick={() => navigate('/messages')} />
        <div className="profile-container" ref={dropdownRef}>
          <FaUserCircle className="profile-icon" onClick={handleProfileClick} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">User Info</div>
              <div className="dropdown-item">Accounts and Privacy</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item cancel" onClick={() => setDropdownOpen(false)}>
                Cancel
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;