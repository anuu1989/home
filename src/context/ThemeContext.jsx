import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Theme configurations
const themes = {
  light: {
    name: 'Light',
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      textSecondary: '#6c757d',
      border: '#dee2e6',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#0d6efd',
      secondary: '#6c757d',
      success: '#198754',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#0dcaf0',
      light: '#f8f9fa',
      dark: '#212529',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      textSecondary: '#adb5bd',
      border: '#495057',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    },
  },
  auto: {
    name: 'Auto',
    // Auto theme will switch between light and dark based on system preference
  },
};

// Initial state
const initialState = {
  currentTheme: 'light',
  systemTheme: 'light',
  themes,
  customTheme: null,
  animations: true,
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  colorBlindMode: 'none',
};

// Action types
const ActionTypes = {
  SET_THEME: 'SET_THEME',
  SET_SYSTEM_THEME: 'SET_SYSTEM_THEME',
  SET_CUSTOM_THEME: 'SET_CUSTOM_THEME',
  TOGGLE_ANIMATIONS: 'TOGGLE_ANIMATIONS',
  SET_REDUCED_MOTION: 'SET_REDUCED_MOTION',
  SET_HIGH_CONTRAST: 'SET_HIGH_CONTRAST',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  SET_COLOR_BLIND_MODE: 'SET_COLOR_BLIND_MODE',
  RESET_THEME: 'RESET_THEME',
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return { ...state, currentTheme: action.payload };
    
    case ActionTypes.SET_SYSTEM_THEME:
      return { ...state, systemTheme: action.payload };
    
    case ActionTypes.SET_CUSTOM_THEME:
      return { ...state, customTheme: action.payload };
    
    case ActionTypes.TOGGLE_ANIMATIONS:
      return { ...state, animations: !state.animations };
    
    case ActionTypes.SET_REDUCED_MOTION:
      return { ...state, reducedMotion: action.payload };
    
    case ActionTypes.SET_HIGH_CONTRAST:
      return { ...state, highContrast: action.payload };
    
    case ActionTypes.SET_FONT_SIZE:
      return { ...state, fontSize: action.payload };
    
    case ActionTypes.SET_COLOR_BLIND_MODE:
      return { ...state, colorBlindMode: action.payload };
    
    case ActionTypes.RESET_THEME:
      return initialState;
    
    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const [savedTheme, setSavedTheme] = useLocalStorage('theme-preferences', {
    currentTheme: 'light',
    animations: true,
    fontSize: 'medium',
    colorBlindMode: 'none',
  });

  // Get the active theme (considering auto mode)
  const getActiveTheme = useCallback(() => {
    if (state.currentTheme === 'auto') {
      return state.systemTheme;
    }
    return state.currentTheme;
  }, [state.currentTheme, state.systemTheme]);

  const activeTheme = getActiveTheme();
  const themeConfig = state.customTheme || themes[activeTheme] || themes.light;

  // Apply theme to CSS custom properties
  const applyTheme = useCallback((theme) => {
    const root = document.documentElement;
    
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }

    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }

    if (theme.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
    }

    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
      });
    }

    if (theme.gradients) {
      Object.entries(theme.gradients).forEach(([key, value]) => {
        root.style.setProperty(`--gradient-${key}`, value);
      });
    }

    // Apply theme class to body
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .concat(` theme-${activeTheme}`);

    // Apply accessibility settings
    root.style.setProperty('--animations-enabled', state.animations ? '1' : '0');
    root.style.setProperty('--font-size-scale', getFontSizeScale(state.fontSize));
    
    if (state.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (state.colorBlindMode !== 'none') {
      document.body.classList.add(`color-blind-${state.colorBlindMode}`);
    } else {
      document.body.className = document.body.className.replace(/color-blind-\w+/g, '');
    }
  }, [activeTheme, state.animations, state.fontSize, state.highContrast, state.colorBlindMode]);

  // Get font size scale
  const getFontSizeScale = (size) => {
    const scales = {
      small: '0.875',
      medium: '1',
      large: '1.125',
      'extra-large': '1.25',
    };
    return scales[size] || '1';
  };

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      dispatch({
        type: ActionTypes.SET_SYSTEM_THEME,
        payload: e.matches ? 'dark' : 'light',
      });
    };

    // Set initial system theme
    dispatch({
      type: ActionTypes.SET_SYSTEM_THEME,
      payload: mediaQuery.matches ? 'dark' : 'light',
    });

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      dispatch({
        type: ActionTypes.SET_REDUCED_MOTION,
        payload: e.matches,
      });
    };

    dispatch({
      type: ActionTypes.SET_REDUCED_MOTION,
      payload: mediaQuery.matches,
    });

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load saved theme preferences (only on mount)
  useEffect(() => {
    if (savedTheme) {
      dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme.currentTheme });
      dispatch({ type: ActionTypes.TOGGLE_ANIMATIONS, payload: savedTheme.animations });
      dispatch({ type: ActionTypes.SET_FONT_SIZE, payload: savedTheme.fontSize });
      dispatch({ type: ActionTypes.SET_COLOR_BLIND_MODE, payload: savedTheme.colorBlindMode });
    }
  }, []); // Only run on mount to avoid infinite loop

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(themeConfig);
  }, [applyTheme, themeConfig]);

  // Save theme preferences
  useEffect(() => {
    setSavedTheme({
      currentTheme: state.currentTheme,
      animations: state.animations,
      fontSize: state.fontSize,
      colorBlindMode: state.colorBlindMode,
    });
  }, [state.currentTheme, state.animations, state.fontSize, state.colorBlindMode]); // setSavedTheme removed to prevent infinite loop

  // Theme actions
  const setTheme = useCallback((theme) => {
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [activeTheme, setTheme]);

  const setCustomTheme = useCallback((customTheme) => {
    dispatch({ type: ActionTypes.SET_CUSTOM_THEME, payload: customTheme });
  }, []);

  const toggleAnimations = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_ANIMATIONS });
  }, []);

  const setFontSize = useCallback((size) => {
    dispatch({ type: ActionTypes.SET_FONT_SIZE, payload: size });
  }, []);

  const setColorBlindMode = useCallback((mode) => {
    dispatch({ type: ActionTypes.SET_COLOR_BLIND_MODE, payload: mode });
  }, []);

  const toggleHighContrast = useCallback(() => {
    dispatch({ type: ActionTypes.SET_HIGH_CONTRAST, payload: !state.highContrast });
  }, [state.highContrast]);

  const resetTheme = useCallback(() => {
    dispatch({ type: ActionTypes.RESET_THEME });
  }, []);

  // Get theme utilities
  const getThemeValue = useCallback((path) => {
    const keys = path.split('.');
    let value = themeConfig;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    
    return value;
  }, [themeConfig]);

  const contextValue = {
    // State
    ...state,
    activeTheme,
    themeConfig,
    
    // Actions
    setTheme,
    toggleTheme,
    setCustomTheme,
    toggleAnimations,
    setFontSize,
    setColorBlindMode,
    toggleHighContrast,
    resetTheme,
    
    // Utilities
    getThemeValue,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// HOC for theme-aware components
export const withTheme = (Component) => {
  return function ThemedComponent(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};