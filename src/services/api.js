/**
 * Modern API service layer with caching, retry logic, and error handling
 */

import { API, ERROR_MESSAGES } from '../utils/constants';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

class APIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL || '';
    this.cache = new Map();
    this.requestQueue = new Map();
    this.retryAttempts = API.RETRY_ATTEMPTS;
    this.timeout = API.REQUEST_TIMEOUT;
  }

  /**
   * Create request configuration with modern options
   */
  createRequestConfig(options = {}) {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
      ...options,
    };

    // Add authentication if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  /**
   * Enhanced fetch with retry logic and caching
   */
  async fetchWithRetry(url, options = {}, attempt = 1) {
    try {
      const response = await fetch(url, this.createRequestConfig(options));
      
      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          await response.text()
        );
      }

      return response;
    } catch (error) {
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        console.warn(`Request failed, retrying (${attempt}/${this.retryAttempts}):`, error.message);
        await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Determine if request should be retried
   */
  shouldRetry(error) {
    if (error.name === 'AbortError') return false;
    if (error.status >= 400 && error.status < 500) return false; // Client errors
    return true;
  }

  /**
   * Delay utility for retry logic
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate cache key for requests
   */
  getCacheKey(url, options = {}) {
    const method = options.method || 'GET';
    const body = options.body || '';
    return `${method}:${url}:${body}`;
  }

  /**
   * Get data with caching support
   */
  async get(url, options = {}) {
    const { cache = true, cacheTime = 5 * 60 * 1000 } = options; // 5 minutes default
    const cacheKey = this.getCacheKey(url, options);

    // Check cache first
    if (cache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < cacheTime) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    // Prevent duplicate requests
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey);
    }

    const requestPromise = this.fetchWithRetry(url, { ...options, method: 'GET' })
      .then(response => response.json())
      .then(data => {
        // Cache successful responses
        if (cache) {
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
          });
        }
        return data;
      })
      .finally(() => {
        this.requestQueue.delete(cacheKey);
      });

    this.requestQueue.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * POST request with optimistic updates
   */
  async post(url, data, options = {}) {
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  /**
   * PUT request
   */
  async put(url, data, options = {}) {
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  /**
   * DELETE request
   */
  async delete(url, options = {}) {
    const response = await this.fetchWithRetry(url, {
      ...options,
      method: 'DELETE',
    });
    return response.ok;
  }

  /**
   * Clear cache
   */
  clearCache(pattern) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// GitHub API specific methods
export class GitHubAPI extends APIService {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com';
  }

  async getUser(username) {
    try {
      return await this.get(`${this.baseURL}/users/${username}`, {
        cache: true,
        cacheTime: 10 * 60 * 1000, // 10 minutes
      });
    } catch (error) {
      throw new APIError(ERROR_MESSAGES.API_ERROR, error.status, error);
    }
  }

  async getUserRepos(username, options = {}) {
    const { sort = 'updated', direction = 'desc', per_page = 30 } = options;
    
    try {
      return await this.get(
        `${this.baseURL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${per_page}`,
        {
          cache: true,
          cacheTime: 5 * 60 * 1000, // 5 minutes
        }
      );
    } catch (error) {
      throw new APIError(ERROR_MESSAGES.API_ERROR, error.status, error);
    }
  }

  async getRepoLanguages(username, repo) {
    try {
      return await this.get(`${this.baseURL}/repos/${username}/${repo}/languages`, {
        cache: true,
        cacheTime: 30 * 60 * 1000, // 30 minutes
      });
    } catch (error) {
      throw new APIError(ERROR_MESSAGES.API_ERROR, error.status, error);
    }
  }

  async getRepoContributors(username, repo) {
    try {
      return await this.get(`${this.baseURL}/repos/${username}/${repo}/contributors`, {
        cache: true,
        cacheTime: 15 * 60 * 1000, // 15 minutes
      });
    } catch (error) {
      throw new APIError(ERROR_MESSAGES.API_ERROR, error.status, error);
    }
  }
}

// Contact form API
export class ContactAPI extends APIService {
  async sendMessage(formData) {
    try {
      // This would typically go to your backend
      const response = await this.post('/api/contact', formData);
      return response;
    } catch (error) {
      throw new APIError('Failed to send message', error.status, error);
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await this.post('/api/newsletter/subscribe', { email });
      return response;
    } catch (error) {
      throw new APIError('Failed to subscribe to newsletter', error.status, error);
    }
  }
}

// Analytics API
export class AnalyticsAPI extends APIService {
  async trackEvent(eventName, properties = {}) {
    try {
      // This would typically go to your analytics service
      const response = await this.post('/api/analytics/track', {
        event: eventName,
        properties: {
          ...properties,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        },
      });
      return response;
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
      // Don't throw for analytics failures
    }
  }

  async trackPageView(page) {
    return this.trackEvent('page_view', { page });
  }

  async trackUserInteraction(action, element) {
    return this.trackEvent('user_interaction', { action, element });
  }
}

// Create singleton instances
export const api = new APIService();
export const githubAPI = new GitHubAPI();
export const contactAPI = new ContactAPI();
export const analyticsAPI = new AnalyticsAPI();

export default api;