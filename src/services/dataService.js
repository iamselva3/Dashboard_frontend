import { api } from './api';

export const dataService = {
  // Fetch data with filters
  async getData(filters = {}, page = 1, limit = 100) {
    const params = {
      ...filters,
      page,
      limit
    };
    
    return api.get('/data', { params });
  },
  
  // Get aggregated statistics
  async getStats() {
    return api.get('/data/stats');
  },
  
  // Get filter options
  async getFilterOptions() {
    return api.get('/data/filters');
  },
  
  // Get visualization data
  async getVisualizationData(type, filters = {}) {
    return api.post('/data/visualization', { type, filters });
  },
  
  // Get data for specific metrics
  async getIntensityData(filters = {}) {
    return this.getVisualizationData('intensity_by_country', filters);
  },
  
  async getLikelihoodData(filters = {}) {
    return this.getVisualizationData('likelihood_by_topic', filters);
  },
  
  async getRelevanceData(filters = {}) {
    return this.getVisualizationData('relevance_by_sector', filters);
  },
  
  async getYearlyTrends(filters = {}) {
    return this.getVisualizationData('yearly_trends', filters);
  },
  
  // Export data
  async exportData(format = 'csv', filters = {}) {
    return api.post('/data/export', { format, filters });
  },
  
  // Save filter configuration
  async saveFilter(name, filters) {
    return api.post('/filters/save', { name, filters });
  },
  
  // Load saved filters
  async getSavedFilters() {
    return api.get('/filters');
  },
  
  // Delete saved filter
  async deleteFilter(id) {
    return api.delete(`/filters/${id}`);
  }
};