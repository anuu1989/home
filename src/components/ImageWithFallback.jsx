import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackText, 
  className = '', 
  width = 400, 
  height = 250,
  backgroundColor = '#667eea',
  textColor = 'white'
}) => {
  const [hasError, setHasError] = useState(false);

  const createFallbackSVG = () => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
        <rect width='${width}' height='${height}' fill='${backgroundColor}'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' 
              font-family='Arial, sans-serif' font-size='${Math.min(width, height) / 10}' 
              font-weight='bold' fill='${textColor}'>
          ${fallbackText || alt || 'Image'}
        </text>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  };

  const handleError = (e) => {
    console.log('Image failed to load:', src);
    setHasError(true);
  };

  return (
    <img
      src={hasError ? createFallbackSVG() : src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;