import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiCalendar, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

const YearFilter = () => {
  const { filters, updateFilter } = useFilters();
  const [yearOptions, setYearOptions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  useEffect(() => {
    fetchYearOptions();
  }, []);

  const fetchYearOptions = async () => {
    try {
      const response = await api.get('/data/filters');
      const years = response.filters.years
        .filter(y => y._id && y._id !== '')
        .map(y => ({ year: y._id, count: y.count }))
        .sort((a, b) => b.year - a.year);
      setYearOptions(years);
    } catch (error) {
      console.error('Error fetching year options:', error);
    }
  };

  const handleYearRangeSelect = (start, end) => {
    updateFilter('startYear', start);
    updateFilter('endYear', end);
  };

  const handleCustomRange = () => {
    if (customStart && customEnd) {
      const start = parseInt(customStart);
      const end = parseInt(customEnd);
      if (start <= end) {
        updateFilter('startYear', start);
        updateFilter('endYear', end);
        setCustomStart('');
        setCustomEnd('');
      }
    }
  };

  const predefinedRanges = [
    { label: 'Last 5 Years', start: new Date().getFullYear() - 5, end: new Date().getFullYear() },
    { label: '2020-2023', start: 2020, end: 2023 },
    { label: '2018-2022', start: 2018, end: 2022 },
    { label: 'All Years', start: null, end: null }
  ];

  // Clear custom inputs when filters change
  useEffect(() => {
    if (filters.startYear && filters.endYear) {
      const start = parseInt(filters.startYear);
      const end = parseInt(filters.endYear);
      
      // Check if it's a custom range not in predefined ranges
      const isCustomRange = !predefinedRanges.some(range => 
        range.start === start && range.end === end
      );
      
      if (isCustomRange) {
        setCustomStart(start.toString());
        setCustomEnd(end.toString());
      }
    }
  }, [filters.startYear, filters.endYear]);

  const clearFilters = () => {
    updateFilter('startYear', null);
    updateFilter('endYear', null);
    setCustomStart('');
    setCustomEnd('');
  };

  return (
    <div className="w-full">
      {/* Header - always visible */}
      <div 
        className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FiCalendar className="mr-2 text-blue-500" />
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Year Range</h3>
            <p className="text-xs text-gray-500">
              {filters.startYear && filters.endYear 
                ? `${filters.startYear} - ${filters.endYear}`
                : filters.startYear 
                  ? `${filters.startYear} - Present`
                  : 'All Years'}
            </p>
          </div>
        </div>
        {isExpanded ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
          {/* Year Select Dropdowns */}
          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Start Year
                </label>
                <div className="relative">
                  <select
                    value={filters.startYear || ''}
                    onChange={(e) => updateFilter('startYear', e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">Any Year</option>
                    {yearOptions.map((year) => (
                      <option key={`start-${year.year}`} value={year.year}>
                        {year.year} ({year.count})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FiChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  End Year
                </label>
                <div className="relative">
                  <select
                    value={filters.endYear || ''}
                    onChange={(e) => updateFilter('endYear', e.target.value || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">Any Year</option>
                    {yearOptions.map((year) => (
                      <option key={`end-${year.year}`} value={year.year}>
                        {year.year} ({year.count})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <FiChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Quick Select
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {predefinedRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleYearRangeSelect(range.start, range.end)}
                  className={`px-2 py-2 text-xs rounded-lg transition-colors ${
                    filters.startYear === range.start && filters.endYear === range.end
                      ? 'bg-blue-600 text-white border border-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Range - FIXED LAYOUT */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Custom Range
            </label>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Start Year"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1900"
                    max="2100"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="End Year"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1900"
                    max="2100"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCustomRange}
                  disabled={!customStart || !customEnd}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiCheck className="text-sm" />
                  Apply Custom Range
                </button>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Selected Range Display */}
          {(filters.startYear || filters.endYear) && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">
                    Selected Range:
                  </p>
                  <p className="text-sm text-blue-700">
                    {filters.startYear ? `${filters.startYear}` : 'Any Start'} 
                    {' → '}
                    {filters.endYear ? `${filters.endYear}` : 'Any End'}
                  </p>
                </div>
                {filters.startYear && filters.endYear && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    Active
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YearFilter;