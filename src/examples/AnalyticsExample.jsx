import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * Example component showing how to use Google Analytics tracking
 * This is for reference only - you can delete this file
 */
const AnalyticsExample = () => {
  const { trackEvent, trackInteraction, trackConversion } = useAnalytics();

  // Example 1: Track button click
  const handleDownloadResume = () => {
    trackEvent('download_resume', {
      category: 'Downloads',
      label: 'Resume PDF',
      value: 1
    });
    // Your download logic here
  };

  // Example 2: Track social media click
  const handleSocialClick = (platform) => {
    trackEvent('social_click', {
      category: 'Social Media',
      label: platform,
    });
    // Your navigation logic here
  };

  // Example 3: Track form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', {
      category: 'Forms',
      label: 'Contact Form',
    });
    // Your form submission logic here
  };

  // Example 4: Track interaction
  const handleProjectView = (projectName) => {
    trackInteraction('project_card', 'view', {
      projectName,
    });
  };

  // Example 5: Track conversion/goal
  const handleHireMe = () => {
    trackConversion('hire_inquiry', 1, {
      source: 'contact_page',
    });
  };

  return (
    <div className="analytics-example">
      <h2>Analytics Tracking Examples</h2>
      
      <div className="example-section">
        <h3>1. Track Downloads</h3>
        <button onClick={handleDownloadResume}>
          Download Resume
        </button>
      </div>

      <div className="example-section">
        <h3>2. Track Social Media Clicks</h3>
        <button onClick={() => handleSocialClick('LinkedIn')}>
          LinkedIn
        </button>
        <button onClick={() => handleSocialClick('GitHub')}>
          GitHub
        </button>
      </div>

      <div className="example-section">
        <h3>3. Track Form Submissions</h3>
        <form onSubmit={handleContactSubmit}>
          <input type="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="example-section">
        <h3>4. Track Project Views</h3>
        <div onClick={() => handleProjectView('Portfolio Website')}>
          Project Card
        </div>
      </div>

      <div className="example-section">
        <h3>5. Track Conversions</h3>
        <button onClick={handleHireMe}>
          Hire Me
        </button>
      </div>
    </div>
  );
};

export default AnalyticsExample;
