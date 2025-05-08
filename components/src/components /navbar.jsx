import React, { useState, useEffect } from 'react';
import './navbar.css';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [results, setResults] = useState([]);

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
  console.log(debouncedTerm);

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
    </div>
  );
};

export default Navbar;
