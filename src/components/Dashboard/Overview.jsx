import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import StatCard from '../Common/Cards/StatCard';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiTarget,
  FiGlobe,
  FiBarChart2,
  FiUsers,
  FiCalendar
} from 'react-icons/fi';

const Overview = () => {
  const [stats, setStats] = useState({
    totalRecords: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0,
    uniqueCountries: 0,
    uniqueTopics: 0,
    uniqueRegions: 0,
    uniqueSources: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('all');

  useEffect(() => {
    fetchOverviewData();
  }, [timeframe]);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/data/stats');
      console.log('Fetched overview stats:', response);
      setStats(response?.stats);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      title: 'Total Records',
      value: stats.totalRecords?.toLocaleString() || '0',
      icon: <FiActivity className="text-blue-500" />,
      change: '+12.5%',
      trend: 'up',
      description: 'Total data points available'
    },
    {
      title: 'Avg Intensity',
      value: stats.avgIntensity?.toFixed(2) || '0.00',
      icon: <FiTrendingUp className="text-green-500" />,
      change: '+2.3%',
      trend: 'up',
      description: 'Average impact score'
    },
    {
      title: 'Avg Likelihood',
      value: stats.avgLikelihood?.toFixed(2) || '0.00',
      icon: <FiBarChart2 className="text-purple-500" />,
      change: '+1.8%',
      trend: 'up',
      description: 'Probability score'
    },
    {
      title: 'Avg Relevance',
      value: stats.avgRelevance?.toFixed(2) || '0.00',
      icon: <FiTarget className="text-orange-500" />,
      change: '-0.5%',
      trend: 'down',
      description: 'Relevance score'
    },
    {
      title: 'Countries',
      value: stats.uniqueCountries || '0',
      icon: <FiGlobe className="text-red-500" />,
      change: '+5',
      trend: 'up',
      description: 'Countries covered'
    },
    {
      title: 'Topics',
      value: stats.uniqueTopics || '0',
      icon: <FiUsers className="text-indigo-500" />,
      change: '+12',
      trend: 'up',
      description: 'Unique topics'
    },
    {
      title: 'Regions',
      value: stats.uniqueRegions || '0',
      icon: <FiGlobe className="text-teal-500" />,
      change: '+3',
      trend: 'up',
      description: 'Geographic regions'
    },
    {
      title: 'Sources',
      value: stats.uniqueSources || '0',
      icon: <FiCalendar className="text-pink-500" />,
      change: '+8',
      trend: 'up',
      description: 'Data sources'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Overview Metrics</h2>
          <p className="text-gray-600">Key performance indicators across all data</p>
        </div>
        
        <div className="flex space-x-2">
          {['today', 'week', 'month', 'quarter', 'all'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                timeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <StatCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            trend={metric.trend}
            description={metric.description}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Data Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">By Region</span>
                <span className="text-sm font-medium">45% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">By Topic</span>
                <span className="text-sm font-medium">68% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">By Country</span>
                <span className="text-sm font-medium">32% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Data import completed', time: '2 minutes ago', status: 'success' },
              { action: 'New filters applied', time: '15 minutes ago', status: 'info' },
              { action: 'Export generated', time: '1 hour ago', status: 'success' },
              { action: 'Dashboard updated', time: '3 hours ago', status: 'info' },
              { action: 'System maintenance', time: 'Yesterday', status: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">System</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;