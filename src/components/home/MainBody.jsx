import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import {
  FirstName,
  LastName,
  MiddleName,
  devDesc,
  icons,
} from "../../editable-stuff/configurations.json";

const MainBody = () => {
  const [hoverstatus, setHoverstatus] = useState(
    new Array(icons.length).fill("socialicons")
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleHover = (data) => {
    const newhoverStatus = [...hoverstatus];

    if (data.event === "enter") {
      newhoverStatus[data.icon.id] = "socialiconshover";
      return setHoverstatus(newhoverStatus);
    } else if (data.event === "leave") {
      newhoverStatus[data.icon.id] = "socialicons";
      return setHoverstatus(newhoverStatus);
    }
  };

  return (
    <div className="modern-hero">
      <div className="container">
        <div className={`modern-hero-content ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="hero-badge mb-4">
            <span className="glass-effect px-4 py-2 rounded-pill text-white">
              <i className="fas fa-rocket me-2"></i>
              Welcome to my portfolio
            </span>
          </div>

          <div className="hero-logo mb-4" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute',
              inset: '-12px',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
              borderRadius: '36px',
              filter: 'blur(15px)',
              animation: 'pulse 3s ease-in-out infinite'
            }}></div>
            <img 
              src="/logo_av.svg" 
              alt="Anurag Vaidhya Logo" 
              style={{ 
                width: '110px', 
                height: '110px', 
                borderRadius: '24px',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
              }} 
            />
          </div>
          
          <h1 className="modern-hero-title modern-heading">
            {FirstName} <span className="text-gradient-primary">{MiddleName}</span> {LastName}
          </h1>
          
          <div className="modern-hero-subtitle">
            <Typist className="lead fw-light">
              {devDesc}
            </Typist>
          </div>
          
          <div className="hero-actions mb-5">
            <a href="/about" className="modern-btn modern-btn-primary me-3">
              <i className="fas fa-user-circle"></i>
              About Me
            </a>
            <a href="/projects" className="modern-btn modern-btn-secondary">
              <i className="fas fa-code"></i>
              View Projects
            </a>
          </div>
          
          <div className="social-links animate-stagger">
            {icons.map((icon) => (
              <a
                key={icon.id}
                target="_blank"
                rel="noopener noreferrer"
                href={icon.url}
                aria-label={`My ${icon.image.split("-")[1]}`}
              >
                <div className={`social-icon glass-effect ${hoverstatus[icon.id]}`}
                     onMouseOver={() => toggleHover({ icon, event: "enter" })}
                     onMouseOut={() => toggleHover({ icon, event: "leave" })}>
                  <i className={`fab ${icon.image} fa-2x`} />
                </div>
              </a>
            ))}
          </div>
          
          <div className="hero-stats mt-5">
            <div className="row text-center">
              <div className="col-md-3">
                <div className="stat-item glass-effect p-3 rounded-3">
                  <h3 className="text-white mb-1">15+</h3>
                  <p className="text-white-50 mb-0">Years Experience</p>
                  <small className="text-white-50">Since 2010</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item glass-effect p-3 rounded-3">
                  <h3 className="text-white mb-1">100+</h3>
                  <p className="text-white-50 mb-0">Projects Delivered</p>
                  <small className="text-white-50">Enterprise Scale</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item glass-effect p-3 rounded-3">
                  <h3 className="text-white mb-1">25+</h3>
                  <p className="text-white-50 mb-0">Engineers Mentored</p>
                  <small className="text-white-50">Career Growth</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-item glass-effect p-3 rounded-3">
                  <h3 className="text-white mb-1">$2M+</h3>
                  <p className="text-white-50 mb-0">Cost Savings</p>
                  <small className="text-white-50">Optimization</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
