import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

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
      updateFilter('startYear', parseInt(customStart));
      updateFilter('endYear', parseInt(customEnd));
      setCustomStart('');
      setCustomEnd('');
    }
  };

  const predefinedRanges = [
    { label: 'Last 5 Years', start: new Date().getFullYear() - 5, end: new Date().getFullYear() },
    { label: '2020-2023', start: 2020, end: 2023 },
    { label: '2018-2022', start: 2018, end: 2022 },
    { label: 'All Years', start: null, end: null }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <FiCalendar className="mr-2 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Year Filter</h3>
        </div>
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {isExpanded && (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Year Range</label>
              <span className="text-sm text-gray-500">
                {filters.startYear || 'Any'} - {filters.endYear || 'Any'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Year</label>
                <select
                  value={filters.startYear || ''}
                  onChange={(e) => updateFilter('startYear', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  {yearOptions.map((year) => (
                    <option key={`start-${year.year}`} value={year.year}>
                      {year.year} ({year.count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">End Year</label>
                <select
                  value={filters.endYear || ''}
                  onChange={(e) => updateFilter('endYear', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  {yearOptions.map((year) => (
                    <option key={`end-${year.year}`} value={year.year}>
                      {year.year} ({year.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-600 mb-2">Quick Select</label>
              <div className="grid grid-cols-2 gap-2">
                {predefinedRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleYearRangeSelect(range.start, range.end)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      filters.startYear === range.start && filters.endYear === range.end
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-xs text-gray-600 mb-2">Custom Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  min="1900"
                  max="2100"
                />
                <span className="flex items-center">-</span>
                <input
                  type="number"
                  placeholder="End Year"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                  min="1900"
                  max="2100"
                />
                <button
                  onClick={handleCustomRange}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Selected:</span>{' '}
              {filters.startYear ? `${filters.startYear} to ${filters.endYear || 'Present'}` : 'All years'}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Showing data for the selected year range
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default YearFilter;