import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/FloatingContactButton.css';

const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const contactOptions = [
    {
      icon: 'fas fa-envelope',
      label: 'Contact Form',
      link: '/contact',
      isInternal: true
    },
    {
      icon: 'fas fa-paper-plane',
      label: 'Email Me',
      link: 'mailto:anuragvaidhya786@gmail.com',
      isInternal: false
    },
    {
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/anurag-vaidhya-47b93222',
      isInternal: false
    },
    {
      icon: 'fab fa-github',
      label: 'GitHub',
      link: 'https://github.com/anuu1989',
      isInternal: false
    }
  ];

  return (
    <>
      {isVisible && (
        <div className={`floating-contact-container ${isExpanded ? 'expanded' : ''}`}>
          {/* Contact Options */}
          {isExpanded && (
            <div className="floating-contact-options">
              {contactOptions.map((option, index) => (
                <div
                  key={option.label}
                  className="floating-contact-option"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {option.isInternal ? (
                    <Link
                      to={option.link}
                      className="floating-contact-link"
                      onClick={() => setIsExpanded(false)}
                      title={option.label}
                    >
                      <i className={option.icon}></i>
                      <span className="floating-contact-label">{option.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={option.link}
                      className="floating-contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsExpanded(false)}
                      title={option.label}
                    >
                      <i className={option.icon}></i>
                      <span className="floating-contact-label">{option.label}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Main Button */}
          <button
            className={`floating-contact-button ${isExpanded ? 'active' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Contact options"
            title={isExpanded ? 'Close' : 'Get in touch'}
          >
            <i className={isExpanded ? 'fas fa-times' : 'fas fa-comment-dots'}></i>
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingContactButton;
