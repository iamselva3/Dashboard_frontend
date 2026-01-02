import React, { useState } from 'react';
import { FiMapPin, FiFilter, FiDownload, FiGlobe, FiBarChart2, FiTarget } from 'react-icons/fi';

const Maps = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [mapType, setMapType] = useState('intensity');

  const regions = [
    { id: 'global', name: 'Global View', icon: '🌍', dataPoints: 10240 },
    { id: 'north_america', name: 'North America', icon: '🇺🇸', dataPoints: 3250 },
    { id: 'europe', name: 'Europe', icon: '🇪🇺', dataPoints: 2850 },
    { id: 'asia', name: 'Asia', icon: '🌏', dataPoints: 2150 },
    { id: 'africa', name: 'Africa', icon: '🌍', dataPoints: 980 },
    { id: 'south_america', name: 'South America', icon: '🇧🇷', dataPoints: 760 },
    { id: 'oceania', name: 'Oceania', icon: '🇦🇺', dataPoints: 250 }
  ];

  const mapTypes = [
    { id: 'intensity', name: 'Intensity', color: 'from-red-400 to-red-600' },
    { id: 'likelihood', name: 'Likelihood', color: 'from-green-400 to-green-600' },
    { id: 'relevance', name: 'Relevance', color: 'from-blue-400 to-blue-600' },
    { id: 'density', name: 'Data Density', color: 'from-purple-400 to-purple-600' }
  ];

  const countryData = [
    { country: 'United States', intensity: 85, likelihood: 78, relevance: 72, dataPoints: 1850 },
    { country: 'United Kingdom', intensity: 72, likelihood: 82, relevance: 68, dataPoints: 1250 },
    { country: 'Germany', intensity: 68, likelihood: 75, relevance: 71, dataPoints: 980 },
    { country: 'China', intensity: 79, likelihood: 65, relevance: 81, dataPoints: 1650 },
    { country: 'India', intensity: 74, likelihood: 71, relevance: 69, dataPoints: 1420 },
    { country: 'Japan', intensity: 70, likelihood: 77, relevance: 74, dataPoints: 890 },
    { country: 'Brazil', intensity: 62, likelihood: 68, relevance: 65, dataPoints: 760 },
    { country: 'Australia', intensity: 65, likelihood: 72, relevance: 70, dataPoints: 520 }
  ];

  const getCurrentRegion = () => regions.find(r => r.id === selectedRegion);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geographic Analysis</h1>
          <p className="text-gray-600">Interactive maps and geographic data visualization</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
            <FiFilter className="mr-2" />
            Filter Map
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" />
            Export Map
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Visualization */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Interactive Map</h3>
                <p className="text-gray-600">Showing {getCurrentRegion().name}</p>
              </div>
              
              <div className="flex space-x-2">
                {mapTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setMapType(type.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      mapType === type.id 
                        ? `bg-gradient-to-r ${type.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border border-gray-300">
              {/* World Map SVG Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-xl font-semibold text-gray-700">Interactive Map Visualization</p>
                  <p className="text-gray-600 mt-2">
                    Showing {getCurrentRegion().name} • {mapType.charAt(0).toUpperCase() + mapType.slice(1)} Heatmap
                  </p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow">
                <div className="flex items-center space-x-2">
                  <FiMapPin className="text-blue-500" />
                  <span className="text-sm font-medium">Zoom: 100%</span>
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold mb-2">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span className="text-sm">High {mapType}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                    <span className="text-sm">Medium {mapType}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm">Low {mapType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Region Selector */}
          <div className="lg:w-1/3">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Region</h3>
              <div className="space-y-2">
                {regions.map(region => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`w-full p-3 rounded-lg flex items-center justify-between transition-colors ${
                      selectedRegion === region.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{region.icon}</span>
                      <div className="text-left">
                        <p className="font-medium">{region.name}</p>
                        <p className="text-sm text-gray-500">{region.dataPoints.toLocaleString()} data points</p>
                      </div>
                    </div>
                    {selectedRegion === region.id && (
                      <FiTarget className="text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Stats */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Region Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Data Points</span>
                  <span className="font-bold">{getCurrentRegion().dataPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Avg. Intensity</span>
                  <span className="font-bold">72.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Avg. Likelihood</span>
                  <span className="font-bold">68.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Countries Covered</span>
                  <span className="font-bold">
                    {selectedRegion === 'global' ? '195' : 
                     selectedRegion === 'north_america' ? '23' :
                     selectedRegion === 'europe' ? '44' : '15+'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Data Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Country-Level Analysis</h2>
          <p className="text-gray-600">Detailed metrics for top countries in selected region</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Country</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Intensity</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Likelihood</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Relevance</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Data Points</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{
                        country.country === 'United States' ? '🇺🇸' :
                        country.country === 'United Kingdom' ? '🇬🇧' :
                        country.country === 'Germany' ? '🇩🇪' :
                        country.country === 'China' ? '🇨🇳' :
                        country.country === 'India' ? '🇮🇳' :
                        country.country === 'Japan' ? '🇯🇵' :
                        country.country === 'Brazil' ? '🇧🇷' :
                        '🇦🇺'
                      }</span>
                      <span className="font-medium">{country.country}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${country.intensity}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{country.intensity}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${country.likelihood}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{country.likelihood}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${country.relevance}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{country.relevance}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">{country.dataPoints.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      country.intensity > 75 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {country.intensity > 75 ? '↑ Growing' : '→ Stable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Geographic Insights</h3>
          <div className="space-y-4">
            {[
              { insight: 'North America shows highest intensity scores', region: 'North America', impact: 'High' },
              { insight: 'European data shows consistent likelihood patterns', region: 'Europe', impact: 'Medium' },
              { insight: 'Asian markets demonstrate rapid growth in relevance', region: 'Asia', impact: 'High' },
              { insight: 'Emerging markets in Africa show increasing data density', region: 'Africa', impact: 'Medium' }
            ].map((item, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.insight}</h4>
                  <span className="text-lg">{
                    item.region === 'North America' ? '🇺🇸' :
                    item.region === 'Europe' ? '🇪🇺' :
                    item.region === 'Asia' ? '🌏' : '🌍'
                  }</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Region: {item.region}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.impact === 'High' ? 'bg-red-100 text-red-800' :
                    item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Impact: {item.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Map Tools</h3>
          <div className="space-y-3">
            {[
              { tool: 'Heatmap Generator', description: 'Create intensity heatmaps', icon: <FiTarget /> },
              { tool: 'Region Comparison', description: 'Compare metrics across regions', icon: <FiBarChart2 /> },
              { tool: 'Data Overlay', description: 'Overlay multiple data layers', icon: <FiGlobe /> },
              { tool: 'Export Options', description: 'Export maps in multiple formats', icon: <FiDownload /> }
            ].map((item, index) => (
              <button
                key={index}
                className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600">{item.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{item.tool}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;