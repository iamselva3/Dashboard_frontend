import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiTarget, FiPieChart, FiBarChart2, FiCrosshair } from 'react-icons/fi'; // Changed FiRadar to FiCrosshair

const RelevanceChart = ({ height = 500 }) => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('pie'); // 'pie', 'bar', 'radar'
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchRelevanceData();
  }, [filters]);

  const fetchRelevanceData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/data/visualization', {
        type: 'relevance_by_sector',
        filters
      });
      // console.log('Fetched relevance data:', response);
      
      // Process for bar chart
      const barChartData = response.data
        .filter(item => item._id && item.avgRelevance)
        .map(item => ({
          sector: item._id || 'Unknown',
          relevance: parseFloat(item.avgRelevance.toFixed(2)),
          count: item.count || 0
        }))
        .slice(0, 8); // Top 8 sectors

      // Process for pie chart
      const pieChartData = barChartData.map(item => ({
        name: item.sector.length > 15 ? item.sector.substring(0, 15) + '...' : item.sector,
        value: item.relevance,
        fullName: item.sector
      }));

      setData(barChartData);
      setPieData(pieChartData);
    } catch (error) {
      console.error('Error fetching relevance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4',
    '#FF9F43', '#54A0FF', '#5F27CD', '#00D2D3'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].payload.fullName || payload[0].name}</p>
          <p className="text-sm text-gray-600">
            Relevance Score: <span className="font-semibold">{payload[0].value}</span>
          </p>
          {payload[0].payload.count && (
            <p className="text-sm text-gray-600">
              Records: <span className="font-semibold">{payload[0].payload.count}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  startAngle,
                  endAngle,
                  fill,
                  payload,
                  percent,
                  value
                }) => {
                  const RADIAN = Math.PI / 180;
                  const sin = Math.sin(-RADIAN * midAngle);
                  const cos = Math.cos(-RADIAN * midAngle);
                  const sx = cx + (outerRadius + 10) * cos;
                  const sy = cy + (outerRadius + 10) * sin;
                  const mx = cx + (outerRadius + 30) * cos;
                  const my = cy + (outerRadius + 30) * sin;
                  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                  const ey = my;
                  const textAnchor = cos >= 0 ? 'start' : 'end';

                  return (
                    <g>
                      <Cell key={`cell-${payload.name}`} fill={fill} />
                      <path
                        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                        stroke={fill}
                        fill="none"
                      />
                      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                      <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        textAnchor={textAnchor}
                        fill="#333"
                        className="text-sm"
                      >
                        {payload.name}
                      </text>
                      <text
                        x={ex + (cos >= 0 ? 1 : -1) * 12}
                        y={ey}
                        dy={18}
                        textAnchor={textAnchor}
                        fill="#999"
                        className="text-xs"
                      >
                        {`Score: ${value}`}
                      </text>
                    </g>
                  );
                }}
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="sector"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ value: 'Relevance Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="relevance"
                name="Relevance Score"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.slice(0, 6)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="sector" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Relevance"
                dataKey="relevance"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FiTarget className="mr-2" />
            Relevance Distribution by Sector
          </h3>
          <p className="text-gray-600 text-sm">How relevant different sectors are in the dataset</p>
        </div>

        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 ${chartType === 'pie' ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
              title="Pie Chart"
            >
              <FiPieChart />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 ${chartType === 'bar' ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
              title="Bar Chart"
            >
              <FiBarChart2 />
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`p-2 ${chartType === 'radar' ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
              title="Radar Chart"
            >
              <FiCrosshair /> {/* Changed from FiRadar */}
            </button>
          </div>

          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
            <option>Top 8 Sectors</option>
            <option>Top 12 Sectors</option>
            <option>All Sectors</option>
          </select>
        </div>
      </div>

      <div style={{ height }}>
        {renderChart()}
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-3">Sector Insights</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.slice(0, 4).map((sector, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
              style={{ borderLeft: `4px solid ${COLORS[index]}` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm truncate">{sector.sector}</p>
                  <p className="text-2xl font-bold mt-1">{sector.relevance}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {sector.count} records
                </span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${sector.relevance}%`,
                    backgroundColor: COLORS[index]
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelevanceChart;