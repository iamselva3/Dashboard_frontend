import React, { useState } from 'react';
import { useFilters } from '../context/FilterContext';
import YearFilter from '../components/Filters/YearFilter';
import TopicFilter from '../components/Filters/TopicFilter';
import RegionFilter from '../components/Filters/RegionFilter';
import PestSwotFilter from '../components/Filters/PestSwotFilter';
import FilterCard from '../components/Common/Cards/FilterCard';
import { 
  FiFilter, 
  FiSave, 
  FiShare2, 
  FiDownload, 
  FiX,
  FiCheck,
  FiSliders
} from 'react-icons/fi';

const Filters = () => {
  const { filters, updateFilter, clearFilters } = useFilters();
  const [savedFilters, setSavedFilters] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [activePreset, setActivePreset] = useState(null);

  const filterPresets = [
    {
      id: 1,
      name: 'Technology Focus',
      description: 'Focus on technology-related data',
      filters: {
        topics: ['Technology', 'Innovation', 'Digital'],
        sectors: ['Technology', 'Information'],
        startYear: 2020
      }
    },
    {
      id: 2,
      name: 'High Impact',
      description: 'High intensity and likelihood data',
      filters: {
        intensity: { min: 70 },
        likelihood: { min: 80 }
      }
    },
    {
      id: 3,
      name: 'Recent Data',
      description: 'Most recent data points',
      filters: {
        startYear: 2022,
        endYear: 2023
      }
    },
    {
      id: 4,
      name: 'Global View',
      description: 'Comprehensive global data',
      filters: {
        regions: ['Asia', 'Europe', 'North America', 'South America', 'Africa']
      }
    }
  ];

  const handleSaveFilter = () => {
    if (!filterName.trim()) return;

    const newFilter = {
      id: Date.now(),
      name: filterName,
      filters: { ...filters },
      createdAt: new Date().toISOString()
    };

    setSavedFilters([...savedFilters, newFilter]);
    setFilterName('');
  };

  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    Object.entries(preset.filters).forEach(([key, value]) => {
      updateFilter(key, value);
    });
  };

  const handleDeleteSavedFilter = (id) => {
    setSavedFilters(savedFilters.filter(filter => filter.id !== id));
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(v => 
      v !== null && v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Filter Management</h1>
          <p className="text-gray-600">Create, manage, and apply data filters</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <FiFilter className="mr-2" />
            <span>{getActiveFilterCount()} active filters</span>
          </div>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Clear All
          </button>
          
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" />
            Export Filters
          </button>
        </div>
      </div>

      {/* Filter Presets */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Quick Filter Presets</h2>
          <p className="text-gray-600">Apply pre-configured filter combinations</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterPresets.map(preset => (
              <div
                key={preset.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activePreset === preset.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => handleApplyPreset(preset)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{preset.name}</h3>
                  {activePreset === preset.id && (
                    <FiCheck className="text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(preset.filters).map(key => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Filters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FilterCard title="Year Filter" isActive={!!filters.startYear || !!filters.endYear}>
            <YearFilter />
          </FilterCard>
          
          <FilterCard title="Topic Filter" isActive={filters.topics?.length > 0}>
            <TopicFilter />
          </FilterCard>
        </div>
        
        <div className="space-y-6">
          <FilterCard title="Geographic Filter" isActive={!!filters.region || !!filters.country || !!filters.city}>
            <RegionFilter />
          </FilterCard>
          
          <FilterCard title="PEST & SWOT Analysis" isActive={!!filters.pestle || !!filters.swot || !!filters.source}>
            <PestSwotFilter />
          </FilterCard>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Additional Filters</h2>
          <p className="text-gray-600">Advanced filtering options</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sector Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
            <select
              value={filters.sector || ''}
              onChange={(e) => updateFilter('sector', e.target.value || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Energy">Energy</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
          </div>
          
          {/* Intensity Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensity Range: {filters.intensityMin || 0} - {filters.intensityMax || 100}
            </label>
            <div className="flex space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.intensityMin || 0}
                onChange={(e) => updateFilter('intensityMin', parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.intensityMax || 100}
                onChange={(e) => updateFilter('intensityMax', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Likelihood Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Likelihood Range: {filters.likelihoodMin || 0} - {filters.likelihoodMax || 100}
            </label>
            <div className="flex space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.likelihoodMin || 0}
                onChange={(e) => updateFilter('likelihoodMin', parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.likelihoodMax || 100}
                onChange={(e) => updateFilter('likelihoodMax', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Relevance Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relevance Range: {filters.relevanceMin || 0} - {filters.relevanceMax || 100}
            </label>
            <div className="flex space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.relevanceMin || 0}
                onChange={(e) => updateFilter('relevanceMin', parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.relevanceMax || 100}
                onChange={(e) => updateFilter('relevanceMax', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Filter Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Save Current Filter</h3>
            <p className="text-gray-600">Save your filter configuration for future use</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Enter filter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveFilter}
              disabled={!filterName.trim()}
              className={`px-4 py-2 rounded-lg flex items-center ${
                filterName.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiSave className="mr-2" />
              Save Filter
            </button>
          </div>
        </div>
        
        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-4">Saved Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedFilters.map(savedFilter => (
                <div
                  key={savedFilter.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium text-gray-800">{savedFilter.name}</h5>
                      <p className="text-xs text-gray-500">
                        {new Date(savedFilter.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSavedFilter(savedFilter.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {Object.entries(savedFilter.filters).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {key}: {Array.isArray(value) ? value.length : value?.toString()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        Object.entries(savedFilter.filters).forEach(([key, value]) => {
                          updateFilter(key, value);
                        });
                      }}
                      className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                    >
                      Apply
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Current Filter Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FiSliders className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Current Filter Configuration</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(filters).map(([key, value]) => {
              if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
                return null;
              }
              
              return (
                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button
                      onClick={() => updateFilter(key, Array.isArray(value) ? [] : null)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {Array.isArray(value) 
                      ? value.join(', ')
                      : typeof value === 'object'
                      ? JSON.stringify(value)
                      : value.toString()
                    }
                  </p>
                </div>
              );
            })}
          </div>
          
          {getActiveFilterCount() === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎛️</div>
              <p className="text-gray-500">No filters currently applied</p>
              <p className="text-sm text-gray-400 mt-1">
                Apply filters using the options above to see the configuration here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Export Configuration</h4>
          <p className="text-sm text-blue-600 mb-4">
            Export your current filter configuration to share with team members
          </p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export as JSON
          </button>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Reset to Default</h4>
          <p className="text-sm text-green-600 mb-4">
            Clear all filters and return to default view
          </p>
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Reset All Filters
          </button>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">Share Filters</h4>
          <p className="text-sm text-purple-600 mb-4">
            Generate a shareable link with current filter configuration
          </p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center">
            <FiShare2 className="mr-2" />
            Generate Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
