import React, { useState } from 'react';
import { FiGlobe, FiTrendingUp, FiBarChart2, FiFilter, FiDownload } from 'react-icons/fi';

const Sources = () => {
  const [selectedSource, setSelectedSource] = useState(null);

  const sourcesData = [
    {
      id: 1,
      name: 'Reuters',
      type: 'News Agency',
      credibility: 'High',
      articles: 1250,
      country: 'Global',
      categories: ['Politics', 'Economics', 'Business'],
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'World Bank',
      type: 'Research Institute',
      credibility: 'Very High',
      articles: 850,
      country: 'USA',
      categories: ['Economics', 'Development', 'Statistics'],
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      name: 'Bloomberg',
      type: 'Financial News',
      credibility: 'High',
      articles: 980,
      country: 'USA',
      categories: ['Finance', 'Markets', 'Technology'],
      lastUpdated: '2024-01-14'
    },
    {
      id: 4,
      name: 'BBC News',
      type: 'Broadcasting',
      credibility: 'High',
      articles: 1120,
      country: 'UK',
      categories: ['Politics', 'World News', 'Culture'],
      lastUpdated: '2024-01-13'
    },
    {
      id: 5,
      name: 'Forbes',
      type: 'Business Magazine',
      credibility: 'Medium',
      articles: 760,
      country: 'USA',
      categories: ['Business', 'Technology', 'Entrepreneurship'],
      lastUpdated: '2024-01-12'
    },
    {
      id: 6,
      name: 'The Economist',
      type: 'News Magazine',
      credibility: 'Very High',
      articles: 540,
      country: 'UK',
      categories: ['Economics', 'Politics', 'Business'],
      lastUpdated: '2024-01-11'
    },
    {
      id: 7,
      name: 'CNBC',
      type: 'Business News',
      credibility: 'Medium',
      articles: 890,
      country: 'USA',
      categories: ['Business', 'Markets', 'Technology'],
      lastUpdated: '2024-01-09'
    },
    {
      id: 8,
      name: 'Al Jazeera',
      type: 'News Network',
      credibility: 'Medium',
      articles: 670,
      country: 'Qatar',
      categories: ['Middle East', 'Politics', 'World News'],
      lastUpdated: '2024-01-08'
    }
  ];

  const credibilityColors = {
    'Very High': 'bg-green-100 text-green-800',
    'High': 'bg-blue-100 text-blue-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600">Manage and analyze data sources and their credibility</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
            <FiFilter className="mr-2" />
            Filter Sources
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Total Sources</h3>
            <FiGlobe className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{sourcesData.length}</p>
          <p className="text-sm text-gray-500 mt-2">Active data sources</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Total Articles</h3>
            <FiBarChart2 className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {sourcesData.reduce((sum, source) => sum + source.articles, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">Across all sources</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Avg. Credibility</h3>
            <FiTrendingUp className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">High</p>
          <p className="text-sm text-gray-500 mt-2">Weighted average</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Countries</h3>
            <FiGlobe className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">6</p>
          <p className="text-sm text-gray-500 mt-2">Source locations</p>
        </div>
      </div>

      {/* Sources Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">All Sources</h2>
          <p className="text-gray-600">Click on any source to view detailed analytics</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Source Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Credibility</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Articles</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Country</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Last Updated</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sourcesData.map((source) => (
                <tr 
                  key={source.id} 
                  className={`border-b hover:bg-gray-50 cursor-pointer ${
                    selectedSource === source.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedSource(source.id === selectedSource ? null : source.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="font-bold text-blue-600">
                          {source.name.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{source.name}</p>
                        <p className="text-sm text-gray-500">{source.categories.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {source.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${credibilityColors[source.credibility]}`}>
                      {source.credibility}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium">{source.articles.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">🌍</span>
                      {source.country}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{source.lastUpdated}</td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Source Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Source Distribution by Country</h3>
          <div className="space-y-4">
            {[
              { country: 'USA', count: 4, percentage: 50, color: 'bg-blue-500' },
              { country: 'UK', count: 2, percentage: 25, color: 'bg-red-500' },
              { country: 'Qatar', count: 1, percentage: 12.5, color: 'bg-green-500' },
              { country: 'Global', count: 1, percentage: 12.5, color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.country}</span>
                  <span className="text-gray-600">{item.count} sources ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Credibility Analysis</h3>
          <div className="space-y-3">
            {[
              { level: 'Very High', count: 2, description: 'Highly reliable sources' },
              { level: 'High', count: 3, description: 'Reliable with minor concerns' },
              { level: 'Medium', count: 3, description: 'Moderately reliable' },
              { level: 'Low', count: 0, description: 'Requires verification' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${credibilityColors[item.level]}`}>
                    {item.level}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <span className="text-xl font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;