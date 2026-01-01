import { useState, useCallback } from 'react';

export const useFilters = (initialFilters = {}) => {
    const [filters, setFilters] = useState(initialFilters);
    const [filterHistory, setFilterHistory] = useState([]);

    const updateFilter = useCallback((key, value) => {
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };

            // Save to history (last 10 changes)
            setFilterHistory(prevHistory => {
                const newHistory = [...prevHistory, { key, value, timestamp: Date.now() }];
                return newHistory.slice(-10);
            });

            return newFilters;
        });
    }, []);

    const updateMultipleFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearFilter = useCallback((key) => {
        setFilters(prev => {
            const { [key]: removed, ...rest } = prev;
            return rest;
        });
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters({});
    }, []);

    const getFilterCount = useCallback(() => {
        return Object.keys(filters).filter(key => {
            const value = filters[key];
            return value !== null && value !== undefined && value !== '' &&
                (Array.isArray(value) ? value.length > 0 : true);
        }).length;
    }, [filters]);

    const getFilterQuery = useCallback(() => {
        const query = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                if (Array.isArray(value) && value.length > 0) {
                    query[key] = value.join(',');
                } else if (!Array.isArray(value)) {
                    query[key] = value;
                }
            }
        });

        return query;
    }, [filters]);

    const revertToPrevious = useCallback(() => {
        if (filterHistory.length > 0) {
            const lastChange = filterHistory[filterHistory.length - 1];
            setFilterHistory(prev => prev.slice(0, -1));
            updateFilter(lastChange.key, lastChange.value);
        }
    }, [filterHistory, updateFilter]);

    return {
        filters,
        filterHistory,
        updateFilter,
        updateMultipleFilters,
        clearFilter,
        clearAllFilters,
        getFilterCount,
        getFilterQuery,
        revertToPrevious
    };
};