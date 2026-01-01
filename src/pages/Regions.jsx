import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BarChart from '../components/Common/Charts/BarChart';
import PieChart from '../components/Common/Charts/PieChart';
import { FiGlobe, FiMapPin, FiTrendingUp, FiUsers, FiFilter } from 'react-icons/fi';

const Regions = () => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('regions'); // 'regions', 'countries', 'cities'
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapView, setMapView] = useState('intensity'); // 'intensity', 'likelihood', 'relevance'

  useEffect(() => {
    fetchGeographicData();
  }, []);

  const fetchGeographicData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/data/filters');
      setRegions(response?.filters.regions || []);
      setCountries(response?.filters.countries || []);
      setCities(response?.filters.cities || []);
    } catch (error) {
      console.error('Error fetching geographic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRegionData = () => {
    return regions.map(region => ({
      region: region._id,
      count: region.count,
      intensity: Math.random() * 100 // This would come from your API
    }));
  };

  const getCountryData = () => {
    return countries.slice(0, 10).map(country => ({
      country: country._id,
      count: country.count,
      relevance: Math.random() * 100
    }));
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geographic Analysis</h1>
          <p className="text-gray-600">Explore data distribution across regions and countries</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['regions', 'countries', 'cities'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['intensity', 'likelihood', 'relevance'].map((view) => (
              <button
                key={view}
                onClick={() => setMapView(view)}
                className={`px-3 py-1 text-sm capitalize ${
                  mapView === view
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-100'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Regions</h3>
            <FiGlobe className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{regions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Geographic regions covered</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Countries</h3>
            <FiMapPin className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{countries.length}</p>
          <p className="text-sm text-gray-500 mt-2">Countries with data</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Cities</h3>
            <FiUsers className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{cities.length}</p>
          <p className="text-sm text-gray-500 mt-2">Cities recorded</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Coverage</h3>
            <FiTrendingUp className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">78%</p>
          <p className="text-sm text-gray-500 mt-2">Global coverage rate</p>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
            <p className="text-gray-600">Showing {mapView} distribution across regions</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100">
              <FiFilter />
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Download Map
            </button>
          </div>
        </div>
        
        {/* Simplified World Map */}
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
          {/* This would be replaced with an actual map library like Leaflet or Google Maps */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <p className="text-gray-600">Interactive Map Visualization</p>
              <p className="text-sm text-gray-500">Showing {mapView} data by region</p>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">Low</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Highest {mapView}</p>
            <p className="font-semibold text-blue-600">North America</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Fastest Growth</p>
            <p className="font-semibold text-green-600">Asia</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Most Data Points</p>
            <p className="font-semibold text-purple-600">Europe</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Emerging Region</p>
            <p className="font-semibold text-orange-600">Africa</p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regions Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Regions Analysis</h3>
          <BarChart
            data={getRegionData()}
            xKey="region"
            yKey="count"
            height={250}
            colors={['#3b82f6']}
          />
          
          <div className="mt-6 space-y-3">
            {regions.slice(0, 5).map(region => (
              <div
                key={region._id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedRegion(region._id)}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{getRegionIcon(region._id)}</span>
                  <div>
                    <p className="font-medium text-gray-800">{region._id}</p>
                    <p className="text-sm text-gray-500">{region.count} records</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  region.count > 500 ? 'bg-red-100 text-red-800' :
                  region.count > 200 ? 'bg-orange-100 text-orange-800' :
                  region.count > 100 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {region.count > 500 ? 'High' : region.count > 200 ? 'Medium' : 'Low'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countries Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
          <PieChart
            data={countries.slice(0, 6).map(country => ({
              name: country._id,
              value: country.count
            }))}
            height={250}
          />
          
          <div className="mt-6 space-y-3">
            {countries.slice(0, 5).map(country => (
              <div
                key={country._id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedCountry(country._id)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{country._id}</p>
                    <p className="text-sm text-gray-500">{country.count} records</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Detailed Geographic Data</h2>
          <p className="text-gray-600">Complete list of regions and countries with data metrics</p>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Records</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg Intensity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg Likelihood</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg Relevance</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {regions.slice(0, 8).map(region => (
                <React.Fragment key={`region-${region._id}`}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{getRegionIcon(region._id)}</span>
                        <span className="font-medium text-gray-800">{region._id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">Region</td>
                    <td className="py-3 px-4 text-sm font-medium">{region.count}</td>
                    <td className="py-3 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                    <td className="py-3 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                    <td className="py-3 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </td>
                  </tr>
                  
                  {/* Show 2 countries for this region */}
                  {countries
                    .filter(c => c._id.includes(region._id.substring(0, 3)))
                    .slice(0, 2)
                    .map(country => (
                      <tr key={`country-${country._id}`} className="hover:bg-gray-50">
                        <td className="py-2 px-4 pl-12">
                          <div className="flex items-center">
                            <FiMapPin className="text-gray-400 mr-3" />
                            <span className="text-sm text-gray-700">{country._id}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-600">Country</td>
                        <td className="py-2 px-4 text-sm">{country.count}</td>
                        <td className="py-2 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                        <td className="py-2 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                        <td className="py-2 px-4 text-sm">{(Math.random() * 100).toFixed(1)}</td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Sub-region
                          </span>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Regional Insights</h3>
          <div className="space-y-4">
            {[
              { 
                region: 'North America', 
                insight: 'Highest data intensity and likelihood scores',
                trend: '↗️ Growing'
              },
              { 
                region: 'Asia', 
                insight: 'Fastest growth in data collection',
                trend: '🚀 Rapid'
              },
              { 
                region: 'Europe', 
                insight: 'Most comprehensive data coverage',
                trend: '📊 Stable'
              },
              { 
                region: 'Africa', 
                insight: 'Emerging region with increasing relevance',
                trend: '🌱 Emerging'
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{item.region}</h4>
                  <span className="text-lg">{item.trend}</span>
                </div>
                <p className="text-sm text-gray-600">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Geographic Recommendations</h3>
          <div className="space-y-3">
            {[
              'Expand data collection in underrepresented regions',
              'Focus on emerging markets for future growth',
              'Improve data quality in high-intensity regions',
              'Consider regional partnerships for better coverage',
              'Monitor geographic trends for strategic planning'
            ].map((rec, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <p className="text-sm text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regions;