import React, { useState, useEffect } from 'react';
import profileImageSrc from '../editable-stuff/asset/images/profile.jpg';

const ProfileImage = ({ className, alt = "Anurag Vaidhya" }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // List of potential image sources to try
    const imageSources = [
      profileImageSrc, // Webpack imported image
      '/editable-stuff/asset/images/profile.jpg',
      './editable-stuff/asset/images/profile.jpg',
      'editable-stuff/asset/images/profile.jpg',
      // Fallback placeholder
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='72' font-weight='bold' fill='white'%3EAV%3C/text%3E%3C/svg%3E"
    ];

    const tryLoadImage = async (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
        
        // Timeout after 3 seconds
        setTimeout(() => reject(new Error('Timeout')), 3000);
      });
    };

    const loadFirstAvailableImage = async () => {
      for (const src of imageSources) {
        try {
          const workingSrc = await tryLoadImage(src);
          setImageSrc(workingSrc);
          setIsLoading(false);
          console.log('Successfully loaded profile image from:', workingSrc);
          return;
        } catch (error) {
          console.log('Failed to load image from:', src);
        }
      }
      
      // If all sources fail, use the last one (SVG fallback)
      setImageSrc(imageSources[imageSources.length - 1]);
      setIsLoading(false);
    };

    loadFirstAvailableImage();
  }, []);

  if (isLoading) {
    return (
      <div className={`${className} profile-loading`} style={{
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%'
      }}>
        <i className="fas fa-spinner fa-spin" style={{ color: '#667eea', fontSize: '2rem' }}></i>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        console.log('Image failed to load, using final fallback');
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='72' font-weight='bold' fill='white'%3EAV%3C/text%3E%3C/svg%3E";
      }}
    />
  );
};

export default ProfileImage;