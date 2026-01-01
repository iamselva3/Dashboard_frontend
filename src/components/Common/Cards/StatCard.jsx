import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ title, value, icon, change, trend, description, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600 bg-green-100';
    if (trend === 'down') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <FiTrendingUp className="inline" />;
    if (trend === 'down') return <FiTrendingDown className="inline" />;
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>
      
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1">{change}</span>
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated just now</span>
          <span className="px-2 py-1 bg-gray-100 rounded">Live</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;