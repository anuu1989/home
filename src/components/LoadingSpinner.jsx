import React from "react";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  return (
    <div className="modern-loading-container">
      <div className="modern-spinner">
        <div className="spinner-logo-wrapper">
          <img 
            src="/logo_av_navbar.svg" 
            alt="Loading" 
            className="spinner-logo"
          />
          <div className="spinner-ring-outer"></div>
        </div>
        <div className="spinner-text">{text}</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
