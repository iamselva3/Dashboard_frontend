import React, { useState } from 'react';
import { FiSettings, FiSave, FiUser, FiBell, FiShield, FiDatabase, FiGlobe, FiRefreshCw } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Dashboard Settings
    defaultView: 'overview',
    refreshInterval: 30,
    showRecent: true,
    showStats: true,
    
    // Notification Settings
    emailNotifications: true,
    dataAlerts: true,
    systemUpdates: true,
    weeklyReports: true,
    
    // Data Settings
    autoRefresh: false,
    dataRetention: 365,
    exportFormat: 'csv',
    maxRecords: 1000,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    auditLogging: true
  });

  const handleInputChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = () => {
    // In a real app, you would make an API call here
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings({
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        defaultView: 'overview',
        refreshInterval: 30,
        showRecent: true,
        showStats: true,
        emailNotifications: true,
        dataAlerts: true,
        systemUpdates: true,
        weeklyReports: true,
        autoRefresh: false,
        dataRetention: 365,
        exportFormat: 'csv',
        maxRecords: 1000,
        twoFactorAuth: false,
        sessionTimeout: 30,
        ipWhitelist: '',
        auditLogging: true
      });
      alert('Settings reset to defaults!');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <FiSettings /> },
    { id: 'dashboard', label: 'Dashboard', icon: <FiGlobe /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'data', label: 'Data', icon: <FiDatabase /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'profile', label: 'Profile', icon: <FiUser /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your dashboard preferences and system settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={resetSettings}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Reset to Defaults
          </button>
          
          <button
            onClick={saveSettings}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FiSave className="mr-2" />
            Save Settings
          </button>
        </div>
      </div>

      {/* Settings Container */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange('general', 'theme', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CET">Central European Time (CET)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                  <select
                    value={settings.defaultView}
                    onChange={(e) => handleInputChange('dashboard', 'defaultView', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="overview">Overview</option>
                    <option value="analytics">Analytics</option>
                    <option value="detailed">Detailed View</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-refresh Interval: {settings.refreshInterval} seconds
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={settings.refreshInterval}
                    onChange={(e) => handleInputChange('dashboard', 'refreshInterval', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10s</span>
                    <span>5m</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showRecent"
                      checked={settings.showRecent}
                      onChange={(e) => handleInputChange('dashboard', 'showRecent', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="showRecent" className="ml-2 text-sm text-gray-700">
                      Show Recent Activity Panel
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showStats"
                      checked={settings.showStats}
                      onChange={(e) => handleInputChange('dashboard', 'showStats', e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="showStats" className="ml-2 text-sm text-gray-700">
                      Show Statistics Cards
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Data Alerts</h4>
                      <p className="text-sm text-gray-600">Alert when data thresholds are reached</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.dataAlerts}
                        onChange={(e) => handleInputChange('notifications', 'dataAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">System Updates</h4>
                      <p className="text-sm text-gray-600">Notifications about system maintenance and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.systemUpdates}
                        onChange={(e) => handleInputChange('notifications', 'systemUpdates', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                      <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.weeklyReports}
                        onChange={(e) => handleInputChange('notifications', 'weeklyReports', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Data Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period</label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => handleInputChange('data', 'dataRetention', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Export Format</label>
                  <select
                    value={settings.exportFormat}
                    onChange={(e) => handleInputChange('data', 'exportFormat', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="excel">Excel</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Records per Query: {settings.maxRecords.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={settings.maxRecords}
                    onChange={(e) => handleInputChange('data', 'maxRecords', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>100</span>
                    <span>10,000</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={settings.autoRefresh}
                    onChange={(e) => handleInputChange('data', 'autoRefresh', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="autoRefresh" className="ml-2 text-sm text-gray-700">
                    Enable Auto-refresh for Real-time Data
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {settings.twoFactorAuth && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        ✓ Two-factor authentication is enabled. Use your authenticator app to verify logins.
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout: {settings.sessionTimeout} minutes
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5min</span>
                    <span>2hrs</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (Optional)</label>
                  <textarea
                    value={settings.ipWhitelist}
                    onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value)}
                    placeholder="Enter IP addresses separated by commas"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                    rows="3"
                  />
                  <p className="text-sm text-gray-500 mt-1">Leave empty to allow access from any IP address</p>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auditLogging"
                    checked={settings.auditLogging}
                    onChange={(e) => handleInputChange('security', 'auditLogging', e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="auditLogging" className="ml-2 text-sm text-gray-700">
                    Enable Audit Logging (Track all user activities)
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-600 text-3xl" />
                    </div>
                    <div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Upload New Photo
                      </button>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF, max 5MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      defaultValue="Data Analyst"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      defaultValue="Analytics"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    defaultValue="Data analyst with 5+ years of experience in data visualization and business intelligence. Specialized in creating interactive dashboards for data-driven decision making."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Dashboard Version</p>
            <p className="font-medium">v2.1.0</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="font-medium">January 15, 2024</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Support Contact</p>
            <p className="font-medium">support@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;