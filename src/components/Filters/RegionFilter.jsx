import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiGlobe, FiMapPin, FiChevronRight } from 'react-icons/fi';

const RegionFilter = () => {
  const { filters, updateFilter } = useFilters();
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('region'); // 'region', 'country', 'city'
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (selectedRegion && activeTab === 'country') {
      fetchCountriesForRegion();
    }
  }, [selectedRegion, activeTab]);

  useEffect(() => {
    if (selectedCountry && activeTab === 'city') {
      fetchCitiesForCountry();
    }
  }, [selectedCountry, activeTab]);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/data/filters');
      setRegions(response.filters.regions || []);
      setCountries(response.filters.countries || []);
      setCities(response.filters.cities || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountriesForRegion = async () => {
    // In a real app, you'd make an API call here
    // For now, we'll filter from the existing countries
    const regionCountries = countries.filter(c => 
      c._id && filters.region === selectedRegion
    );
    setCountries(regionCountries);
  };

  const fetchCitiesForCountry = async () => {
    // In a real app, you'd make an API call here
    const countryCities = cities.filter(c => 
      c._id && filters.country === selectedCountry
    );
    setCities(countryCities);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    updateFilter('region', region);
    setActiveTab('country');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    updateFilter('country', country);
    setActiveTab('city');
  };

  const handleCitySelect = (city) => {
    updateFilter('city', city);
  };

  const handleReset = () => {
    setSelectedRegion(null);
    setSelectedCountry(null);
    updateFilter('region', null);
    updateFilter('country', null);
    updateFilter('city', null);
    setActiveTab('region');
  };

  const getRegionIcon = (region) => {
    const icons = {
      'Asia': '🌏',
      'Europe': '🇪🇺',
      'North America': '🇺🇸',
      'South America': '🇧🇷',
      'Africa': '🌍',
      'Oceania': '🇦🇺',
      'Middle East': '🌅'
    };
    return icons[region] || '📍';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <FiGlobe className="mr-2 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Geographic Filter</h3>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FiGlobe className="mr-2 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Geographic Filter</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('region')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'region'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Region
        </button>
        <button
          onClick={() => selectedRegion && setActiveTab('country')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'country'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : selectedRegion
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          disabled={!selectedRegion}
        >
          Country
        </button>
        <button
          onClick={() => selectedCountry && setActiveTab('city')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'city'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : selectedCountry
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          disabled={!selectedCountry}
        >
          City
        </button>
      </div>

      {/* Region Selection */}
      {activeTab === 'region' && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <div className="p-3 bg-blue-50 rounded-lg mb-2">
            <p className="text-sm text-blue-800">
              Select a region to filter by geographic area
            </p>
          </div>
          {regions.map((region) => (
            <div
              key={region._id}
              onClick={() => handleRegionSelect(region._id)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                selectedRegion === region._id
                  ? 'bg-blue-100 border border-blue-300'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{getRegionIcon(region._id)}</span>
                <div>
                  <p className="font-medium text-gray-800">{region._id}</p>
                  <p className="text-sm text-gray-500">{region.count} records</p>
                </div>
              </div>
              <FiChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      )}

      {/* Country Selection */}
      {activeTab === 'country' && selectedRegion && (
        <div>
          <div className="flex items-center mb-4 p-2 bg-gray-50 rounded-lg">
            <button
              onClick={() => setActiveTab('region')}
              className="text-sm text-gray-600 hover:text-gray-800 mr-2"
            >
              ← Back
            </button>
            <span className="text-sm text-gray-700">Region: {selectedRegion}</span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country._id}
                onClick={() => handleCountrySelect(country._id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  selectedCountry === country._id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <FiMapPin className="mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">{country._id}</p>
                    <p className="text-sm text-gray-500">{country.count} records</p>
                  </div>
                </div>
                <FiChevronRight className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* City Selection */}
      {activeTab === 'city' && selectedCountry && (
        <div>
          <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
            <button
              onClick={() => setActiveTab('country')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Countries
            </button>
            <span className="text-sm text-gray-700">Country: {selectedCountry}</span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cities.slice(0, 20).map((city) => (
              <div
                key={city._id}
                onClick={() => handleCitySelect(city._id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  filters.city === city._id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-800">{city._id}</p>
                    <p className="text-sm text-gray-500">{city.count} records</p>
                  </div>
                </div>
                {filters.city === city._id && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Filters Summary */}
      {(selectedRegion || selectedCountry || filters.city) && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Location</h4>
          <div className="flex flex-wrap gap-2">
            {selectedRegion && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                🌍 {selectedRegion}
              </span>
            )}
            {selectedCountry && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                🇺🇸 {selectedCountry}
              </span>
            )}
            {filters.city && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full flex items-center">
                🏙️ {filters.city}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionFilter;