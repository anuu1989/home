/**
 * Modern testing utilities for React components
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AppProvider } from '../context/AppContext';

/**
 * Custom render function with providers
 */
export const renderWithProviders = (
  ui,
  {
    initialEntries = ['/'],
    theme = 'light',
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Mock intersection observer for testing
 */
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  window.IntersectionObserverEntry = jest.fn();
};

/**
 * Mock resize observer for testing
 */
export const mockResizeObserver = () => {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
};

/**
 * Mock matchMedia for testing
 */
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

/**
 * Mock localStorage for testing
 */
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
  return localStorageMock;
};

/**
 * Mock fetch for API testing
 */
export const mockFetch = (response = {}, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      status: ok ? 200 : 400,
      statusText: ok ? 'OK' : 'Bad Request',
    })
  );
};

/**
 * Wait for element to appear
 */
export const waitForElement = async (selector, options = {}) => {
  return waitFor(() => {
    const element = screen.getByTestId(selector) || screen.getByRole(selector) || screen.getByText(selector);
    expect(element).toBeInTheDocument();
    return element;
  }, options);
};

/**
 * Simulate user typing
 */
export const typeInInput = async (input, text) => {
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: text } });
  fireEvent.blur(input);
};

/**
 * Simulate form submission
 */
export const submitForm = async (form) => {
  fireEvent.submit(form);
  await waitFor(() => {
    // Wait for any async operations to complete
  });
};

/**
 * Test accessibility
 */
export const testAccessibility = async (component) => {
  const { container } = renderWithProviders(component);
  
  // Check for basic accessibility attributes
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    expect(button).toHaveAttribute('type');
  });

  const inputs = container.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.type !== 'hidden') {
      expect(input).toHaveAttribute('id');
      expect(input).toHaveAttribute('name');
    }
  });

  const images = container.querySelectorAll('img');
  images.forEach(img => {
    expect(img).toHaveAttribute('alt');
  });

  return container;
};

/**
 * Test responsive behavior
 */
export const testResponsive = (component, breakpoints = [320, 768, 1024, 1440]) => {
  const results = {};

  breakpoints.forEach(width => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });

    // Trigger resize event
    fireEvent(window, new Event('resize'));

    const { container } = renderWithProviders(component);
    results[width] = container;
  });

  return results;
};

/**
 * Performance testing helper
 */
export const measurePerformance = async (testFunction) => {
  const startTime = performance.now();
  await testFunction();
  const endTime = performance.now();
  return endTime - startTime;
};

/**
 * Mock performance API
 */
export const mockPerformance = () => {
  const mockPerformance = {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
    memory: {
      usedJSHeapSize: 1000000,
      totalJSHeapSize: 2000000,
      jsHeapSizeLimit: 4000000,
    },
  };

  Object.defineProperty(window, 'performance', {
    value: mockPerformance,
  });

  return mockPerformance;
};

/**
 * Create mock component for testing
 */
export const createMockComponent = (name, props = {}) => {
  const MockComponent = (componentProps) => (
    <div data-testid={`mock-${name.toLowerCase()}`} {...componentProps}>
      Mock {name}
    </div>
  );
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

/**
 * Test error boundaries
 */
export const testErrorBoundary = (ErrorBoundary, ThrowError) => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  const { getByText } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(getByText(/something went wrong/i)).toBeInTheDocument();
  consoleSpy.mockRestore();
};

/**
 * Mock service worker for PWA testing
 */
export const mockServiceWorker = () => {
  const mockRegistration = {
    installing: null,
    waiting: null,
    active: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    update: jest.fn(() => Promise.resolve()),
  };

  Object.defineProperty(navigator, 'serviceWorker', {
    value: {
      register: jest.fn(() => Promise.resolve(mockRegistration)),
      ready: Promise.resolve(mockRegistration),
      controller: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  });

  return mockRegistration;
};

/**
 * Custom matchers for better testing
 */
export const customMatchers = {
  toBeVisible: (element) => {
    const pass = element.offsetWidth > 0 && element.offsetHeight > 0;
    return {
      message: () => `expected element to ${pass ? 'not ' : ''}be visible`,
      pass,
    };
  },

  toHaveLoadedImage: (img) => {
    const pass = img.complete && img.naturalHeight !== 0;
    return {
      message: () => `expected image to ${pass ? 'not ' : ''}have loaded`,
      pass,
    };
  },

  toBeAccessible: (element) => {
    const hasAriaLabel = element.hasAttribute('aria-label');
    const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
    const hasTitle = element.hasAttribute('title');
    const hasAltText = element.hasAttribute('alt');
    
    const pass = hasAriaLabel || hasAriaLabelledBy || hasTitle || hasAltText;
    
    return {
      message: () => `expected element to ${pass ? 'not ' : ''}be accessible`,
      pass,
    };
  },
};

// Export all utilities
export * from '@testing-library/react';
export { renderWithProviders as render };