import ReactGA from "react-ga4";

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
    console.log("Google Analytics initialized");
  } else {
    console.warn("Google Analytics Measurement ID not provided");
  }
};

// Track page views
export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track custom events
export const logEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  logEvent("Button", "Click", buttonName);
};

// Track section views
export const trackSectionView = (sectionName) => {
  logEvent("Section", "View", sectionName);
};

// Track external link clicks
export const trackExternalLink = (url) => {
  logEvent("External Link", "Click", url);
};

// Track downloads
export const trackDownload = (fileName) => {
  logEvent("Download", "File", fileName);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  logEvent("Social Media", "Click", platform);
};

// Track contact form submissions
export const trackFormSubmission = (formName) => {
  logEvent("Form", "Submit", formName);
};

// Track errors
export const trackError = (errorMessage) => {
  logEvent("Error", "Exception", errorMessage);
};
