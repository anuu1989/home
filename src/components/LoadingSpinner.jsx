import React from "react";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  return (
    <div className="modern-loading-container">
      <div className="modern-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-text">{text}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;