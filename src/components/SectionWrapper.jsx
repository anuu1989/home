import React, { useEffect, useRef, useState } from 'react';
import SectionDivider from './SectionDivider';

const SectionWrapper = ({ 
  id, 
  children, 
  title, 
  subtitle,
  dividerType = 'wave',
  backgroundColor = '#ffffff',
  nextBackgroundColor = '#f8f9fa',
  showDivider = true,
  className = ''
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className={`portfolio-section ${className} ${isVisible ? 'section-animate in-view' : 'section-animate'}`}
        style={{ backgroundColor }}
      >
        <div className="container">
          {title && (
            <div className="section-header">
              <h2 className="section-title">{title}</h2>
              {subtitle && <p className="section-subtitle">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
        
        {/* Floating decorative elements */}
        <div className="floating-element" style={{ top: '10%', left: '5%', fontSize: '2rem' }}>
          <i className="fas fa-circle"></i>
        </div>
        <div className="floating-element" style={{ top: '20%', right: '10%', fontSize: '1.5rem' }}>
          <i className="fas fa-square"></i>
        </div>
        <div className="floating-element" style={{ bottom: '15%', left: '15%', fontSize: '1.8rem' }}>
          <i className="fas fa-triangle"></i>
        </div>
      </section>
      
      {showDivider && (
        <SectionDivider 
          type={dividerType}
          fromGradient={backgroundColor}
          toGradient={nextBackgroundColor}
          height="120px"
        />
      )}
    </>
  );
};

export default SectionWrapper;