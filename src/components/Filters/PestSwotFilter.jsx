import React, { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { FiTarget, FiTrendingUp, FiTrendingDown, FiAlertCircle, FiShield } from 'react-icons/fi';

const PestSwotFilter = () => {
  const { filters, updateFilter } = useFilters();
  const [activeTab, setActiveTab] = useState('pest'); // 'pest' or 'swot'

  const pestleOptions = [
    { value: 'Political', icon: '🏛️', color: 'bg-red-100 text-red-800' },
    { value: 'Economic', icon: '💰', color: 'bg-green-100 text-green-800' },
    { value: 'Social', icon: '👥', color: 'bg-blue-100 text-blue-800' },
    { value: 'Technological', icon: '💻', color: 'bg-purple-100 text-purple-800' },
    { value: 'Legal', icon: '⚖️', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Environmental', icon: '🌱', color: 'bg-teal-100 text-teal-800' }
  ];

  const swotOptions = [
    { 
      type: 'strength', 
      label: 'Strength', 
      icon: <FiTrendingUp className="text-green-600" />,
      color: 'bg-green-100 text-green-800',
      description: 'Positive internal factors'
    },
    { 
      type: 'weakness', 
      label: 'Weakness', 
      icon: <FiTrendingDown className="text-red-600" />,
      color: 'bg-red-100 text-red-800',
      description: 'Negative internal factors'
    },
    { 
      type: 'opportunity', 
      label: 'Opportunity', 
      icon: <FiTarget className="text-blue-600" />,
      color: 'bg-blue-100 text-blue-800',
      description: 'Positive external factors'
    },
    { 
      type: 'threat', 
      label: 'Threat', 
      icon: <FiAlertCircle className="text-orange-600" />,
      color: 'bg-orange-100 text-orange-800',
      description: 'Negative external factors'
    }
  ];

  const sourceOptions = [
    'News Article', 'Research Paper', 'Government Report', 'Industry Analysis',
    'Academic Journal', 'Market Research', 'Financial Report', 'Social Media'
  ];

  const handlePestleSelect = (pestle) => {
    updateFilter('pestle', filters.pestle === pestle ? null : pestle);
  };

  const handleSwotSelect = (swotType) => {
    updateFilter('swot', filters.swot === swotType ? null : swotType);
  };

  const handleSourceSelect = (source) => {
    updateFilter('source', filters.source === source ? null : source);
  };

  const handleClearAll = () => {
    updateFilter('pestle', null);
    updateFilter('swot', null);
    updateFilter('source', null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FiShield className="mr-2 text-purple-500" />
          <h3 className="font-semibold text-gray-800">PEST & SWOT Analysis</h3>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear All
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('pest')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'pest'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          PEST Analysis
        </button>
        <button
          onClick={() => setActiveTab('swot')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'swot'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          SWOT Analysis
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'source'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Source Filter
        </button>
      </div>

      {/* PEST Analysis Tab */}
      {activeTab === 'pest' && (
        <div>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              Political, Economic, Social, and Technological factors affecting the data
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pestleOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handlePestleSelect(option.value)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  filters.pestle === option.value
                    ? 'ring-2 ring-purple-500 bg-purple-50'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{option.icon}</span>
                  <span className="font-medium text-gray-800">{option.value}</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full inline-block ${option.color}`}>
                  PEST Factor
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SWOT Analysis Tab */}
      {activeTab === 'swot' && (
        <div>
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              Strengths, Weaknesses, Opportunities, and Threats analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {swotOptions.map((option) => (
              <div
                key={option.type}
                onClick={() => handleSwotSelect(option.type)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  filters.swot === option.type
                    ? 'ring-2 ring-green-500 bg-green-50'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {option.icon}
                    <span className="ml-2 font-semibold text-gray-800">{option.label}</span>
                  </div>
                  {filters.swot === option.type && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className={`text-xs px-3 py-1 rounded-full ${option.color}`}>
                  {option.type.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 text-sm mb-1">SWOT Matrix</h4>
            <p className="text-xs text-gray-600">
              Internal vs External factors affecting data analysis
            </p>
          </div>
        </div>
      )}

      {/* Source Filter Tab */}
      {activeTab === 'source' && (
        <div>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Filter data by source type and credibility
            </p>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {sourceOptions.map((source) => (
              <div
                key={source}
                onClick={() => handleSourceSelect(source)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  filters.source === source
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    filters.source === source ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-700">{source}</span>
                </div>
                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                  Source
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                Source credibility affects data reliability. Choose sources carefully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Filters Summary */}
      {(filters.pestle || filters.swot || filters.source) && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.pestle && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                🏛️ {filters.pestle}
              </span>
            )}
            {filters.swot && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {filters.swot === 'strength' && '💪 Strength'}
                {filters.swot === 'weakness' && '📉 Weakness'}
                {filters.swot === 'opportunity' && '🎯 Opportunity'}
                {filters.swot === 'threat' && '⚠️ Threat'}
              </span>
            )}
            {filters.source && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                📰 {filters.source}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis Types</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
            <span>PEST: Macro-environmental</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span>SWOT: Strategic analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestSwotFilter;