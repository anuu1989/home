import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="spinner-container">
    <div className="spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-text">{text}</div>
    </div>
  </div>
);

export default LoadingSpinner;
