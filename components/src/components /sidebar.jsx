import React from 'react';
import './sidebar.css';
import {
  MdHome,
  MdReport,
  MdLocationOn,
  MdConnectWithoutContact,
  MdDashboard,
  MdSettings,
  MdContactPhone,
  MdPerson,
} from 'react-icons/md';

const Sidebar = () => {
  const handleReportSOSClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.dispatchEvent(new CustomEvent('openSOS'));
  };

  return (
    <div className="sidebar">
      <nav className="menu">
        <a href="#" className="menu-item"><MdHome className="icon" /> Home</a>
        <a
            href="#"
            className="menu-item"
            onClick={() => window.dispatchEvent(new Event('openSOS'))}>
            <MdReport className="icon" /> Report SOS
        </a>

        <a href="#" className="menu-item"><MdLocationOn className="icon" /> Nearby Alerts</a>
        <a href="#" className="menu-item"><MdConnectWithoutContact className="icon" /> Authority Connect</a>
        <a href="#" className="menu-item"><MdDashboard className="icon" /> Dashboard</a>
      </nav>

      <div className="menu bottom">
        <a href="#" className="menu-item"><MdSettings className="icon" /> Settings</a>
        <a href="#" className="menu-item"><MdContactPhone className="icon" /> Emergency Contacts</a>
        <a href="#" className="menu-item"><MdPerson className="icon" /> Profile</a>
      </div>
    </div>
  );
};

export default Sidebar;
