import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiBarChart2, FiDownload, FiFilter } from 'react-icons/fi';

const IntensityChart = ({ height = 400 }) => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('country'); // 'country', 'sector', 'region'

  useEffect(() => {
    fetchIntensityData();
  }, [filters, chartType]);

  const fetchIntensityData = async () => {
    try {
      setLoading(true);
      let visualizationType = 'intensity_by_country';
      
      if (chartType === 'sector') {
        visualizationType = 'intensity_by_sector';
      } else if (chartType === 'region') {
        visualizationType = 'intensity_by_region';
      }

      const response = await api.post('/data/visualization', {
        type: visualizationType,
        filters
      });
      
      // Transform data for chart
      const chartData = response?.data.map(item => ({
        name: item._id || 'Unknown',
        intensity: parseFloat(item.avgIntensity?.toFixed(2)) || 0,
        count: item.count || 0
      })).slice(0, 10); // Top 10 only

      setData(chartData);
    } catch (error) {
      console.error('Error fetching intensity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (value) => {
    if (value > 80) return '#ef4444'; // red
    if (value > 60) return '#f97316'; // orange
    if (value > 40) return '#eab308'; // yellow
    if (value > 20) return '#3b82f6'; // blue
    return '#10b981'; // green
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-gray-600">
            Intensity: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Records: <span className="font-semibold">{payload[0].payload.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiBarChart2 className="mr-2" />
            Intensity Analysis
          </h3>
          <p className="text-gray-600 text-sm">Average intensity by selected dimension</p>
        </div>

        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {['country', 'sector', 'region'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 text-sm capitalize ${
                  chartType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiDownload />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FiFilter />
          </button>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis 
              label={{ 
                value: 'Intensity Score', 
                angle: -90, 
                position: 'insideLeft',
                offset: -10
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="intensity"
              name="Average Intensity"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.intensity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600">High Intensity</p>
          <p className="text-xl font-bold text-red-600">80+</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-600">Medium-High</p>
          <p className="text-xl font-bold text-orange-600">60-80</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">Medium</p>
          <p className="text-xl font-bold text-yellow-600">40-60</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Low</p>
          <p className="text-xl font-bold text-green-600">Below 40</p>
        </div>
      </div>
    </div>
  );
};

export default IntensityChart;