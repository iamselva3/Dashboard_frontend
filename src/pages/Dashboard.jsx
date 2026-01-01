import React from 'react';
import Overview from '../components/Dashboard/Overview';
import IntensityChart from '../components/Dashboard/IntensityChart';
import LikelihoodChart from '../components/Dashboard/LikelihoodChart';
import RelevanceChart from '../components/Dashboard/RelevanceChart';
import YearFilter from '../components/Filters/YearFilter';
import TopicFilter from '../components/Filters/TopicFilter';
import RegionFilter from '../components/Filters/RegionFilter';
import PestSwotFilter from '../components/Filters/PestSwotFilter';
import { FiGrid, FiFilter, FiBarChart2 } from 'react-icons/fi';
import { useFilters } from '../context/FilterContext';

const Dashboard = () => {
  const { filters, clearFilters } = useFilters();
  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== null && v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor key metrics and data insights in real-time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <FiFilter className="mr-2" />
            <span className="text-sm">
              {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          </div>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Clear All Filters
          </button>
          
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Export Dashboard
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Overview />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FiGrid className="text-blue-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Quick Filters</h3>
            </div>
            <div className="space-y-4">
              <YearFilter />
              <TopicFilter />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <FiBarChart2 className="text-green-500 mr-2" />
              <h3 className="font-semibold text-gray-800">Recent Insights</h3>
            </div>
            <div className="space-y-3">
              {[
                { text: 'Technology sector shows highest intensity', color: 'blue' },
                { text: 'Likelihood increasing in emerging markets', color: 'green' },
                { text: 'Relevance peaked in 2022 data', color: 'purple' },
                { text: 'New data from Asia Pacific region', color: 'orange' }
              ].map((insight, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mr-3 bg-${insight.color}-500`}></div>
                  <p className="text-sm text-gray-700">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IntensityChart height={400} />
        <LikelihoodChart height={400} />
      </div>
      
      <RelevanceChart height={450} />

      {/* Advanced Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Advanced Filtering</h2>
          <p className="text-gray-600">Refine your data analysis with detailed filters</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <YearFilter />
          <TopicFilter />
          <RegionFilter />
          <PestSwotFilter />
        </div>
      </div>

      {/* Data Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Data Quality</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Completeness</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Accuracy</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Timeliness</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4">Recent Updates</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Update Type</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: 'Today', type: 'Data Import', desc: '2023 Q4 data added', status: 'Completed' },
                  { date: 'Yesterday', type: 'System Update', desc: 'Performance optimization', status: 'Completed' },
                  { date: '2 days ago', type: 'Filter Added', desc: 'New region filters', status: 'Active' },
                  { date: '1 week ago', type: 'Dashboard Update', desc: 'New visualization types', status: 'Active' }
                ].map((update, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-600">{update.date}</td>
                    <td className="py-3 text-sm text-gray-700">{update.type}</td>
                    <td className="py-3 text-sm text-gray-700">{update.desc}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        update.status === 'Completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {update.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;