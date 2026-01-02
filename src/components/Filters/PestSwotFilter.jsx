import React, { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { FiTarget, FiTrendingUp, FiTrendingDown, FiAlertCircle, FiShield, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PestSwotFilter = () => {
  const { filters, updateFilter } = useFilters();
  const [activeTab, setActiveTab] = useState('pest'); // 'pest' or 'swot'
  const [isExpanded, setIsExpanded] = useState(true);

  const pestleOptions = [
    { value: 'Political', icon: '🏛️', color: 'bg-red-100 text-red-800 border border-red-200' },
    { value: 'Economic', icon: '💰', color: 'bg-green-100 text-green-800 border border-green-200' },
    { value: 'Social', icon: '👥', color: 'bg-blue-100 text-blue-800 border border-blue-200' },
    { value: 'Tech', icon: '💻', color: 'bg-purple-100 text-purple-800 border border-purple-200' },
    { value: 'Legal', icon: '⚖️', color: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
    { value: 'Envt', icon: '🌱', color: 'bg-teal-100 text-teal-800 border border-teal-200' }
  ];

  const swotOptions = [
    { 
      type: 'strength', 
      label: 'Strength', 
      icon: <FiTrendingUp className="text-green-600" />,
      color: 'bg-green-100 text-green-800 border border-green-200',
      description: 'Positive internal factors'
    },
    { 
      type: 'weakness', 
      label: 'Weakness', 
      icon: <FiTrendingDown className="text-red-600" />,
      color: 'bg-red-100 text-red-800 border border-red-200',
      description: 'Negative internal factors'
    },
    { 
      type: 'opportunity', 
      label: 'Opportunity', 
      icon: <FiTarget className="text-blue-600" />,
      color: 'bg-blue-100 text-blue-800 border border-blue-200',
      description: 'Positive external factors'
    },
    { 
      type: 'threat', 
      label: 'Threat', 
      icon: <FiAlertCircle className="text-orange-600" />,
      color: 'bg-orange-100 text-orange-800 border border-orange-200',
      description: 'Negative external factors'
    }
  ];

  const sourceOptions = [
    { label: 'News Article', icon: '📰' },
    { label: 'Research Paper', icon: '📄' },
    { label: 'Government Report', icon: '🏛️' },
    { label: 'Industry Analysis', icon: '📊' },
    { label: 'Academic Journal', icon: '🎓' },
    { label: 'Market Research', icon: '📈' },
    { label: 'Financial Report', icon: '💰' },
    { label: 'Social Media', icon: '💬' }
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
    <div className="w-full">
      {/* Header - always visible */}
      <div 
        className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FiShield className="mr-2 text-purple-500" />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">PEST & SWOT Analysis</h3>
            <p className="text-xs text-gray-500">
              {filters.pestle || filters.swot || filters.source 
                ? `${filters.pestle ? 'PEST: ' + filters.pestle : ''}${filters.swot ? ' SWOT: ' + filters.swot : ''}${filters.source ? ' Source: ' + filters.source : ''}`
                : 'Select analysis type'}
            </p>
          </div>
        </div>
        {isExpanded ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
          {/* Tabs - Responsive */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-1 mb-3">
              <button
                onClick={() => setActiveTab('pest')}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'pest'
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                PEST
              </button>
              <button
                onClick={() => setActiveTab('swot')}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'swot'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                SWOT
              </button>
              <button
                onClick={() => setActiveTab('source')}
                className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'source'
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                Source
              </button>
            </div>
            
            {/* Info Banner */}
            <div className={`p-2 rounded-lg text-xs ${activeTab === 'pest' ? 'bg-purple-50 text-purple-800 border border-purple-100' : activeTab === 'swot' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-blue-50 text-blue-800 border border-blue-100'}`}>
              {activeTab === 'pest' && 'Political, Economic, Social, and Technological factors'}
              {activeTab === 'swot' && 'Strengths, Weaknesses, Opportunities, and Threats'}
              {activeTab === 'source' && 'Filter by data source type and credibility'}
            </div>
          </div>

          {/* PEST Analysis Tab */}
          {activeTab === 'pest' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pestleOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePestleSelect(option.value)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all border min-h-[80px] ${
                      filters.pestle === option.value
                        ? 'ring-2 ring-purple-500 bg-purple-50'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className="text-xl mb-1">{option.icon}</span>
                    <span className="text-xs font-medium text-gray-800 text-center">{option.value}</span>
                    <div className={`text-xs px-2 py-0.5 rounded-full mt-1 ${option.color}`}>
                      PEST
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Selected PEST Display */}
              {filters.pestle && (
                <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-purple-800">Selected:</span>
                      <span className="ml-2 text-sm text-purple-700">{filters.pestle}</span>
                    </div>
                    <button
                      onClick={() => updateFilter('pestle', null)}
                      className="text-xs text-purple-600 hover:text-purple-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SWOT Analysis Tab */}
          {activeTab === 'swot' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {swotOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => handleSwotSelect(option.type)}
                    className={`flex items-start p-3 rounded-lg transition-all border text-left ${
                      filters.swot === option.type
                        ? 'ring-2 ring-green-500 bg-green-50'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {option.icon}
                    </div>
                    <div className="ml-2 flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-800">{option.label}</span>
                        {filters.swot === option.type && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                      <div className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${option.color}`}>
                        {option.type.toUpperCase()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Selected SWOT Display */}
              {filters.swot && (
                <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-800">Selected:</span>
                      <span className="ml-2 text-sm text-green-700 capitalize">{filters.swot}</span>
                    </div>
                    <button
                      onClick={() => updateFilter('swot', null)}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Source Filter Tab */}
          {activeTab === 'source' && (
            <div className="space-y-3">
              <div className="max-h-60 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sourceOptions.map((source) => (
                    <button
                      key={source.label}
                      onClick={() => handleSourceSelect(source.label)}
                      className={`flex items-center p-2 rounded-lg transition-all border ${
                        filters.source === source.label
                          ? 'bg-blue-100 border-blue-300'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        filters.source === source.label ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-xs mr-2">{source.icon}</span>
                      <span className="text-xs text-gray-700 text-left flex-1">{source.label}</span>
                      <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded-full">
                        Source
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selected Source Display */}
              {filters.source && (
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-blue-800">Selected:</span>
                      <span className="ml-2 text-sm text-blue-700">{filters.source}</span>
                    </div>
                    <button
                      onClick={() => updateFilter('source', null)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
              
              {/* Source Info */}
              <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <FiAlertCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-xs text-yellow-800">
                    Source credibility affects data reliability. Choose sources carefully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clear All Button */}
          {(filters.pestle || filters.swot || filters.source) && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={handleClearAll}
                className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Legend</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span className="text-gray-600">PEST: Macro factors</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-gray-600">SWOT: Strategic factors</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestSwotFilter;