import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BarChart from '../components/Common/Charts/BarChart';
import PieChart from '../components/Common/Charts/PieChart';
import { FiTag, FiTrendingUp, FiBarChart2, FiFilter, FiSearch } from 'react-icons/fi';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('count'); // 'count', 'name', 'intensity'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicDetails, setTopicDetails] = useState(null);

  useEffect(() => {
    fetchTopicsData();
  }, []);

  useEffect(() => {
    filterAndSortTopics();
  }, [topics, searchTerm, sortBy]);

  const fetchTopicsData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/data/filters');
      // console.log('Fetched topics data:', response);
      const topicsData = response.filters.topics || [];
      setTopics(topicsData);
    } catch (error) {
      console.error('Error fetching topics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopicDetails = async (topic) => {
    try {
      const response = await api.post('/data/visualization', {
        type: 'likelihood_by_topic',
        filters: { topics: [topic] }
      });
      setTopicDetails(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching topic details:', error);
    }
  };

  const filterAndSortTopics = () => {
    let filtered = topics?.filter(topic =>
      topic._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === 'count') return b.count - a.count;
      if (sortBy === 'name') return a._id.localeCompare(b._id);
      if (sortBy === 'intensity') {
        // This would require additional data
        return 0;
      }
      return 0;
    });

    setFilteredTopics(filtered);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic._id);
    fetchTopicDetails(topic._id);
  };

  const getTopicColor = (count) => {
    if (count > 500) return 'bg-red-500';
    if (count > 200) return 'bg-orange-500';
    if (count > 100) return 'bg-yellow-500';
    if (count > 50) return 'bg-green-500';
    return 'bg-blue-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Topic Analysis</h1>
          <p className="text-gray-600">Explore data categorized by topics and subjects</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="count">Sort by Count</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Total Topics</h3>
            <FiTag className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{topics.length}</p>
          <p className="text-sm text-gray-500 mt-2">Unique topics identified</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Most Popular</h3>
            <FiTrendingUp className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 truncate">
            {topics[0]?._id || 'N/A'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {topics[0]?.count || 0} occurrences
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Avg Records/Topic</h3>
            <FiBarChart2 className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round(topics.reduce((sum, t) => sum + t.count, 0) / topics.length)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Average per topic</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Coverage</h3>
            <FiFilter className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">84%</p>
          <p className="text-sm text-gray-500 mt-2">Data coverage rate</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topics List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">All Topics</h2>
              <p className="text-gray-600">Click on any topic to view detailed analysis</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {filteredTopics.map((topic, index) => (
                  <div
                    key={topic._id}
                    onClick={() => handleTopicClick(topic)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTopic === topic._id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">🏷️</span>
                        <h3 className="font-semibold text-gray-800">{topic._id}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{topic.count} records</span>
                        <div className={`w-3 h-3 rounded-full ${getTopicColor(topic.count)}`}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex space-x-4">
                        <span className="text-gray-600">Rank: #{index + 1}</span>
                        <span className="text-gray-600">
                          {((topic.count / topics.reduce((sum, t) => sum + t.count, 0)) * 100).toFixed(1)}% of total
                        </span>
                      </div>
                      <button className="text-green-600 hover:text-green-800">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No topics found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Topic Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Topic Distribution</h3>
            <PieChart
              data={filteredTopics.slice(0, 6).map(t => ({
                name: t._id.length > 15 ? t._id.substring(0, 15) + '...' : t._id,
                value: t.count
              }))}
              height={250}
            />
          </div>
          
          {selectedTopic && topicDetails && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Topic Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{selectedTopic}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Likelihood</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {topicDetails.avgLikelihood?.toFixed(2) || 'N/A'}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Records</p>
                      <p className="text-2xl font-bold text-green-600">
                        {topicDetails.count || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-2">Related Topics</h5>
                  <div className="flex flex-wrap gap-2">
                    {filteredTopics
                      ?.filter(t => t._id !== selectedTopic)
                      ?.slice(0, 5)
                      ?.map(topic => (
                        <span
                          key={topic._id}
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                        >
                          {topic._id}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Topic Insights</h3>
            <div className="space-y-3">
              {[
                'Technology topics show highest growth',
                'Environmental topics gaining relevance',
                'Economic topics most frequently updated',
                'Social topics have widest distribution'
              ].map((insight, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <p className="text-sm text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Topic Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Topic Trends Over Time</h3>
            <p className="text-gray-600">Popularity of top topics across years</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
              Export Data
            </button>
          </div>
        </div>
        
        <BarChart
          data={filteredTopics.slice(0, 8).map(topic => ({
            topic: topic._id,
            count: topic.count
          }))}
          xKey="topic"
          yKey="count"
          height={300}
          colors={['#10b981']}
        />
      </div>
    </div>
  );
};

export default Topics;