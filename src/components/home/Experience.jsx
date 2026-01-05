import { useState, useEffect, useRef } from "react";
import Cognizant from "../../editable-stuff/asset/images/cognizant.jpg";
import Wipro from "../../editable-stuff/asset/images/wipro.jpg";
import Accenture from "../../editable-stuff/asset/images/accenture.jpg";
import Thoughtworks from "../../editable-stuff/asset/images/thoughtworks.png";
import AusPost from "../../editable-stuff/asset/images/auspost.png";

const Experience = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const experienceRef = useRef(null);

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

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const experiences = [
    {
      id: 1,
      company: "Wipro Technologies",
      logo: Wipro,
      position: "Senior Consultant",
      department: "Testing/DevOps",
      duration: "Feb 2011 - Feb 2020",
      years: "9 years",
      description: "Led testing and DevOps initiatives, implementing automated testing frameworks and CI/CD pipelines.",
      technologies: ["Testing", "DevOps", "Automation", "CI/CD"],
      color: "#4A90E2"
    },
    {
      id: 2,
      company: "Cognizant Technology Solutions",
      logo: Cognizant,
      position: "Senior Engineer",
      department: "Cloud/DevOps/Platform",
      duration: "Feb 2020 - June 2022",
      years: "2.5 years",
      description: "Architected cloud solutions and managed DevOps platforms, focusing on scalability and performance.",
      technologies: ["Cloud", "DevOps", "Platform Engineering", "AWS", "GCP"],
      color: "#00A1C9"
    },
    {
      id: 3,
      company: "Accenture",
      logo: Accenture,
      position: "Engineering Lead",
      department: "Cloud/DevOps/Platform",
      duration: "June 2022 - Aug 2025",
      years: "2+ years",
      description: "Leading engineering teams in cloud transformation and platform modernization initiatives.",
      technologies: ["Leadership", "Cloud Architecture", "DevOps", "Team Management", "AWS", "Platform Engineering"],
      color: "#A100FF"
    },
    {
      id: 4,
      company: "Thoughtworks",
      logo: Thoughtworks,
      position: "Lead Consultant",
      department: "Cloud/DevOps/Platform",
      duration: "Aug 2025 - Nov 2025",
      years: "3 months",
      description: "Championed agile methodologies and DevOps practices while leading digital transformation initiatives for enterprise clients.",
      technologies: ["Agile", "DevOps", "Cloud", "Platform Engineering", "Digital Transformation", "Consulting", "Technology Radar"],
      color: "#FF6B35"
    },
    {
      id: 5,
      company: "Australia Post",
      logo: AusPost,
      position: "Engineer - Platform, DevOps and Cloud",
      department: "Platform Engineering",
      duration: "Jan 2026 - Present",
      years: "Current",
      description: "Leading platform engineering initiatives and cloud infrastructure modernization for Australia's national postal service, focusing on scalable and reliable digital solutions.",
      technologies: ["Platform Engineering", "DevOps", "Cloud Infrastructure", "AWS", "Kubernetes", "CI/CD", "Infrastructure as Code", "Observability"],
      color: "#E31E24"
    },
  ];

  return (
    <div id="experience" className="portfolio-section" ref={experienceRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="experience-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-briefcase"></i>
              <span>Professional Journey</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Career <span className="gradient-text">Experience</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              14+ years of progressive growth across leading technology companies, 
              driving innovation and leading high-performing teams
            </p>
          </div>
        </div>

        {/* Experience Navigation */}
        <div className="experience-navigation">
          <div className="nav-wrapper">
            {experiences.map((exp, index) => (
              <button
                key={exp.id}
                className={`company-nav-btn ${activeExperience === index ? 'active' : ''}`}
                onClick={() => setActiveExperience(index)}
                style={{ '--company-color': exp.color }}
              >
                <div className="company-logo-nav">
                  <img src={exp.logo} alt={exp.company} />
                </div>
                <div className="company-info">
                  <span className="company-name-nav">{exp.company}</span>
                  <span className="company-years">{exp.years}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="experience-details">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience-detail-card ${activeExperience === index ? 'active' : ''} ${animateContent ? 'animate' : ''}`}
              style={{ display: activeExperience === index ? 'block' : 'none' }}
            >
              <div className="detail-header">
                <div className="company-info-detailed">
                  <div className="company-logo-large">
                    <img src={exp.logo} alt={exp.company} />
                    <div className="logo-backdrop" style={{ backgroundColor: exp.color }}></div>
                  </div>
                  <div className="company-details">
                    <h2 className="company-name-large">{exp.company}</h2>
                    <h3 className="position-title-large">{exp.position}</h3>
                    <div className="department-badge" style={{ backgroundColor: exp.color }}>
                      {exp.department}
                    </div>
                    <div className="duration-info">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{exp.duration}</span>
                      <span className="duration-highlight">({exp.years})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-content">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="experience-description">
                      <h4 className="description-title">Role Overview</h4>
                      <p className="description-text">{exp.description}</p>
                    </div>

                    <div className="key-achievements">
                      <h4 className="achievements-title">Key Achievements</h4>
                      <div className="achievements-grid">
                        <div className="achievement-item">
                          <div className="achievement-icon" style={{ backgroundColor: exp.color }}>
                            <i className="fas fa-users"></i>
                          </div>
                          <div className="achievement-content">
                            <div className="achievement-number">15+</div>
                            <div className="achievement-label">Team Members Led</div>
                          </div>
                        </div>
                        
                        <div className="achievement-item">
                          <div className="achievement-icon" style={{ backgroundColor: exp.color }}>
                            <i className="fas fa-project-diagram"></i>
                          </div>
                          <div className="achievement-content">
                            <div className="achievement-number">25+</div>
                            <div className="achievement-label">Projects Delivered</div>
                          </div>
                        </div>
                        
                        <div className="achievement-item">
                          <div className="achievement-icon" style={{ backgroundColor: exp.color }}>
                            <i className="fas fa-chart-line"></i>
                          </div>
                          <div className="achievement-content">
                            <div className="achievement-number">40%</div>
                            <div className="achievement-label">Efficiency Improvement</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="technologies-section">
                      <h4 className="tech-title">Technologies & Skills</h4>
                      <div className="tech-cloud">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="tech-bubble"
                            style={{ 
                              backgroundColor: `${exp.color}15`,
                              borderColor: exp.color,
                              color: exp.color
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="impact-metrics">
                      <h4 className="metrics-title">Impact Metrics</h4>
                      <div className="metrics-list">
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-rocket"></i>
                          </div>
                          <div className="metric-text">Accelerated delivery cycles</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-shield-alt"></i>
                          </div>
                          <div className="metric-text">Enhanced system reliability</div>
                        </div>
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-dollar-sign"></i>
                          </div>
                          <div className="metric-text">Reduced operational costs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career Timeline */}
        <div className="career-timeline">
          <h2 className="timeline-title">Career Progression</h2>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`timeline-item ${animateContent ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-marker" style={{ backgroundColor: exp.color }}>
                  <div className="marker-inner">
                    <i className="fas fa-briefcase"></i>
                  </div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{exp.duration.split(' - ')[0]}</div>
                  <h4 className="timeline-company">{exp.company}</h4>
                  <p className="timeline-position">{exp.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Statistics */}
        <div className="career-statistics">
          <div className="stats-content">
            <h2 className="stats-title">Career by Numbers</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">14+</div>
                  <div className="stat-label">Years Experience</div>
                  <div className="stat-description">Professional software development</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Major Companies</div>
                  <div className="stat-description">Leading technology organizations</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Delivered</div>
                  <div className="stat-description">Successful implementations</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">25+</div>
                  <div className="stat-label">Team Members Led</div>
                  <div className="stat-description">Across multiple projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;