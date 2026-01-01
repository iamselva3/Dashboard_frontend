import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BarChart from '../components/Common/Charts/BarChart';
import LineChart from '../components/Common/Charts/LineChart';
import PieChart from '../components/Common/Charts/PieChart';
import { FiBarChart2, FiTrendingUp, FiPieChart, FiDownload, FiFilter } from 'react-icons/fi';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    intensityByCountry: [],
    likelihoodByTopic: [],
    relevanceBySector: [],
    yearlyTrends: [],
    pestleDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'detailed', 'comparative'

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [
        intensityRes,
        likelihoodRes,
        relevanceRes,
        trendsRes,
        pestleRes
      ] = await Promise.all([
        api.post('/data/visualization', { type: 'intensity_by_country' }),
        api.post('/data/visualization', { type: 'likelihood_by_topic' }),
        api.post('/data/visualization', { type: 'relevance_by_sector' }),
        api.post('/data/visualization', { type: 'yearly_trends' }),
        api.post('/data/visualization', { type: 'pestle_distribution' })
      ]);

      setAnalyticsData({
        intensityByCountry: intensityRes.data.data,
        likelihoodByTopic: likelihoodRes.data.data,
        relevanceBySector: relevanceRes.data.data,
        yearlyTrends: trendsRes.data.data,
        pestleDistribution: pestleRes.data.data
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processIntensityData = () => {
    return analyticsData.intensityByCountry
      ?.slice(0, 10)
    ?.map(item => ({
        country: item._id,
        intensity: item.avgIntensity?.toFixed(2) || 0,
        count: item.count
      }));
  };

  const processLikelihoodData = () => {
    return analyticsData.likelihoodByTopic
      ?.slice(0, 8)
      .map(item => ({
        topic: item._id,
        likelihood: item.avgLikelihood?.toFixed(2) || 0
      }));
  };

  const processRelevanceData = () => {
    return analyticsData.relevanceBySector
      ?.slice(0, 6)
      .map(item => ({
        name: item._id,
        value: item.avgRelevance?.toFixed(2) || 0
      }));
  };

  const processTrendsData = () => {
    return analyticsData.yearlyTrends
      ?.filter(item => item._id)
      ?.sort((a, b) => a._id - b._id)
      ?.map(item => ({
        year: item._id.toString(),
        intensity: item.avgIntensity?.toFixed(2) || 0,
        likelihood: item.avgLikelihood?.toFixed(2) || 0,
        relevance: item.avgRelevance?.toFixed(2) || 0
      }));
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">Deep dive into data patterns and insights</p>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['overview', 'detailed', 'comparative'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 text-sm capitalize ${
                  activeView === view
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiDownload />
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiFilter />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Total Records</h3>
            <FiBarChart2 className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">10,240</p>
          <p className="text-sm text-gray-500 mt-2">Across all datasets</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Avg Intensity</h3>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">65.8</p>
          <p className="text-sm text-gray-500 mt-2">Medium-High range</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Avg Likelihood</h3>
            <FiBarChart2 className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">72.4</p>
          <p className="text-sm text-gray-500 mt-2">High probability</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Avg Relevance</h3>
            <FiPieChart className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">58.2</p>
          <p className="text-sm text-gray-500 mt-2">Moderate relevance</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Intensity by Country (Top 10)</h3>
          <BarChart
            data={processIntensityData()}
            xKey="country"
            yKey="intensity"
            height={300}
            colors={['#3b82f6']}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Likelihood by Topic</h3>
          <BarChart
            data={processLikelihoodData()}
            xKey="topic"
            yKey="likelihood"
            height={300}
            colors={['#10b981']}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Relevance Distribution</h3>
          <PieChart
            data={processRelevanceData()}
            height={300}
            centerLabel={{ value: '58.2', title: 'Avg Relevance' }}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Yearly Trends</h3>
          <LineChart
            data={processTrendsData()}
            xKey="year"
            dataKeys={['intensity', 'likelihood', 'relevance']}
            names={['Intensity', 'Likelihood', 'Relevance']}
            height={300}
            colors={['#3b82f6', '#10b981', '#8b5cf6']}
          />
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Detailed Analysis</h2>
          <p className="text-gray-600">Comprehensive breakdown of key metrics</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Metric</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Average</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Median</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Std Dev</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Min</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Max</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Intensity', avg: 65.8, median: 68.2, std: 12.4, min: 12, max: 98, trend: '↗️' },
                  { metric: 'Likelihood', avg: 72.4, median: 75.1, std: 8.7, min: 24, max: 95, trend: '↗️' },
                  { metric: 'Relevance', avg: 58.2, median: 56.8, std: 14.2, min: 8, max: 92, trend: '→' },
                  { metric: 'Impact Score', avg: 45.6, median: 42.3, std: 18.9, min: 5, max: 88, trend: '↘️' }
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-700">{row.metric}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{row.avg}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{row.median}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{row.std}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{row.min}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{row.max}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-xl">{row.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-4">
            {[
              { 
                insight: 'Intensity peaks in technology sector', 
                impact: 'High',
                recommendation: 'Focus on tech-related data'
              },
              { 
                insight: 'Likelihood decreasing in mature markets', 
                impact: 'Medium',
                recommendation: 'Explore emerging markets'
              },
              { 
                insight: 'Relevance consistent across regions', 
                impact: 'Low',
                recommendation: 'Maintain current regional focus'
              }
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium text-gray-800 mb-2">{item.insight}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    item.impact === 'High' ? 'bg-red-100 text-red-800' :
                    item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    Impact: {item.impact}
                  </span>
                  <span className="text-gray-600">{item.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <div className="space-y-3">
            {[
              'Increase data collection in high-intensity sectors',
              'Monitor likelihood trends in key markets',
              'Expand relevance analysis to new regions',
              'Update filters based on recent data patterns',
              'Consider PEST analysis for strategic planning'
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

export default Analytics;