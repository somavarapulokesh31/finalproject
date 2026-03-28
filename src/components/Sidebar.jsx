import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Settings, Activity } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'My Issues', path: '/my-issues', icon: <CheckSquare size={20} /> },
    { name: 'Activity', path: '/activity', icon: <Activity size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Activity size={28} />
        <span>SyncTrack</span>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
