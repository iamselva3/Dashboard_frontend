export const CHART_COLORS = {
    primary: '#3b82f6',
    secondary: '#10b981',
    tertiary: '#8b5cf6',
    quaternary: '#f59e0b',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
    dark: '#1f2937',
    light: '#f3f4f6'
};

export const CHART_COLOR_SCHEMES = {
    default: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'],
    pastel: ['#93c5fd', '#86efac', '#c4b5fd', '#fcd34d', '#fca5a5', '#67e8f9'],
    vibrant: ['#2563eb', '#059669', '#7c3aed', '#d97706', '#dc2626', '#0891b2'],
    sequential: ['#dbeafe', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8', '#1e40af']
};

export const FILTER_OPTIONS = {
    years: Array.from({ length: 25 }, (_, i) => 2000 + i),
    intensityRange: [0, 100],
    likelihoodRange: [0, 100],
    relevanceRange: [0, 100],
    regions: [
        'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania', 'Middle East'
    ],
    pestleOptions: [
        'Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'
    ],
    swotOptions: ['strength', 'weakness', 'opportunity', 'threat'],
    sourceOptions: [
        'News Article', 'Research Paper', 'Government Report', 'Industry Analysis',
        'Academic Journal', 'Market Research', 'Financial Report', 'Social Media'
    ]
};

export const DASHBOARD_CONSTANTS = {
    defaultPageSize: 100,
    maxPageSize: 1000,
    chartHeight: 400,
    refreshInterval: 30000, // 30 seconds
    exportFormats: ['csv', 'json', 'excel'],
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss'
};

export const API_ENDPOINTS = {
    data: '/data',
    stats: '/data/stats',
    filters: '/data/filters',
    visualization: '/data/visualization',
    export: '/data/export'
};

export const ERROR_MESSAGES = {
    network: 'Network error. Please check your connection.',
    server: 'Server error. Please try again later.',
    notFound: 'Data not found.',
    unauthorized: 'Please login to access this feature.',
    timeout: 'Request timeout. Please try again.'
};

export const SUCCESS_MESSAGES = {
    dataLoaded: 'Data loaded successfully.',
    filterApplied: 'Filter applied successfully.',
    exportStarted: 'Export started. You will be notified when ready.',
    saveSuccess: 'Configuration saved successfully.'
};