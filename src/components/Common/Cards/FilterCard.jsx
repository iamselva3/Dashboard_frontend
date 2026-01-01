import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const FilterCard = ({ title, children, onClear, isActive = false, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow border ${isActive ? 'border-blue-300' : 'border-gray-200'} ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <FiFilter className="mr-2 text-blue-500" />
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
            title="Clear filter"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
      {isActive && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <p className="text-xs text-blue-700">
            This filter is currently active
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterCard;