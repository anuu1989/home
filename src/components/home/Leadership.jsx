import { useState, useEffect, useRef } from "react";

const Leadership = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const [activeTab, setActiveTab] = useState('philosophy');
  const leadershipRef = useRef(null);

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

    if (leadershipRef.current) {
      observer.observe(leadershipRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const leadershipAreas = [
    {
      title: "Team Development",
      icon: "fas fa-users",
      color: "#667eea",
      description: "Mentoring and developing team members through structured growth programs and personalized coaching.",
      achievements: [
        "Mentored 20+ junior developers",
        "Implemented career development frameworks",
        "Achieved 95% team retention rate",
        "Conducted 100+ technical training sessions"
      ]
    },
    {
      title: "Community Building",
      icon: "fas fa-handshake",
      color: "#764ba2",
      description: "Creating inclusive environments that foster collaboration, innovation, and continuous learning.",
      achievements: [
        "Led diversity and inclusion initiatives",
        "Organized 15+ community events",
        "Built cross-functional collaboration",
        "Established knowledge sharing programs"
      ]
    },
    {
      title: "Technical Leadership",
      icon: "fas fa-code-branch",
      color: "#f093fb",
      description: "Driving technical excellence through architecture decisions, best practices, and innovation.",
      achievements: [
        "Architected scalable solutions",
        "Established coding standards",
        "Led technical decision making",
        "Implemented DevOps best practices"
      ]
    },
    {
      title: "Strategic Vision",
      icon: "fas fa-lightbulb",
      color: "#4facfe",
      description: "Developing and executing strategic initiatives that align with business objectives and drive growth.",
      achievements: [
        "Defined technology roadmaps",
        "Led digital transformation",
        "Optimized operational efficiency",
        "Delivered strategic projects"
      ]
    }
  ];

  const experiences = [
    {
      company: "Wipro Technologies",
      role: "Senior Consultant & Team Lead",
      period: "2011-2020",
      highlights: [
        "Cultivated culture of inclusivity and collaboration",
        "Led new member onboarding and mentoring programs",
        "Organized technology training on niche skills",
        "Conducted social cause events (food wastage awareness)"
      ]
    },
    {
      company: "Cognizant Technology Solutions",
      role: "Senior Engineer & Community Leader",
      period: "2020-2022",
      highlights: [
        "Led community goal-setting and achievement programs",
        "Organized tech conferences and knowledge sharing events",
        "Guided team members in career development",
        "Built cross-team collaboration frameworks"
      ]
    },
    {
      company: "Accenture",
      role: "Engineering Lead",
      period: "2023-2025",
      highlights: [
        "Leading engineering teams in cloud transformation",
        "Driving platform modernization initiatives",
        "Mentoring senior engineers and architects",
        "Establishing engineering excellence standards"
      ]
    },
    {
      company: "Thoughtworks",
      role: "Lead Consultant",
      period: "Aug 2025 - Nov 2025",
      highlights: [
        "Championed agile methodologies and DevOps practices",
        "Led cross-functional teams in digital transformation projects",
        "Mentored consultants on technical excellence and client engagement",
        "Drove innovation through technology radar and best practices"
      ]
    },
    {
      company: "Australia Post",
      role: "Engineer - Platform, DevOps and Cloud",
      period: "Jan 2026 - Present",
      highlights: [
        "Leading platform engineering and cloud infrastructure modernization",
        "Implementing scalable DevOps practices for national postal operations",
        "Driving digital transformation initiatives across the organization",
        "Establishing cloud-native architecture and observability practices"
      ]
    }
  ];

  return (
    <div id="leadership" className="portfolio-section" ref={leadershipRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="leadership-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-users-cog"></i>
              <span>Leadership Excellence</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Leading with <span className="gradient-text">Purpose</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              Empowering teams to achieve extraordinary results through mentorship, 
              innovation, and strategic vision that drives organizational transformation
            </p>
          </div>
        </div>

        {/* Leadership Navigation */}
        <div className="leadership-navigation">
          <div className="nav-wrapper">
            {[
              { id: 'philosophy', icon: 'fas fa-lightbulb', title: 'Philosophy', subtitle: 'Leadership Approach' },
              { id: 'areas', icon: 'fas fa-cogs', title: 'Core Areas', subtitle: 'Leadership Domains' },
              { id: 'journey', icon: 'fas fa-route', title: 'Journey', subtitle: 'Leadership Evolution' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnimateContent(false);
                  setTimeout(() => setAnimateContent(true), 100);
                }}
              >
                <div className="tab-icon">
                  <i className={tab.icon}></i>
                </div>
                <div className="tab-content">
                  <span className="tab-title">{tab.title}</span>
                  <span className="tab-subtitle">{tab.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Leadership Philosophy */}
        {activeTab === 'philosophy' && (
          <div className="leadership-content">
            <div className="content-header">
              <h2 className="content-title">Leadership Philosophy</h2>
              <p className="content-subtitle">
                Building high-performing teams through empowerment, innovation, and inclusive leadership
              </p>
            </div>

            <div className="philosophy-section">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className={`philosophy-content ${animateContent ? 'animate' : ''}`}>
                    <div className="philosophy-card">
                      <div className="philosophy-icon">
                        <i className="fas fa-heart"></i>
                      </div>
                      <div className="philosophy-text">
                        <h3>People-First Approach</h3>
                        <p>
                          I believe that great technology solutions come from great teams. My leadership philosophy 
                          centers on creating environments where people can thrive, innovate, and deliver their best work 
                          while growing both personally and professionally.
                        </p>
                      </div>
                    </div>

                    <div className="core-principles">
                      <h4 className="principles-title">Core Leadership Principles</h4>
                      <div className="principles-list">
                        <div className="principle-item">
                          <div className="principle-icon">
                            <i className="fas fa-users"></i>
                          </div>
                          <div className="principle-content">
                            <h5>Empowerment</h5>
                            <p>Enabling team members to take ownership and make decisions</p>
                          </div>
                        </div>
                        
                        <div className="principle-item">
                          <div className="principle-icon">
                            <i className="fas fa-lightbulb"></i>
                          </div>
                          <div className="principle-content">
                            <h5>Innovation</h5>
                            <p>Fostering creativity and encouraging calculated risk-taking</p>
                          </div>
                        </div>
                        
                        <div className="principle-item">
                          <div className="principle-icon">
                            <i className="fas fa-handshake"></i>
                          </div>
                          <div className="principle-content">
                            <h5>Collaboration</h5>
                            <p>Building bridges across teams and breaking down silos</p>
                          </div>
                        </div>
                        
                        <div className="principle-item">
                          <div className="principle-icon">
                            <i className="fas fa-seedling"></i>
                          </div>
                          <div className="principle-content">
                            <h5>Growth</h5>
                            <p>Investing in continuous learning and development</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6">
                  <div className={`leadership-stats ${animateContent ? 'animate' : ''}`}>
                    <div className="stats-container">
                      <div className="stat-circle">
                        <div className="circle-progress" data-percentage="95">
                          <div className="circle-inner">
                            <div className="stat-number">95%</div>
                            <div className="stat-label">Team Retention</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="leadership-metrics">
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-users"></i>
                          </div>
                          <div className="metric-content">
                            <div className="metric-number">50+</div>
                            <div className="metric-label">People Mentored</div>
                          </div>
                        </div>
                        
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-calendar-check"></i>
                          </div>
                          <div className="metric-content">
                            <div className="metric-number">25+</div>
                            <div className="metric-label">Events Organized</div>
                          </div>
                        </div>
                        
                        <div className="metric-item">
                          <div className="metric-icon">
                            <i className="fas fa-trophy"></i>
                          </div>
                          <div className="metric-content">
                            <div className="metric-number">14+</div>
                            <div className="metric-label">Years Leading</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leadership Areas */}
        {activeTab === 'areas' && (
          <div className="leadership-content">
            <div className="content-header">
              <h2 className="content-title">Leadership Domains</h2>
              <p className="content-subtitle">
                Key areas where I drive impact through strategic leadership and team development
              </p>
            </div>

            <div className="leadership-areas-grid">
              {leadershipAreas.map((area, index) => (
                <div 
                  key={index} 
                  className={`leadership-area-card ${animateContent ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="area-header">
                    <div className="area-icon" style={{ backgroundColor: area.color }}>
                      <i className={area.icon}></i>
                    </div>
                    <h3 className="area-title">{area.title}</h3>
                  </div>
                  
                  <div className="area-content">
                    <p className="area-description">{area.description}</p>
                    
                    <div className="achievements-section">
                      <h4 className="achievements-title">Key Achievements</h4>
                      <div className="achievements-list">
                        {area.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="achievement-item">
                            <div className="achievement-icon" style={{ color: area.color }}>
                              <i className="fas fa-check-circle"></i>
                            </div>
                            <span className="achievement-text">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="area-overlay" style={{ background: `${area.color}10` }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership Journey */}
        {activeTab === 'journey' && (
          <div className="leadership-content">
            <div className="content-header">
              <h2 className="content-title">Leadership Evolution</h2>
              <p className="content-subtitle">
                My journey of growth as a leader across different organizations and roles
              </p>
            </div>

            <div className="leadership-journey">
              <div className="journey-timeline">
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`journey-item ${animateContent ? 'animate' : ''}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="journey-marker">
                      <div className="marker-dot"></div>
                      <div className="marker-line"></div>
                    </div>
                    
                    <div className="journey-content">
                      <div className="journey-header">
                        <div className="journey-period">{exp.period}</div>
                        <h3 className="journey-company">{exp.company}</h3>
                        <h4 className="journey-role">{exp.role}</h4>
                      </div>
                      
                      <div className="journey-highlights">
                        <h5 className="highlights-title">Leadership Highlights</h5>
                        <div className="highlights-grid">
                          {exp.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="highlight-item">
                              <div className="highlight-icon">
                                <i className="fas fa-star"></i>
                              </div>
                              <span className="highlight-text">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leadership Impact */}
        <div className="leadership-impact">
          <div className="impact-content">
            <h2 className="impact-title">Leadership Impact</h2>
            <p className="impact-description">
              Measurable outcomes from people-centered leadership and strategic vision
            </p>
            
            <div className="impact-metrics">
              <div className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="impact-content-inner">
                  <div className="impact-number">40%</div>
                  <div className="impact-label">Productivity Increase</div>
                  <div className="impact-description">Through team empowerment</div>
                </div>
              </div>
              
              <div className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="impact-content-inner">
                  <div className="impact-number">95%</div>
                  <div className="impact-label">Team Retention</div>
                  <div className="impact-description">High engagement culture</div>
                </div>
              </div>
              
              <div className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="impact-content-inner">
                  <div className="impact-number">50+</div>
                  <div className="impact-label">People Developed</div>
                  <div className="impact-description">Career advancement support</div>
                </div>
              </div>
              
              <div className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className="impact-content-inner">
                  <div className="impact-number">25+</div>
                  <div className="impact-label">Innovation Projects</div>
                  <div className="impact-description">Team-driven initiatives</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;