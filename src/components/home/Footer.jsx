import React, { useState, useEffect, useRef } from "react";
import useVisitorCounter from "../../hooks/useVisitorCounter";

const Footer = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const footerRef = useRef(null);
  const { visitorCount, isLoading } = useVisitorCounter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateContent(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/anuu1989",
      icon: "fab fa-github",
      color: "#333"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/anuragvaidhya",
      icon: "fab fa-linkedin",
      color: "#0077b5"
    },
    {
      name: "Email",
      url: "mailto:anuragvaidhya786@gmail.com",
      icon: "fas fa-envelope",
      color: "#ea4335"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/anuragvaidhya",
      icon: "fab fa-twitter",
      color: "#1da1f2"
    }
  ];

  return (
    <footer id="contact" className="modern-footer" ref={footerRef}>
      <div className="footer-container">
        {/* Compact Contact Section */}
        <div className={`footer-contact-compact ${animateContent ? 'animate' : ''}`}>
          <div className="contact-info">
            <a href="mailto:anuragvaidhya786@gmail.com" className="email-link">
              <i className="fas fa-envelope"></i>
              <span>anuragvaidhya786@gmail.com</span>
            </a>
            <div className="social-links-compact">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-compact"
                  aria-label={`Connect with me on ${social.name}`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`footer-bottom ${animateContent ? 'animate' : ''}`}>
          <div className="footer-divider"></div>
          
          <div className="footer-info">
            <div className="footer-left">
              <div className="footer-brand">
                <span className="brand-name">Anurag Vaidhya</span>
                <span className="brand-title">Senior Engineering Leader</span>
              </div>
              <div className="footer-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>Melbourne, Australia</span>
              </div>
            </div>
            
            <div className="footer-right">
              <div className="footer-stats">
                <div className="visitor-counter" title={`Thank you for visiting! You are visitor #${visitorCount}`}>
                  <i className="fas fa-users"></i>
                  <span className="counter-label">Visitors:</span>
                  <span className="counter-number">
                    {isLoading ? (
                      <span className="counter-loading">
                        <i className="fas fa-spinner fa-spin"></i>
                      </span>
                    ) : (
                      <>
                        <span className="count-value">{visitorCount}</span>
                        {!isLoading && (
                          <span className="counter-animation">
                            <i className="fas fa-heart counter-heart"></i>
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="footer-tech">
                <span className="tech-label">Crafted with</span>
                <div className="tech-stack">
                  <div className="tech-item">
                    <i className="fas fa-heart"></i>
                    <span>Passion</span>
                  </div>
                  <div className="tech-item">
                    <i className="fab fa-react"></i>
                    <span>React</span>
                  </div>
                  <div className="tech-item">
                    <i className="fas fa-magic"></i>
                    <span>Kiro AI</span>
                  </div>
                </div>
              </div>
              
              <div className="footer-copyright">
                <span>© {new Date().getFullYear()} Anurag Vaidhya. All rights reserved.</span>
                <span className="version-badge">v2.1.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;