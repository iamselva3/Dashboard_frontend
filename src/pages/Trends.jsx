
import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiFilter, FiDownload, FiCalendar, FiBarChart2, FiActivity, FiTarget } from 'react-icons/fi';

const Trends = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const trendMetrics = [
    { id: 'intensity', name: 'Intensity', icon: <FiActivity />, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 'likelihood', name: 'Likelihood', icon: <FiTrendingUp />, color: 'text-green-500', bgColor: 'bg-green-50' },
    { id: 'relevance', name: 'Relevance', icon: <FiTarget />, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'volume', name: 'Data Volume', icon: <FiBarChart2 />, color: 'text-purple-500', bgColor: 'bg-purple-50' }
  ];

  const trendData = {
    intensity: [
      { period: 'Jan', value: 65, trend: 'up' },
      { period: 'Feb', value: 68, trend: 'up' },
      { period: 'Mar', value: 70, trend: 'up' },
      { period: 'Apr', value: 72, trend: 'up' },
      { period: 'May', value: 71, trend: 'down' },
      { period: 'Jun', value: 73, trend: 'up' },
      { period: 'Jul', value: 75, trend: 'up' },
      { period: 'Aug', value: 74, trend: 'down' },
      { period: 'Sep', value: 76, trend: 'up' },
      { period: 'Oct', value: 78, trend: 'up' },
      { period: 'Nov', value: 80, trend: 'up' },
      { period: 'Dec', value: 82, trend: 'up' }
    ],
    likelihood: [
      { period: 'Jan', value: 60, trend: 'up' },
      { period: 'Feb', value: 62, trend: 'up' },
      { period: 'Mar', value: 65, trend: 'up' },
      { period: 'Apr', value: 63, trend: 'down' },
      { period: 'May', value: 66, trend: 'up' },
      { period: 'Jun', value: 68, trend: 'up' },
      { period: 'Jul', value: 70, trend: 'up' },
      { period: 'Aug', value: 72, trend: 'up' },
      { period: 'Sep', value: 71, trend: 'down' },
      { period: 'Oct', value: 73, trend: 'up' },
      { period: 'Nov', value: 75, trend: 'up' },
      { period: 'Dec', value: 77, trend: 'up' }
    ],
    relevance: [
      { period: 'Jan', value: 55, trend: 'up' },
      { period: 'Feb', value: 57, trend: 'up' },
      { period: 'Mar', value: 60, trend: 'up' },
      { period: 'Apr', value: 62, trend: 'up' },
      { period: 'May', value: 61, trend: 'down' },
      { period: 'Jun', value: 63, trend: 'up' },
      { period: 'Jul', value: 65, trend: 'up' },
      { period: 'Aug', value: 67, trend: 'up' },
      { period: 'Sep', value: 69, trend: 'up' },
      { period: 'Oct', value: 68, trend: 'down' },
      { period: 'Nov', value: 70, trend: 'up' },
      { period: 'Dec', value: 72, trend: 'up' }
    ]
  };

  const insights = [
    {
      title: 'Intensity Peaks in Q4',
      description: 'Average intensity increased by 15% in the last quarter',
      impact: 'high',
      recommendation: 'Focus on high-intensity data points for strategic planning'
    },
    {
      title: 'Likelihood Shows Steady Growth',
      description: 'Consistent upward trend observed over the past 12 months',
      impact: 'medium',
      recommendation: 'Consider likelihood as a reliable indicator for forecasting'
    },
    {
      title: 'Seasonal Patterns Detected',
      description: 'Relevance scores show seasonal variations with peaks in Q1 and Q3',
      impact: 'medium',
      recommendation: 'Adjust data collection strategies based on seasonal trends'
    },
    {
      title: 'Correlation Between Metrics',
      description: 'Strong correlation found between intensity and likelihood metrics',
      impact: 'high',
      recommendation: 'Use combined metrics for more accurate predictions'
    }
  ];

  const getCurrentData = () => {
    if (selectedMetric === 'all') {
      return trendData.intensity; // Default to intensity for "all"
    }
    return trendData[selectedMetric] || [];
  };

  const calculateGrowth = () => {
    const data = getCurrentData();
    if (data.length < 2) return 0;
    
    const first = data[0].value;
    const last = data[data.length - 1].value;
    return ((last - first) / first * 100).toFixed(1);
  };

  const getAverage = () => {
    const data = getCurrentData();
    if (data.length === 0) return 0;
    
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return (sum / data.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trends Analysis</h1>
          <p className="text-gray-600">Monitor patterns and trends in your data over time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['daily', 'weekly', 'monthly', 'quarterly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 text-sm capitalize ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center">
            <FiFilter className="mr-2" />
            Filter Trends
          </button>
          
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedMetric('all')}
          className={`p-4 rounded-lg border transition-all ${
            selectedMetric === 'all'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">All Metrics</h3>
            <div className="flex space-x-1">
              <FiActivity className="text-red-500" />
              <FiTrendingUp className="text-green-500" />
              <FiTarget className="text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">3.8%</p>
          <p className="text-sm text-gray-500">Overall Growth</p>
        </button>
        
        {trendMetrics.map((metric) => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`p-4 rounded-lg border transition-all ${
              selectedMetric === metric.id
                ? `border-${metric.color.split('-')[1]}-500 ${metric.bgColor}`
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{metric.name}</h3>
              <span className={metric.color}>{metric.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {metric.id === 'intensity' ? '72.5' :
               metric.id === 'likelihood' ? '68.3' :
               metric.id === 'relevance' ? '64.8' : '10,240'}
            </p>
            <p className="text-sm text-gray-500">Current Average</p>
          </button>
        ))}
      </div>

      {/* Trend Visualization */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              {selectedMetric === 'all' ? 'All Metrics Trend' : `${trendMetrics.find(m => m.id === selectedMetric)?.name} Trend`}
            </h3>
            <p className="text-gray-600">
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} trends over the past 12 months
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiCalendar className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Jan 2023 - Dec 2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-blue-300"></div>
              <span className="text-sm">Projected</span>
            </div>
          </div>
        </div>
        
        {/* Trend Chart Visualization */}
        <div className="h-64 flex items-end space-x-2 mb-6">
          {getCurrentData().map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-16 bg-red-100 rounded-t-lg relative group">
                <div
                  className="bg-red-500 rounded-t-lg transition-all hover:bg-red-600"
                  style={{ height: `${item.value}%` }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.period}: {item.value}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{item.period}</span>
              <div className="mt-1">
                {item.trend === 'up' ? (
                  <FiTrendingUp className="text-green-500" size={16} />
                ) : (
                  <FiTrendingDown className="text-red-500" size={16} />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trend Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Overall Growth</span>
              <FiTrendingUp className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{calculateGrowth()}%</p>
            <p className="text-sm text-gray-500">Since January 2023</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Average Value</span>
              <FiBarChart2 className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{getAverage()}</p>
            <p className="text-sm text-gray-500">12-month average</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Peak Value</span>
              <FiActivity className="text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.max(...getCurrentData().map(d => d.value))}
            </p>
            <p className="text-sm text-gray-500">Highest recorded value</p>
          </div>
        </div>
      </div>

      {/* Insights & Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insight.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <FiTarget className="mr-2" size={14} />
                  <span>{insight.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Trend Patterns</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Seasonal Pattern</span>
                <span className="text-lg">📈</span>
              </div>
              <p className="text-sm text-gray-600">
                Consistent growth observed in Q4 across all metrics
              </p>
              <div className="mt-3 flex items-center text-sm">
                <span className="text-green-600 mr-4">↑ Peak: December</span>
                <span className="text-blue-600">↓ Low: April</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Correlation Strength</span>
                <span className="text-lg">🔗</span>
              </div>
              <p className="text-sm text-gray-600">
                Intensity and likelihood show strong positive correlation (r=0.85)
              </p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Predictive Value</span>
                <span className="text-lg">🎯</span>
              </div>
              <p className="text-sm text-gray-600">
                Current trends predict 12-15% growth in the next quarter
              </p>
              <div className="mt-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  87% Confidence
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Anomaly Detection</span>
                <span className="text-lg">⚠️</span>
              </div>
              <p className="text-sm text-gray-600">
                Minor dip detected in May for all metrics
              </p>
              <div className="mt-3 text-sm text-yellow-600">
                <FiTrendingDown className="inline mr-1" />
                May: -2.3% from April average
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Forecast & Projections</h3>
            <p className="text-gray-600">Predictive analysis based on current trends</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Next 3 months:</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
              Positive Outlook
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Metric</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Current</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Q1 2024 Forecast</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Growth Expected</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Confidence</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Intensity', current: 72.5, forecast: 78.2, growth: '+5.7', confidence: 'High', trend: 'up' },
                { metric: 'Likelihood', current: 68.3, forecast: 72.8, growth: '+4.5', confidence: 'High', trend: 'up' },
                { metric: 'Relevance', current: 64.8, forecast: 69.1, growth: '+4.3', confidence: 'Medium', trend: 'up' },
                { metric: 'Data Volume', current: '10,240', forecast: '11,850', growth: '+1,610', confidence: 'High', trend: 'up' },
                { metric: 'New Sources', current: 8, forecast: 10, growth: '+2', confidence: 'Medium', trend: 'up' }
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium">{item.metric}</td>
                  <td className="py-4 px-4">{item.current}</td>
                  <td className="py-4 px-4 font-semibold">{item.forecast}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.growth.startsWith('+') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.growth}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.confidence === 'High' 
                        ? 'bg-blue-100 text-blue-800' 
                        : item.confidence === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.confidence}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.trend === 'up' ? (
                      <FiTrendingUp className="text-green-500" />
                    ) : (
                      <FiTrendingDown className="text-red-500" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trends;