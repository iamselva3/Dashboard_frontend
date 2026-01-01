import React, { createContext, useState, useContext, useCallback } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    startYear: null,
    endYear: null,
    topics: [],
    sectors: [],
    regions: [],
    countries: [],
    cities: [],
    pestle: null,
    source: null,
    swot: null,
    intensityMin: null,
    intensityMax: null,
    likelihoodMin: null,
    likelihoodMax: null,
    relevanceMin: null,
    relevanceMax: null,
  });

  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const updateMultipleFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilter = useCallback((filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType.includes('topics') || 
                    filterType.includes('sectors') || 
                    filterType.includes('regions') || 
                    filterType.includes('countries') || 
                    filterType.includes('cities') ? [] : null
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      startYear: null,
      endYear: null,
      topics: [],
      sectors: [],
      regions: [],
      countries: [],
      cities: [],
      pestle: null,
      source: null,
      swot: null,
      intensityMin: null,
      intensityMax: null,
      likelihoodMin: null,
      likelihoodMax: null,
      relevanceMin: null,
      relevanceMax: null,
    });
  }, []);

  const getApiParams = useCallback(() => {
    const params = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          params[key] = value.join(',');
        } else if (!Array.isArray(value)) {
          params[key] = value;
        }
      }
    });

    return params;
  }, [filters]);

  const getActiveFilterCount = useCallback(() => {
    return Object.values(filters).filter(v => 
      v !== null && v !== undefined && v !== '' && 
      (Array.isArray(v) ? v.length > 0 : true)
    ).length;
  }, [filters]);

  const getFilterSummary = useCallback(() => {
    const summary = [];
    
    if (filters.startYear || filters.endYear) {
      summary.push(`Years: ${filters.startYear || 'Any'} - ${filters.endYear || 'Any'}`);
    }
    
    if (filters.topics?.length > 0) {
      summary.push(`Topics: ${filters.topics.length}`);
    }
    
    if (filters.regions?.length > 0) {
      summary.push(`Regions: ${filters.regions.length}`);
    }
    
    if (filters.countries?.length > 0) {
      summary.push(`Countries: ${filters.countries.length}`);
    }
    
    if (filters.pestle) {
      summary.push(`PEST: ${filters.pestle}`);
    }
    
    if (filters.swot) {
      summary.push(`SWOT: ${filters.swot}`);
    }
    
    return summary;
  }, [filters]);

  const value = {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilter,
    clearFilters,
    getApiParams,
    getActiveFilterCount,
    getFilterSummary
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};