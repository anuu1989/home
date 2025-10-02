import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pdf from "../../editable-stuff/asset/Resume/Anurag_Vaidhya_Resume.pdf";
import Profile from "../../editable-stuff/asset/images/profile.jpg"

import {
  aboutHeading,
  aboutDescription,
  showInstaProfilePic,
  instaLink,
  instaUsername,
  instaQuerry,
} from "../../editable-stuff/configurations.json";

const AboutMe = () => {
  const [instaProfilePic, setInstaProfilePic] = useState("");
  const [showInsta, setShowInsta] = useState(showInstaProfilePic);
  const [resumeURL] = useState(Pdf);
  const [animateContent, setAnimateContent] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    if (showInsta) {
      handleRequest();
    }
  }, [showInsta]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateContent(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRequest = () => {
    axios
      .get(instaLink + instaUsername + instaQuerry)
      .then((response) => {
        return setInstaProfilePic(
          response.data.graphql.user.profile_pic_url_hd
        );
      })
      .catch((error) => {
        setShowInsta(false);
        return console.error(error.message);
      });
  };

  return (
    <div id="aboutme" className="portfolio-section" ref={aboutRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-user-circle"></i>
              <span>My Story</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Meet <span className="gradient-text">Anurag Vaidhya</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              Senior Engineering Leader & Infrasmith crafting scalable solutions 
              and leading high-performing teams across cloud, DevOps, and platform engineering
            </p>
          </div>
          

        </div>

        {/* Profile Introduction */}
        <div className="profile-introduction">
          <div className="intro-content">
            <h2 className="intro-title">Professional Profile</h2>
            <p className="intro-description">
              Comprehensive overview of experience, expertise, and professional journey
            </p>
          </div>
          
          <div className="profile-card-modern">
            <div className="profile-image-section">
              <div className="profile-image-container">
                <img
                  className="profile-image"
                  src={showInsta && instaProfilePic ? instaProfilePic : Profile}
                  alt="Profile picture of Anurag Vaidhya"
                  loading="lazy"
                />
                <div className="profile-ring"></div>
                <div className="profile-glow"></div>
              </div>
            </div>
            
            <div className="profile-info-section">
              <div className="profile-header">
                <h3 className="profile-name">Anurag Vaidhya</h3>
                <p className="profile-title">Senior Engineering Leader & Infrasmith</p>
                <div className="profile-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Melbourne, Australia</span>
                </div>
              </div>
              
              <div className="profile-stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">14+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Projects Delivered</div>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-users-cog"></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">25+</div>
                    <div className="stat-label">Teams Led</div>
                  </div>
                </div>
              </div>
              
              <div className="profile-description">
                <p>{aboutDescription}</p>
                <p>
                  I'm passionate about building high-performing teams, driving digital transformation, 
                  and creating scalable solutions that make a real impact. With over 14 years of experience 
                  in the technology industry, I've had the privilege of leading diverse teams and delivering 
                  innovative solutions across multiple domains.
                </p>
              </div>
              
              {resumeURL && (
                <div className="profile-actions">
                  <a 
                    className="btn-primary-modern"
                    href={Pdf}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Resume</span>
                  </a>
                  <a 
                    className="btn-secondary-modern"
                    href="mailto:anuragvaidhya786@gmail.com?subject=Portfolio Inquiry - Let's Connect&body=Hi Anurag,%0D%0A%0D%0AI reviewed your portfolio and would like to discuss potential opportunities.%0D%0A%0D%0ABest regards,"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-envelope"></i>
                    <span>Get in Touch</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Highlights Section */}
        <div className="highlights-section">
          <div className="container">
            <div className="section-header text-center">
              <h3 className="section-title">Key Highlights</h3>
              <p className="section-description">
                Measurable impact across technology leadership and innovation
              </p>
            </div>
            
            <div className="highlights-grid">
              <div className={`highlight-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="highlight-content">
                  <div className="highlight-number">14+</div>
                  <div className="highlight-label">Years Experience</div>
                  <div className="highlight-description">Professional software development and leadership</div>
                </div>
              </div>
              
              <div className={`highlight-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="highlight-content">
                  <div className="highlight-number">50+</div>
                  <div className="highlight-label">Team Members Led</div>
                  <div className="highlight-description">Across multiple projects and organizations</div>
                </div>
              </div>
              
              <div className={`highlight-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <div className="highlight-content">
                  <div className="highlight-number">25+</div>
                  <div className="highlight-label">Cloud Projects</div>
                  <div className="highlight-description">Successfully delivered and scaled</div>
                </div>
              </div>
              
              <div className={`highlight-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                <div className="highlight-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="highlight-content">
                  <div className="highlight-number">100+</div>
                  <div className="highlight-label">Automations Built</div>
                  <div className="highlight-description">Improving efficiency and reliability</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Competencies Section */}
        <div className="competencies-section">
          <div className="container">
            <div className="section-header text-center">
              <h3 className="section-title">Core Competencies</h3>
              <p className="section-description">
                Technical expertise and leadership skills that drive results
              </p>
            </div>
            
            <div className="competencies-grid">
              <div className={`competency-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
                <div className="competency-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <div className="competency-content">
                  <h4 className="competency-title">Cloud Architecture</h4>
                  <p className="competency-description">
                    Designing scalable, resilient cloud solutions across AWS, Azure, and GCP platforms 
                    with focus on performance, security, and cost optimization.
                  </p>
                  <div className="competency-skills">
                    <span className="skill-tag">AWS</span>
                    <span className="skill-tag">Azure</span>
                    <span className="skill-tag">GCP</span>
                  </div>
                </div>
              </div>
              
              <div className={`competency-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className="competency-icon">
                  <i className="fas fa-users-cog"></i>
                </div>
                <div className="competency-content">
                  <h4 className="competency-title">Team Leadership</h4>
                  <p className="competency-description">
                    Leading cross-functional teams and driving organizational transformation 
                    initiatives with focus on people development and delivery excellence.
                  </p>
                  <div className="competency-skills">
                    <span className="skill-tag">Agile</span>
                    <span className="skill-tag">Mentoring</span>
                    <span className="skill-tag">Strategy</span>
                  </div>
                </div>
              </div>
              
              <div className={`competency-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                <div className="competency-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="competency-content">
                  <h4 className="competency-title">DevOps Excellence</h4>
                  <p className="competency-description">
                    Implementing CI/CD pipelines and automation to accelerate delivery cycles 
                    while maintaining high quality and reliability standards.
                  </p>
                  <div className="competency-skills">
                    <span className="skill-tag">CI/CD</span>
                    <span className="skill-tag">Docker</span>
                    <span className="skill-tag">Kubernetes</span>
                  </div>
                </div>
              </div>
              
              <div className={`competency-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                <div className="competency-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className="competency-content">
                  <h4 className="competency-title">Innovation & Strategy</h4>
                  <p className="competency-description">
                    Driving digital transformation through emerging technologies and best practices 
                    while aligning technical solutions with business objectives.
                  </p>
                  <div className="competency-skills">
                    <span className="skill-tag">Innovation</span>
                    <span className="skill-tag">Strategy</span>
                    <span className="skill-tag">Transformation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AboutMe;
