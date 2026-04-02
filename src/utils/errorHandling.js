/**
 * Error Handling Utilities
 * Centralized error handling, logging, and user feedback
 */

import { ERROR_MESSAGES } from '../config/app.config'

/**
 * Parse error and return user-friendly message
 * @param {Error|string} error - The error object or message
 * @param {string} context - Context for logging (e.g., 'API_CALL', 'IMAGE_PROCESSING')
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error, context = 'UNKNOWN') => {
  if (!error) return ERROR_MESSAGES.GENERIC

  const message = error.message || error.toString()

  // Network errors
  if (message.includes('fetch') || message.includes('network')) {
    return ERROR_MESSAGES.NETWORK
  }

  // Timeout errors
  if (message.includes('timeout') || message.includes('Timeout')) {
    return ERROR_MESSAGES.TIMEOUT
  }

  // Validation errors
  if (message.includes('Invalid') || message.includes('invalid')) {
    return ERROR_MESSAGES.INVALID_INPUT
  }

  // Unauthorized
  if (message.includes('401') || message.includes('Unauthorized')) {
    return ERROR_MESSAGES.UNAUTHORIZED
  }

  // Not found
  if (message.includes('404') || message.includes('not found')) {
    return ERROR_MESSAGES.NOT_FOUND
  }

  // Server errors
  if (message.includes('500') || message.includes('server')) {
    return ERROR_MESSAGES.SERVER_ERROR
  }

  // Log dev-friendly message
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error)
  }

  return message || ERROR_MESSAGES.GENERIC
}

/**
 * Safe async wrapper for error handling
 * @param {Function} asyncFn - Async function to execute
 * @param {Function} onError - Error callback
 * @returns {Function} Wrapped function
 */
export const withErrorHandling = (asyncFn, onError = console.error) => {
  return async (...args) => {
    try {
      return await asyncFn(...args)
    } catch (error) {
      const message = getErrorMessage(error, asyncFn.name)
      onError(message, error)
      throw error
    }
  }
}

/**
 * Retry logic with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delayMs - Initial delay in ms
 * @returns {Function} Wrapped function with retry logic
 */
export const withRetry = (fn, maxRetries = 3, delayMs = 1000) => {
  return async (...args) => {
    let lastError
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error
        if (i < maxRetries - 1) {
          const delay = delayMs * Math.pow(2, i)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }
    throw lastError
  }
}

/**
 * Safe fetch with timeout
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {number} timeout - Timeout in ms
 * @returns {Promise} Fetch response
 */
export const fetchWithTimeout = async (url, options = {}, timeout = 12000) => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  } finally {
    clearTimeout(id)
  }
}

/**
 * Safe JSON parsing with fallback
 * @param {string} jsonString - JSON string to parse
 * @param {any} fallback - Fallback value if parsing fails
 * @returns {any} Parsed object or fallback
 */
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('JSON parse error:', error)
    return fallback
  }
}

/**
 * Safe function execution
 * @param {Function} fn - Function to execute
 * @param {any} fallback - Fallback return value
 * @returns {any} Function result or fallback
 */
export const safeExecute = (fn, fallback = null) => {
  try {
    return fn()
  } catch (error) {
    console.error('Execution error:', error)
    return fallback
  }
}

export default {
  getErrorMessage,
  withErrorHandling,
  withRetry,
  fetchWithTimeout,
  safeJsonParse,
  safeExecute,
}
