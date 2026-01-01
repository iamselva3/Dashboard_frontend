import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiTrendingUp, FiDownload, FiMaximize2 } from 'react-icons/fi';

const LikelihoodChart = ({ height = 400 }) => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('line'); // 'line' or 'area'
  const [timeRange, setTimeRange] = useState('yearly'); // 'yearly', 'monthly', 'quarterly'

  useEffect(() => {
    fetchLikelihoodData();
  }, [filters, timeRange]);

  const fetchLikelihoodData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/data/visualization', {
        type: 'yearly_trends',
        filters
      });
      
      // Process data for chart
      const chartData = response?.data
        .filter(item => item._id && item.avgLikelihood)
        .map(item => ({
          year: item._id,
          likelihood: parseFloat(item.avgLikelihood.toFixed(2)),
          intensity: parseFloat(item.avgIntensity?.toFixed(2)) || 0,
          relevance: parseFloat(item.avgRelevance?.toFixed(2)) || 0,
          records: item.count
        }))
        .sort((a, b) => a.year - b.year);

      setData(chartData);
    } catch (error) {
      console.error('Error fetching likelihood data:', error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">Year: {label}</p>
          {payload.map((pld, index) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: pld.color }}
                ></div>
                <span className="text-sm text-gray-600">{pld.name}:</span>
              </div>
              <span className="font-semibold">{pld.value}</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Total Records: {payload[0]?.payload.records || 0}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2" />
            Likelihood Trends Over Time
          </h3>
          <p className="text-gray-600 text-sm">Historical trends and predictions</p>
        </div>

        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['yearly', 'quarterly', 'monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm capitalize ${
                  timeRange === range
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('line')}
              className={`px-3 py-1 ${view === 'line' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Line
            </button>
            <button
              onClick={() => setView('area')}
              className={`px-3 py-1 ${view === 'area' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              Area
            </button>
          </div>

          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiDownload />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiMaximize2 />
          </button>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {view === 'line' ? (
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="likelihood"
                name="Likelihood"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="intensity"
                name="Intensity"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="relevance"
                name="Relevance"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="likelihood"
                name="Likelihood"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="intensity"
                name="Intensity"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Current Likelihood</p>
              <p className="text-2xl font-bold text-green-600">
                {data.length > 0 ? data[data.length - 1].likelihood : '0.00'}
              </p>
            </div>
            <FiTrendingUp className="text-green-500 text-2xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Latest recorded value
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Peak Value</p>
              <p className="text-2xl font-bold text-blue-600">
                {data.length > 0 ? Math.max(...data.map(d => d.likelihood)).toFixed(2) : '0.00'}
              </p>
            </div>
            <FiTrendingUp className="text-blue-500 text-2xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Highest recorded likelihood
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Trend</p>
              <p className="text-2xl font-bold text-purple-600">
                {data.length > 2 ? 
                  ((data[data.length - 1].likelihood - data[0].likelihood) > 0 ? '+ ' : '') +
                  (data[data.length - 1].likelihood - data[0].likelihood).toFixed(2)
                  : '0.00'
                }
              </p>
            </div>
            <FiTrendingUp className="text-purple-500 text-2xl" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Change over period
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikelihoodChart;