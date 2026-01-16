import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./components/ErrorBoundary";
import { initializeGA } from "./hooks/useAnalytics";
import { googleAnalyticsMeasurementId } from "./editable-stuff/configurations.json";

// Initialize Google Analytics
if (googleAnalyticsMeasurementId) {
  initializeGA(googleAnalyticsMeasurementId);
}

// React Scripts 4.x compatible render
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// Enable service worker for PWA capabilities
serviceWorker.register();