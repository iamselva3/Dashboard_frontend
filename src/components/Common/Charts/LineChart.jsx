import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const LineChart = ({ 
  data, 
  xKey, 
  dataKeys = [],
  names = [],
  height = 300, 
  colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'],
  showGrid = true,
  showLegend = true,
  areaChart = false,
  strokeWidths = [2, 2, 2],
  showDots = true,
  margin = { top: 20, right: 30, left: 20, bottom: 5 }
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}:</span>
              </div>
              <span className="font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center text-gray-500">
          <p>No data available</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  const ChartComponent = areaChart ? AreaChart : RechartsLineChart;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent
        data={data}
        margin={margin}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis 
          dataKey={xKey} 
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
        
        {dataKeys.map((key, index) => {
          if (areaChart) {
            return (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                name={names[index] || key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.1}
                strokeWidth={strokeWidths[index] || 2}
                dot={showDots ? { r: 4 } : false}
                activeDot={{ r: 6 }}
              />
            );
          }
          
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={names[index] || key}
              stroke={colors[index % colors.length]}
              strokeWidth={strokeWidths[index] || 2}
              dot={showDots ? { r: 4 } : false}
              activeDot={{ r: 6 }}
              strokeDasharray={index === 1 ? "5 5" : undefined}
            />
          );
        })}
      </ChartComponent>
    </ResponsiveContainer>
  );
};

export default LineChart;