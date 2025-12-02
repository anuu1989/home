import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Import the image directly
import profileImg from '../../editable-stuff/asset/images/profile.jpg';

const AboutSection = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const aboutRef = useRef(null);

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

  return (
    <div className="about-section-clean">
      <div className="container">
        {/* Profile Hero Section */}
        <div className="profile-hero">
          <div className="profile-image-container">
            <img
              src={profileImg}
              alt="Anurag Vaidhya"
              className="profile-image"
              onError={(e) => {
                console.log('🔄 Profile image failed, trying public folder...');
                e.target.src = '/profile.jpg';
                e.target.onerror = (fallbackError) => {
                  console.log('🔄 Using SVG fallback...');
                  fallbackError.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='72' font-weight='bold' fill='white'%3EAV%3C/text%3E%3C/svg%3E";
                  fallbackError.target.onerror = null;
                };
              }}
            />
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">Anurag Vaidhya</h1>
            <p className="profile-title">Senior Technologist and Infrasmith</p>
            <p className="profile-location">
              <i className="fas fa-map-marker-alt"></i>
              Melbourne, Australia
            </p>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">14+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Engineers Mentored</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <Link to="/contact" className="btn-primary">
                <i className="fas fa-envelope"></i>
                Get In Touch
              </Link>
              <a href="/resume.pdf" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-download"></i>
                Resume
              </a>
            </div>
          </div>
        </div>

        {/* About Story */}
        <div className="about-story">
          <div className="story-content">
            <h2>About Me</h2>
            <p>
              Strategic and hands-on technology leader with 14+ years of experience across DevSecOps, 
              platform engineering, and cloud infrastructure. Known for bridging the gap between engineering 
              strategy and execution—designing and delivering secure, scalable, and high-performing platforms 
              that enable speed, stability, and innovation at scale.
            </p>
            <p>
              Deeply hands-on with modern cloud-native technologies, CI/CD, Kubernetes, infrastructure as code, 
              observability, and security automation. Proven ability to roll up sleeves when needed—whether 
              architecting resilient cloud systems, optimizing platform performance, or driving incident 
              response—while mentoring teams and shaping long-term engineering vision.
            </p>
            <p>
              A trusted leader at the intersection of cloud, security, and automation. Adept at aligning 
              engineering priorities with business objectives, embedding security into the software lifecycle, 
              and cultivating high-impact teams that deliver value fast and safely.
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="key-highlights">
          <h2>Key Highlights</h2>
          <div className="highlights-grid">
            {[
              {
                icon: "fas fa-trophy",
                title: "Leadership Excellence",
                description: "Led 15+ person engineering teams across multiple time zones, managing $2M+ budgets and delivering critical infrastructure projects.",
                metric: "15+ Teams Led"
              },
              {
                icon: "fas fa-rocket",
                title: "Performance Impact",
                description: "Reduced deployment time by 40% and improved system reliability to 99.9% uptime through automation and best practices.",
                metric: "40% Faster Delivery"
              },
              {
                icon: "fas fa-users-cog",
                title: "Talent Development",
                description: "Mentored 25+ engineers, developed training programs, and built high-performing teams that consistently exceed targets.",
                metric: "25+ Engineers Mentored"
              },
              {
                icon: "fas fa-shield-alt",
                title: "Security & Compliance",
                description: "Implemented enterprise-grade security practices, achieving SOC2 compliance and zero security incidents.",
                metric: "Zero Security Incidents"
              },
              {
                icon: "fas fa-cloud",
                title: "Cloud Transformation",
                description: "Architected and migrated 50+ applications to cloud-native solutions, reducing infrastructure costs by 30%.",
                metric: "50+ Apps Migrated"
              },
              {
                icon: "fas fa-lightbulb",
                title: "Innovation & Growth",
                description: "Continuously learning and adapting to emerging technologies, implementing cutting-edge solutions, and fostering innovation mindset across teams.",
                metric: "Always Learning"
              }
            ].map((highlight, index) => (
              <div 
                key={highlight.title}
                className={`highlight-card ${animateContent ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="highlight-icon">
                  <i className={highlight.icon}></i>
                </div>
                <div className="highlight-content">
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                  <div className="highlight-metric">{highlight.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div className="core-competencies">
          <h2>Core Competencies</h2>
          <div className="competencies-grid">
            {[
              {
                category: "Cloud & Infrastructure",
                icon: "fas fa-cloud",
                gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                skills: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "CloudFormation", "Helm"]
              },
              {
                category: "DevOps & Automation",
                icon: "fas fa-cogs",
                gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                skills: ["CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Ansible", "Chef", "Puppet", "ArgoCD"]
              },
              {
                category: "Programming & Development",
                icon: "fas fa-code",
                gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                skills: ["Java", "Python", "Node.js", "JavaScript", "Go", "Shell Scripting", "React", "Spring Boot"]
              },
              {
                category: "Monitoring & Observability",
                icon: "fas fa-chart-line",
                gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic", "Splunk", "Jaeger", "OpenTelemetry"]
              },
              {
                category: "Security & Compliance",
                icon: "fas fa-shield-alt",
                gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                skills: ["DevSecOps", "OWASP", "SOC2", "GDPR", "Vault", "SAST", "DAST", "Penetration Testing"]
              },
              {
                category: "Leadership & Management",
                icon: "fas fa-users",
                gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                skills: ["Team Leadership", "Agile/Scrum", "Strategic Planning", "Mentoring", "Stakeholder Management", "Budget Management", "Change Management", "Performance Management"]
              }
            ].map((competency, index) => (
              <div 
                key={competency.category}
                className={`competency-card ${animateContent ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="competency-header" style={{ background: competency.gradient }}>
                  <div className="competency-icon">
                    <i className={competency.icon}></i>
                  </div>
                  <h4>{competency.category}</h4>
                </div>
                <div className="competency-skills">
                  {competency.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connect Section */}
        <div className="connect-section">
          <h2>Let's Connect</h2>
          <p>Always open to discussing technology, leadership, and opportunities to create impact together</p>
          
          <div className="connect-actions">
            <Link to="/contact" className="btn-primary">
              <i className="fas fa-envelope"></i>
              Get In Touch
            </Link>
            <a href="https://linkedin.com/in/anurag-vaidhya-47b93222" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <i className="fab fa-linkedin"></i>
              LinkedIn
            </a>
            <a href="https://github.com/anuu1989" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <i className="fab fa-github"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;