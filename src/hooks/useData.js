import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../services/dataService';

export const useData = (initialFilters = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({});
    const [filters, setFilters] = useState(initialFilters);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 100,
        total: 0,
        pages: 0
    });

    const fetchData = useCallback(async (customFilters = filters, page = pagination.page) => {
        try {
            setLoading(true);
            setError(null);

            const response = await dataService.getData(customFilters, page, pagination.limit);

            setData(response.data || []);
            setPagination(response.pagination || {
                page,
                limit: pagination.limit,
                total: response.total || 0,
                pages: Math.ceil((response.total || 0) / pagination.limit)
            });

            return response;
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
            console.error('Error fetching data:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.page, pagination.limit]);

    const fetchStats = useCallback(async (customFilters = filters) => {
        try {
            setLoading(true);
            const response = await dataService.getStats(customFilters);
            setStats(response.stats || {});
            return response.stats;
        } catch (err) {
            setError(err.message || 'Failed to fetch stats');
            console.error('Error fetching stats:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const fetchVisualizationData = useCallback(async (type, customFilters = filters) => {
        try {
            setLoading(true);
            const response = await dataService.getVisualizationData(type, customFilters);
            return response.data || [];
        } catch (err) {
            setError(err.message || `Failed to fetch ${type} data`);
            console.error(`Error fetching ${type} data:`, err);
            return [];
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    const changePage = useCallback((page) => {
        setPagination(prev => ({ ...prev, page }));
        fetchData(filters, page);
    }, [filters, fetchData]);

    const changeLimit = useCallback((limit) => {
        setPagination(prev => ({ ...prev, limit, page: 1 }));
        fetchData(filters, 1);
    }, [filters, fetchData]);

    // Auto-fetch data when filters change
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        data,
        loading,
        error,
        stats,
        filters,
        pagination,
        fetchData,
        fetchStats,
        fetchVisualizationData,
        updateFilters,
        clearFilters,
        changePage,
        changeLimit
    };
};