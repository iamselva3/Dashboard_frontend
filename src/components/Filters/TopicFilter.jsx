import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import { api } from '../../services/api';
import { FiTag, FiSearch, FiX } from 'react-icons/fi';

const TopicFilter = () => {
  const { filters, updateFilter } = useFilters();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await api.get('/data/filters');
      // console.log('Fetched topics data:', response);
      const topicsData = response.filters.topics || [];
      // Sort by count descending
      topicsData.sort((a, b) => b.count - a.count);
      setTopics(topicsData);
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicToggle = (topic) => {
    const currentTopics = filters.topics || [];
    let newTopics;
    
    if (currentTopics.includes(topic)) {
      newTopics = currentTopics.filter(t => t !== topic);
    } else {
      newTopics = [...currentTopics, topic];
    }
    
    updateFilter('topics', newTopics.length > 0 ? newTopics : []);
  };

  const filteredTopics = topics.filter(topic => 
    topic._id && topic._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedTopics = showAll ? filteredTopics : filteredTopics.slice(0, 10);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pt-1">
        {displayedTopics.map((topic) => {
            const isSelected = (filters.topics || []).includes(topic._id);
            return (
                <button
                    key={topic._id}
                    onClick={() => handleTopicToggle(topic._id)}
                    className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${isSelected 
                            ? 'bg-blue-100 text-blue-800 border-blue-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent'}
                        border
                    `}
                >
                    <FiTag className={`mr-1.5 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} size={10} />
                    <span className="truncate max-w-[150px]">{topic._id}</span>
                    <span className="ml-1.5 text-xs opacity-60">
                        {topic.count}
                    </span>
                    {isSelected && <FiX className="ml-1.5 text-blue-500 hover:text-blue-700" size={12} />}
                </button>
            );
        })}
      </div>

      {filteredTopics.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAll ? 'Show Less' : `Show All (${filteredTopics.length})`}
        </button>
      )}

      {filteredTopics.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-2">
          No topics found
        </p>
      )}
    </div>
  );
};

export default TopicFilter;
