/**
 * Application constants
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Breakpoints (matching Bootstrap 5)
export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

// Scroll behavior constants
export const SCROLL = {
  NAVBAR_THRESHOLD: 200,
  SMOOTH_OFFSET: 80,
  THROTTLE_DELAY: 16, // ~60fps
};

// API endpoints and limits
export const API = {
  GITHUB_RATE_LIMIT: 60, // requests per hour for unauthenticated
  REQUEST_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Social media platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  EMAIL: 'email',
};

// File size limits
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000,
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'portfolio_theme',
  LANGUAGE: 'portfolio_language',
  USER_PREFERENCES: 'portfolio_preferences',
};

// Theme colors
export const THEME_COLORS = {
  PRIMARY: '#007bff',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'Unable to fetch data. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  DATA_SAVED: 'Data saved successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
};

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Component display names for debugging
export const COMPONENT_NAMES = {
  APP: 'App',
  HOME: 'Home',
  NAVBAR: 'Navbar',
  FOOTER: 'Footer',
  MAIN_BODY: 'MainBody',
  ABOUT_ME: 'AboutMe',
  EXPERIENCE: 'Experience',
  PROJECTS: 'Projects',
  SKILLS: 'Skills',
  INTERESTS: 'Interests',
  LEADERSHIP: 'Leadership',
  RESPONSIBILITIES: 'Responsibilities',
};