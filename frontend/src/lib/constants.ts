/**
 * Application-wide constants and configuration
 */

// App info
export const APP_NAME = 'HireMind';
export const APP_VERSION = '0.1.0';
export const APP_DESCRIPTION = 'AI-Powered Job Matching Platform';

// API endpoints
export const API_ENDPOINTS = {
    RESUME_PARSER: process.env.NEXT_PUBLIC_RESUME_MATCHER_URL || 'http://localhost:8000',
    HEALTH: '/health',
    PARSE_RESUME: '/api/parser',
} as const;

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
} as const;

// Resume score thresholds
export const SCORE_THRESHOLDS = {
    EXCELLENT: 80,
    GOOD: 60,
    FAIR: 40,
    POOR: 0,
} as const;

// Job types
export const JOB_TYPES = [
    'full-time',
    'part-time',
    'contract',
    'internship',
] as const;

// Application status
export const APPLICATION_STATUS = [
    'applied',
    'interview',
    'offer',
    'rejected',
] as const;

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'hiremind_theme',
    RECENT_SEARCHES: 'hiremind_recent_searches',
    SAVED_FILTERS: 'hiremind_saved_filters',
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280,
} as const;

// Animation durations (in ms)
export const ANIMATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;
