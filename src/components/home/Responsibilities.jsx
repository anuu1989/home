import { useState, useEffect, useRef } from "react";

const Responsibilities = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const responsibilitiesRef = useRef(null);

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

    if (responsibilitiesRef.current) {
      observer.observe(responsibilitiesRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const responsibilities = [
    {
      category: "Testing & Automation",
      icon: "fas fa-vial",
      color: "#667eea",
      items: [
        "Creating testing and test automation strategy on program/project level",
        "Automating testing scenarios for UI and API layers",
        "Designing and developing automation testing frameworks",
        "Implementing shift left testing with Service Virtualization tools"
      ]
    },
    {
      category: "DevOps & CI/CD",
      icon: "fas fa-cogs",
      color: "#764ba2",
      items: [
        "Build automation and deployment automation",
        "Building CI/CD automation pipelines with various tools",
        "Containerization strategy and best practices implementation",
        "Infrastructure as Code using Terraform"
      ]
    },
    {
      category: "Cloud & Infrastructure",
      icon: "fas fa-cloud",
      color: "#f093fb",
      items: [
        "Creating and managing cloud infrastructure",
        "Designing cloud architecture with security endorsement",
        "Container orchestration with Kubernetes and OpenShift",
        "Platform automation and management"
      ]
    },
    {
      category: "Leadership & Strategy",
      icon: "fas fa-users",
      color: "#4facfe",
      items: [
        "Team handling, guidance, and mentoring",
        "GTM strategy development for products and solutions",
        "Customer consultation for testing, SV, and DevOps",
        "Requirements gathering and scope analysis"
      ]
    },
    {
      category: "Organizational Development",
      icon: "fas fa-chart-line",
      color: "#43e97b",
      items: [
        "Designing DevOps Maturity Models for organizations",
        "Cross-team coordination and collaboration",
        "Process improvement and optimization",
        "Technology adoption and transformation"
      ]
    }
  ];

  return (
    <div id="responsibilities" className="portfolio-section" ref={responsibilitiesRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="responsibilities-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-tasks"></i>
              <span>Key Responsibilities</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Professional <span className="gradient-text">Expertise</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              Comprehensive leadership across testing, automation, cloud infrastructure, 
              and organizational transformation initiatives
            </p>
          </div>
        </div>

        {/* Interactive Category Navigation */}
        <div className="category-navigation">
          <div className="nav-wrapper">
            {responsibilities.map((category, index) => (
              <button
                key={index}
                className={`category-nav-btn ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
                style={{ '--category-color': category.color }}
              >
                <div className="nav-icon">
                  <i className={category.icon}></i>
                </div>
                <span className="nav-title">{category.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Responsibility View */}
        <div className="responsibility-details">
          {responsibilities.map((category, index) => (
            <div
              key={index}
              className={`responsibility-detail-card ${activeCategory === index ? 'active' : ''} ${animateContent ? 'animate' : ''}`}
              style={{ display: activeCategory === index ? 'block' : 'none' }}
            >
              <div className="detail-header">
                <div className="category-info">
                  <div className="category-icon-large" style={{ backgroundColor: category.color }}>
                    <i className={category.icon}></i>
                  </div>
                  <div className="category-content">
                    <h2 className="category-title-large">{category.category}</h2>
                    <p className="category-description">
                      Core responsibilities and expertise in {category.category.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="responsibilities-grid">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex} 
                    className={`responsibility-item-card ${animateContent ? 'animate' : ''}`}
                    style={{ animationDelay: `${itemIndex * 0.1}s` }}
                  >
                    <div className="item-icon" style={{ backgroundColor: category.color }}>
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="item-content">
                      <p className="item-text">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Responsibilities Overview Grid */}
        <div className="responsibilities-overview">
          <div className="overview-content">
            <h2 className="overview-title">Responsibility Areas</h2>
            <p className="overview-description">
              Comprehensive expertise across multiple domains of technology leadership
            </p>
            
            <div className="overview-grid">
              {responsibilities.map((category, index) => (
                <div 
                  key={index}
                  className={`overview-card ${animateContent ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="overview-icon" style={{ backgroundColor: category.color }}>
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="overview-category">{category.category}</h3>
                  <div className="overview-count">{category.items.length} Key Areas</div>
                  <div className="overview-progress">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: animateContent ? '100%' : '0%',
                        backgroundColor: category.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="impact-metrics">
          <div className="metrics-content">
            <h2 className="metrics-title">Professional Impact</h2>
            <p className="metrics-description">
              Measurable outcomes from comprehensive responsibility management
            </p>
            
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">50+</div>
                  <div className="metric-label">Projects Led</div>
                  <div className="metric-description">Successfully delivered across multiple domains</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-users-cog"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">15+</div>
                  <div className="metric-label">Teams Managed</div>
                  <div className="metric-description">Cross-functional team leadership</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">25+</div>
                  <div className="metric-label">Cloud Migrations</div>
                  <div className="metric-description">Infrastructure transformation projects</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">100+</div>
                  <div className="metric-label">Automations Built</div>
                  <div className="metric-description">Process optimization and efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responsibilities;