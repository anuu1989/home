import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS, THEME_COLORS } from '../utils/constants';

// Initial state
const initialState = {
  theme: 'light',
  language: 'en',
  isLoading: false,
  user: null,
  preferences: {
    animations: true,
    notifications: true,
    autoSave: true,
  },
  ui: {
    sidebarOpen: false,
    modalOpen: false,
    activeSection: 'home',
  },
  data: {
    projects: [],
    skills: [],
    experiences: [],
  },
  errors: [],
};

// Action types
export const ActionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  UPDATE_UI: 'UPDATE_UI',
  SET_DATA: 'SET_DATA',
  ADD_ERROR: 'ADD_ERROR',
  REMOVE_ERROR: 'REMOVE_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_STATE: 'RESET_STATE',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };

    case ActionTypes.UPDATE_UI:
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload,
        },
      };

    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.type]: action.payload.data,
        },
      };

    case ActionTypes.ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, { id: Date.now(), ...action.payload }],
      };

    case ActionTypes.REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.payload),
      };

    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };

    case ActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    const savedPreferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);

    if (savedTheme) {
      dispatch({ type: ActionTypes.SET_THEME, payload: savedTheme });
    }

    if (savedLanguage) {
      dispatch({ type: ActionTypes.SET_LANGUAGE, payload: savedLanguage });
    }

    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: ActionTypes.UPDATE_PREFERENCES, payload: preferences });
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language);
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.style.setProperty('--primary-color', THEME_COLORS.PRIMARY);
  }, [state.theme]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hooks for using context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};

// Combined hook for convenience
export const useApp = () => {
  return {
    state: useAppState(),
    dispatch: useAppDispatch(),
  };
};