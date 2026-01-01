import React, { useState } from 'react';
import {
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiUser,
  FiMenu,
  FiSettings,
  FiDownload
} from 'react-icons/fi';
import { useFilters } from '../../context/FilterContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { clearFilters } = useFilters();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'New data added for 2023', time: '5 min ago' },
    { id: 2, text: 'System update completed', time: '1 hour ago' },
    { id: 3, text: 'Export ready for download', time: '2 hours ago' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
              <FiMenu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
              Data Visualization Dashboard
            </h2>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search data, topics, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 hidden md:inline-flex items-center"
            >
              <FiSettings className="mr-2" />
              Reset Filters
            </button>

            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hidden md:inline-flex items-center">
              <FiDownload className="mr-2" />
              Export
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm">{notification.text}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t">
                    <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm py-2">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <FiHelpCircle size={20} />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-4 py-2 text-sm rounded hover:bg-gray-100">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm rounded hover:bg-gray-100">
                      Dashboard Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm rounded hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter summary bar */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Country: USA
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Year: 2022-2023
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
              Topic: Technology
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;