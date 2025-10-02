import { useState, useEffect, useRef } from "react";

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [animateSkills, setAnimateSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const skillsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateSkills(true), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      id: 'programming',
      title: "Programming & Development",
      icon: "fas fa-code",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      description: "Core programming languages and frameworks",
      skills: [
        { 
          name: "Java", 
          level: 85, 
          color: "#f89820", 
          icon: "fab fa-java",
          experience: "8+ years",
          projects: 25,
          tags: ["Enterprise", "Spring Boot", "Microservices"]
        },
        { 
          name: "Node.js", 
          level: 87, 
          color: "#68a063", 
          icon: "fab fa-node-js",
          experience: "6+ years",
          projects: 18,
          tags: ["Backend", "APIs", "Real-time"]
        },
        { 
          name: "Python", 
          level: 80, 
          color: "#3776ab", 
          icon: "fab fa-python",
          experience: "5+ years",
          projects: 15,
          tags: ["Automation", "Data Science", "ML"]
        },
        { 
          name: "JavaScript", 
          level: 90, 
          color: "#f7df1e", 
          icon: "fab fa-js-square",
          experience: "10+ years",
          projects: 30,
          tags: ["Frontend", "React", "Vue.js"]
        }
      ]
    },
    {
      id: 'testing',
      title: "Testing & Quality Engineering",
      icon: "fas fa-vial",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      description: "Comprehensive testing strategies and automation",
      skills: [
        { 
          name: "Test Automation", 
          level: 95, 
          color: "#667eea", 
          icon: "fas fa-robot",
          experience: "12+ years",
          projects: 40,
          tags: ["Selenium", "Cypress", "Playwright"]
        },
        { 
          name: "API Testing", 
          level: 92, 
          color: "#764ba2", 
          icon: "fas fa-plug",
          experience: "10+ years",
          projects: 35,
          tags: ["REST", "GraphQL", "Postman"]
        },
        { 
          name: "Performance Testing", 
          level: 85, 
          color: "#f093fb", 
          icon: "fas fa-tachometer-alt",
          experience: "8+ years",
          projects: 20,
          tags: ["JMeter", "LoadRunner", "K6"]
        },
        { 
          name: "Security Testing", 
          level: 78, 
          color: "#f5576c", 
          icon: "fas fa-shield-alt",
          experience: "6+ years",
          projects: 12,
          tags: ["OWASP", "Penetration", "SAST"]
        }
      ]
    },
    {
      id: 'devops',
      title: "DevOps & Infrastructure",
      icon: "fas fa-cloud",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      description: "Modern infrastructure and deployment practices",
      skills: [
        { 
          name: "CI/CD Pipelines", 
          level: 90, 
          color: "#4facfe", 
          icon: "fas fa-sync-alt",
          experience: "9+ years",
          projects: 28,
          tags: ["Jenkins", "GitLab CI", "GitHub Actions"]
        },
        { 
          name: "Docker", 
          level: 85, 
          color: "#0db7ed", 
          icon: "fab fa-docker",
          experience: "7+ years",
          projects: 22,
          tags: ["Containerization", "Multi-stage", "Compose"]
        },
        { 
          name: "Kubernetes", 
          level: 75, 
          color: "#326ce5", 
          icon: "fas fa-dharmachakra",
          experience: "5+ years",
          projects: 15,
          tags: ["Orchestration", "Helm", "Operators"]
        },
        { 
          name: "Terraform", 
          level: 82, 
          color: "#623ce4", 
          icon: "fas fa-layer-group",
          experience: "6+ years",
          projects: 18,
          tags: ["IaC", "Multi-cloud", "Modules"]
        }
      ]
    },
    {
      id: 'cloud',
      title: "Cloud Platforms & Services",
      icon: "fas fa-server",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      description: "Multi-cloud expertise and platform services",
      skills: [
        { 
          name: "AWS", 
          level: 80, 
          color: "#ff9900", 
          icon: "fab fa-aws",
          experience: "8+ years",
          projects: 25,
          tags: ["EC2", "Lambda", "S3", "RDS"]
        },
        { 
          name: "Azure", 
          level: 75, 
          color: "#0078d4", 
          icon: "fab fa-microsoft",
          experience: "6+ years",
          projects: 18,
          tags: ["App Service", "Functions", "DevOps"]
        },
        { 
          name: "GCP", 
          level: 70, 
          color: "#4285f4", 
          icon: "fab fa-google",
          experience: "4+ years",
          projects: 12,
          tags: ["Compute Engine", "Cloud Run", "BigQuery"]
        },
        { 
          name: "OpenShift", 
          level: 72, 
          color: "#ee0000", 
          icon: "fab fa-redhat",
          experience: "5+ years",
          projects: 10,
          tags: ["Enterprise", "Operators", "Pipelines"]
        }
      ]
    }
  ];

  const softSkills = [
    {
      name: "Leadership & Management",
      icon: "fas fa-users",
      color: "#667eea",
      rating: 5,
      description: "Leading cross-functional teams and driving organizational transformation",
      achievements: ["Led 15+ person teams", "Managed $2M+ budgets", "Reduced delivery time by 40%"],
      keywords: ["Team Leadership", "Strategic Planning", "Change Management"]
    },
    {
      name: "Communication & Presentation",
      icon: "fas fa-comments",
      color: "#764ba2",
      rating: 5,
      description: "Effective stakeholder engagement and technical communication",
      achievements: ["100+ technical presentations", "C-level stakeholder management", "Cross-cultural teams"],
      keywords: ["Public Speaking", "Technical Writing", "Stakeholder Management"]
    },
    {
      name: "Problem Solving & Innovation",
      icon: "fas fa-lightbulb",
      color: "#f093fb",
      rating: 5,
      description: "Analytical thinking and creative solution development",
      achievements: ["50+ complex problems solved", "15+ process improvements", "3 patents filed"],
      keywords: ["Critical Thinking", "Root Cause Analysis", "Innovation"]
    },
    {
      name: "Collaboration & Teamwork",
      icon: "fas fa-handshake",
      color: "#4facfe",
      rating: 5,
      description: "Building strong partnerships across diverse teams",
      achievements: ["Cross-functional collaboration", "Remote team leadership", "Conflict resolution"],
      keywords: ["Team Building", "Cross-functional", "Remote Leadership"]
    },
    {
      name: "Mentoring & Development",
      icon: "fas fa-chalkboard-teacher",
      color: "#43e97b",
      rating: 4,
      description: "Developing talent and fostering continuous learning",
      achievements: ["Mentored 25+ engineers", "Training program development", "Knowledge transfer"],
      keywords: ["Talent Development", "Training", "Knowledge Sharing"]
    },
    {
      name: "Strategic & Systems Thinking",
      icon: "fas fa-chess",
      color: "#fa709a",
      rating: 5,
      description: "Long-term planning and architectural decision making",
      achievements: ["Enterprise architecture", "Technology roadmaps", "Digital transformation"],
      keywords: ["Architecture", "Strategy", "Digital Transformation"]
    }
  ];

  const certifications = [
    {
      name: "AWS DevOps - Professional",
      issuer: "Amazon Web Services",
      year: "2022",
      icon: "fab fa-aws",
      level: "Professional",
      status: "Active",
      credentialId: "AWS-DOP-2022-001",
      color: "#ff9900"
    },
    {
      name: "AWS Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2022",
      icon: "fab fa-aws",
      level: "Associate",
      status: "Active",
      credentialId: "AWS-DVA-2022-001",
      color: "#ff9900"
    },
    {
      name: "Certified Kubernetes Application Developer",
      issuer: "Cloud Native Computing Foundation",
      year: "2022",
      icon: "fas fa-dharmachakra",
      level: "Professional",
      status: "Active",
      credentialId: "CKAD-2022-001",
      color: "#326ce5"
    },
    {
      name: "HashiCorp Certified Terraform Associate",
      issuer: "HashiCorp",
      year: "2021",
      icon: "fas fa-layer-group",
      level: "Associate",
      status: "Expired",
      credentialId: "HCP-TF-2021-001",
      color: "#623ce4"
    },
    {
      name: "Certified Jenkins Engineer",
      issuer: "CloudBees",
      year: "2022",
      icon: "fas fa-cogs",
      level: "Professional",
      status: "Active",
      credentialId: "CJE-2022-001",
      color: "#d33833"
    },
    {
      name: "Google Cloud Architect Professional",
      issuer: "Google Cloud",
      year: "2019",
      icon: "fab fa-google",
      level: "Professional",
      status: "Expired",
      credentialId: "GCP-PCA-2019-001",
      color: "#4285f4"
    },
    {
      name: "Scrum Master Pro by ISQI",
      issuer: "ISQI",
      year: "2018",
      icon: "fas fa-users-cog",
      level: "Professional",
      status: "Active",
      credentialId: "ISQI-SMP-2018-001",
      color: "#43e97b"
    }
  ];

  const filteredSkills = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.skills.length > 0);

  return (
    <div id="skills" className="portfolio-section" ref={skillsRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="skills-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-rocket"></i>
              <span>Professional Skills</span>
            </div>
            <h1 className="hero-title">
              Expertise That <span className="gradient-text">Drives Results</span>
            </h1>
            <p className="hero-description">
              14+ years of hands-on experience across the full technology stack, 
              from enterprise development to cloud-native solutions
            </p>
            
            {/* Search Bar */}
            <div className="skills-search">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search skills, technologies, or certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Floating Skills Preview */}
          <div className="floating-skills">
            <div className="skill-bubble" style={{ animationDelay: '0s' }}>
              <i className="fab fa-react"></i>
              <span>React</span>
            </div>
            <div className="skill-bubble" style={{ animationDelay: '0.5s' }}>
              <i className="fab fa-aws"></i>
              <span>AWS</span>
            </div>
            <div className="skill-bubble" style={{ animationDelay: '1s' }}>
              <i className="fab fa-docker"></i>
              <span>Docker</span>
            </div>
            <div className="skill-bubble" style={{ animationDelay: '1.5s' }}>
              <i className="fab fa-python"></i>
              <span>Python</span>
            </div>
          </div>
        </div>

        {/* Modern Navigation Tabs */}
        <div className="skills-navigation">
          <div className="nav-wrapper">
            {[
              { id: 'technical', icon: 'fas fa-code', title: 'Technical Skills', subtitle: 'Programming & Development' },
              { id: 'soft', icon: 'fas fa-users', title: 'Leadership', subtitle: 'Soft Skills & Management' },
              { id: 'certifications', icon: 'fas fa-certificate', title: 'Certifications', subtitle: 'Professional Credentials' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnimateSkills(false);
                  setTimeout(() => setAnimateSkills(true), 100);
                }}
              >
                <div className="tab-icon">
                  <i className={tab.icon}></i>
                </div>
                <div className="tab-content">
                  <span className="tab-title">{tab.title}</span>
                  <span className="tab-subtitle">{tab.subtitle}</span>
                </div>
                <div className="tab-indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Technical Skills Content */}
        {activeTab === 'technical' && (
          <div className="skills-content">
            <div className="content-header">
              <h2 className="content-title">Technical Expertise</h2>
              <p className="content-subtitle">
                Comprehensive skills across modern development, testing, and infrastructure
              </p>
            </div>
            
            <div className="skills-categories">
              {(searchTerm ? filteredSkills : skillCategories).map((category, index) => (
                <div 
                  key={category.id} 
                  className={`skill-category ${animateSkills ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="category-header" style={{ background: category.gradient }}>
                    <div className="category-info">
                      <div className="category-icon">
                        <i className={category.icon}></i>
                      </div>
                      <div className="category-text">
                        <h3 className="category-title">{category.title}</h3>
                        <p className="category-description">{category.description}</p>
                      </div>
                    </div>
                    <div className="category-stats">
                      <span className="skill-count">{category.skills.length} Skills</span>
                    </div>
                  </div>
                  
                  <div className="skills-grid">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`skill-card ${animateSkills ? 'animate' : ''}`}
                        style={{ animationDelay: `${(index * 0.15) + (skillIndex * 0.05)}s` }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-header">
                          <div className="skill-icon" style={{ color: skill.color }}>
                            <i className={skill.icon}></i>
                          </div>
                          <div className="skill-level">
                            <span className="level-text">
                              {skill.level >= 90 ? 'Expert' : 
                               skill.level >= 80 ? 'Advanced' : 
                               skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="skill-body">
                          <h4 className="skill-name">{skill.name}</h4>
                          <div className="skill-meta">
                            <span className="experience">{skill.experience}</span>
                            <span className="projects">{skill.projects} projects</span>
                          </div>
                          
                          <div className="skill-progress">
                            <div className="progress-track"></div>
                            <div 
                              className="progress-fill"
                              style={{ 
                                width: animateSkills ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color
                              }}
                            ></div>
                            <span className="progress-value">{skill.level}%</span>
                          </div>
                          
                          <div className="skill-tags">
                            {skill.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="skill-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="skill-overlay" style={{ background: `${skill.color}10` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills Content */}
        {activeTab === 'soft' && (
          <div className="skills-content">
            <div className="content-header">
              <h2 className="content-title">Leadership & Soft Skills</h2>
              <p className="content-subtitle">
                Proven leadership abilities and interpersonal skills that drive team success
              </p>
            </div>
            
            <div className="soft-skills-container">
              {softSkills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className={`soft-skill-card ${animateSkills ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="soft-skill-header">
                    <div className="skill-icon-wrapper">
                      <div className="skill-icon" style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}cc)` }}>
                        <i className={skill.icon}></i>
                      </div>
                      <div className="skill-rating">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < skill.rating ? 'filled' : ''}`}
                            style={{ color: i < skill.rating ? skill.color : '#e0e0e0' }}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="soft-skill-content">
                    <h3 className="skill-title">{skill.name}</h3>
                    <p className="skill-description">{skill.description}</p>
                    
                    <div className="achievements">
                      <h4 className="achievements-title">Key Achievements</h4>
                      <ul className="achievements-list">
                        {skill.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="achievement-item">
                            <i className="fas fa-check-circle"></i>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="skill-keywords">
                      {skill.keywords.map((keyword, keyIndex) => (
                        <span 
                          key={keyIndex} 
                          className="keyword-tag"
                          style={{ borderColor: skill.color, color: skill.color }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Content */}
        {activeTab === 'certifications' && (
          <div className="skills-content">
            <div className="content-header">
              <h2 className="content-title">Professional Certifications</h2>
              <p className="content-subtitle">
                Industry-recognized credentials demonstrating expertise and commitment to excellence
              </p>
            </div>
            
            <div className="certifications-container">
              <div className="certifications-grid">
                {certifications.map((cert, index) => (
                  <div 
                    key={cert.name}
                    className={`certification-card ${animateSkills ? 'animate' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="cert-header">
                      <div className="cert-badge">
                        <div className="cert-icon" style={{ color: cert.color }}>
                          <i className={cert.icon}></i>
                        </div>
                        <div className="cert-year">{cert.year}</div>
                      </div>
                      <div className="cert-status">
                        <span className={`status-badge ${cert.status.toLowerCase()}`}>
                          <i className="fas fa-check-circle"></i>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="cert-content">
                      <h3 className="cert-name">{cert.name}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <div className="cert-level">
                        <span className="level-badge" style={{ backgroundColor: `${cert.color}20`, color: cert.color }}>
                          {cert.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Certification Statistics */}
              <div className="cert-statistics">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">5</div>
                      <div className="stat-label">Active Certifications</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">2024</div>
                      <div className="stat-label">Latest Achievement</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">100%</div>
                      <div className="stat-label">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">5</div>
                      <div className="stat-label">Years Average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className="skills-summary">
          <div className="summary-content">
            <h2 className="summary-title">Skills Impact</h2>
            <p className="summary-description">
              Leveraging diverse technical and leadership skills to deliver exceptional results
            </p>
            
            <div className="impact-metrics">
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">40%</div>
                  <div className="metric-label">Faster Delivery</div>
                  <div className="metric-description">Through automation and best practices</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">99.9%</div>
                  <div className="metric-label">System Reliability</div>
                  <div className="metric-description">Robust testing and monitoring</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">25+</div>
                  <div className="metric-label">Engineers Mentored</div>
                  <div className="metric-description">Knowledge sharing and growth</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">$2M+</div>
                  <div className="metric-label">Cost Savings</div>
                  <div className="metric-description">Through optimization and efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;