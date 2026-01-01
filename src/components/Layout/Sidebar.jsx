import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiBarChart2,
  FiFilter,
  FiGlobe,
  FiTag,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiMap,
  FiTrendingUp
} from 'react-icons/fi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Dashboard' },
    { path: '/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { path: '/topics', icon: <FiTag />, label: 'Topics' },
    { path: '/regions', icon: <FiGlobe />, label: 'Regions' },
    { path: '/filters', icon: <FiFilter />, label: 'Filters' },
    { path: '/sources', icon: <FiUsers />, label: 'Sources' },
    { path: '/maps', icon: <FiMap />, label: 'Geographic' },
    { path: '/trends', icon: <FiTrendingUp />, label: 'Trends' },
    { path: '/settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <aside className={`bg-gray-900 text-white h-full flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <h1 className="text-xl font-bold">Blackcoffer</h1>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Scrollable navigation */}
      <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar-dark">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer section - fixed at bottom of sidebar */}
      <div className="p-4 border-t border-gray-800">
        {!collapsed && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Data Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Records</span>
                <span className="font-semibold">10,240</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;