/**
 * Centralized Application Configuration
 * Eliminates hardcoded values scattered across codebase
 * Single source of truth for environment, timeouts, API endpoints
 */

// ========================================
// ENVIRONMENT & SITE CONFIGURATION
// ========================================
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.pixtool.in'
export const SITE_NAME = 'PixTool'
export const SITE_DESCRIPTION = 'Free online AI, image, PDF, math, and productivity tools that run in your browser with privacy-first processing.'
export const TWITTER_HANDLE = '@pixtool_in'

// ========================================
// API ENDPOINTS & TIMEOUTS
// ========================================
export const API_TIMEOUTS = {
  DEFAULT: 12000,
  AI_GENERATION: 30000,
  IMAGE_PROCESSING: 15000,
  PDF_OPERATIONS: 20000,
  TEMP_MAIL: 12000,
  FETCH: 12000,
}

export const API_ENDPOINTS = {
  TEMPMAIL: 'https://api.mail.tm',
  TEMPMAIL_ACCOUNTS: 'https://api.mail.tm/accounts',
  TEMPMAIL_MESSAGES: 'https://api.mail.tm/messages',
  TEMPMAIL_DOMAINS: 'https://api.mail.tm/domains',
}

// ========================================
// LOGGING & ERROR HANDLING
// ========================================
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  INVALID_INPUT: 'Invalid input provided.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access.',
  NOT_FOUND: 'Resource not found.',
  GENERIC: 'An error occurred. Please try again.',
}

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // ms
  BACKOFF_MULTIPLIER: 2,
}

// ========================================
// FEATURE FLAGS
// ========================================
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_SERVICE_WORKER: import.meta.env.PROD,
  DEBUG_MODE: import.meta.env.DEV,
}

// ========================================
// PAGINATION & LIMITS
// ========================================
export const PAGINATION = {
  BLOG_POSTS_PER_PAGE: 12,
  TOOLS_PER_PAGE: 20,
  SEARCH_RESULTS_LIMIT: 50,
}

// ========================================
// STORAGE KEYS
// ========================================
export const STORAGE_KEYS = {
  THEME: 'pixtool_theme',
  USER_PREFERENCES: 'pixtool_prefs',
  RECENT_TOOLS: 'pixtool_recent',
  NOTIFICATIONS: 'pixtool_notifications',
  TEMP_MAIL_INBOX: 'pixtool_temp_mail_inbox',
}

// ========================================
// UTILITY HELPERS
// ========================================
export const getTimeout = (operation = 'DEFAULT') => {
  return API_TIMEOUTS[operation] || API_TIMEOUTS.DEFAULT
}

export const getApiUrl = (service) => {
  return API_ENDPOINTS[service] || null
}

export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD
export const isTest = import.meta.env.MODE === 'test'

export default {
  SITE_URL,
  SITE_NAME,
  API_TIMEOUTS,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  RETRY_CONFIG,
  FEATURES,
  PAGINATION,
  STORAGE_KEYS,
  getTimeout,
  getApiUrl,
  isDevelopment,
  isProduction,
  isTest,
}
