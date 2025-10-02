import React from "react";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "spinner-border-sm",
    md: "",
    lg: "spinner-border-lg"
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div 
        className={`spinner-border text-primary ${sizeClasses[size]}`} 
        role="status"
        aria-label="Loading"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <p className="mt-3 text-muted" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;