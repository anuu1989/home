import React, { useState, useEffect } from 'react';

const SectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'aboutme', label: 'About', icon: 'fas fa-user' },
    { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { id: 'responsibilities', label: 'Responsibilities', icon: 'fas fa-tasks' },
    { id: 'leadership', label: 'Leadership', icon: 'fas fa-users' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-code' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-cogs' },
    { id: 'interests', label: 'Interests', icon: 'fas fa-heart' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="section-nav d-none d-lg-flex">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`section-nav-dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          data-tooltip={section.label}
          title={section.label}
        >
          <i className={section.icon} style={{ fontSize: '8px', opacity: 0.8 }}></i>
        </div>
      ))}
    </nav>
  );
};

export default SectionNavigation;