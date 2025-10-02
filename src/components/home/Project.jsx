import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {
  projectHeading,
  gitHubLink,
  gitHubUsername,
  gitHubQuerry,
  projectsLength,
} from "../../editable-stuff/configurations.json";

const Project = () => {
  const [projectsArray, setProjectsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateContent, setAnimateContent] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const projectsRef = useRef(null);

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Featured projects (fallback if GitHub API fails)
  const featuredProjects = [
    {
      id: 1,
      name: "Cloud Infrastructure Automation",
      description: "Terraform-based infrastructure as code solution for multi-cloud deployments with automated CI/CD pipelines.",
      html_url: "#",
      language: "HCL",
      topics: ["terraform", "aws", "azure", "devops", "infrastructure"],
      stargazers_count: 45,
      forks_count: 12,
      created_at: "2023-01-15T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      name: "Kubernetes Monitoring Stack",
      description: "Complete monitoring solution for Kubernetes clusters using Prometheus, Grafana, and custom dashboards.",
      html_url: "#",
      language: "YAML",
      topics: ["kubernetes", "monitoring", "prometheus", "grafana", "observability"],
      stargazers_count: 38,
      forks_count: 8,
      created_at: "2023-03-20T00:00:00Z",
      updated_at: "2024-02-10T00:00:00Z"
    },
    {
      id: 3,
      name: "Test Automation Framework",
      description: "Comprehensive testing framework supporting UI, API, and performance testing with detailed reporting.",
      html_url: "#",
      language: "Java",
      topics: ["testing", "automation", "selenium", "api-testing", "framework"],
      stargazers_count: 52,
      forks_count: 15,
      created_at: "2022-08-10T00:00:00Z",
      updated_at: "2024-01-05T00:00:00Z"
    },
    {
      id: 4,
      name: "DevOps Pipeline Templates",
      description: "Reusable CI/CD pipeline templates for various technology stacks with security scanning and deployment automation.",
      html_url: "#",
      language: "Shell",
      topics: ["cicd", "jenkins", "gitlab", "security", "automation"],
      stargazers_count: 29,
      forks_count: 6,
      created_at: "2023-06-01T00:00:00Z",
      updated_at: "2024-01-20T00:00:00Z"
    }
  ];

  const handleRequest = useCallback(() => {
    setLoading(true);
    setError(null);
    
    axios
      .get(gitHubLink + gitHubUsername + gitHubQuerry)
      .then((response) => {
        setProjectsArray(response.data.slice(0, projectsLength));
        setLoading(false);
      })
      .catch((error) => {
        console.error("GitHub API Error:", error.message);
        setError(error.message);
        // Use featured projects as fallback
        setProjectsArray(featuredProjects.slice(0, projectsLength));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const displayProjects = projectsArray.length > 0 ? projectsArray : featuredProjects.slice(0, projectsLength);

  const projectCategories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th-large' },
    { id: 'cloud', name: 'Cloud Infrastructure', icon: 'fas fa-cloud' },
    { id: 'devops', name: 'DevOps Tools', icon: 'fas fa-cogs' },
    { id: 'testing', name: 'Testing Frameworks', icon: 'fas fa-vial' },
    { id: 'monitoring', name: 'Monitoring', icon: 'fas fa-chart-line' }
  ];

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return displayProjects;
    return displayProjects.filter(project => 
      project.topics && project.topics.some(topic => {
        switch(activeFilter) {
          case 'cloud': return ['terraform', 'aws', 'azure', 'gcp', 'infrastructure'].includes(topic);
          case 'devops': return ['cicd', 'jenkins', 'gitlab', 'automation', 'docker'].includes(topic);
          case 'testing': return ['testing', 'automation', 'selenium', 'api-testing'].includes(topic);
          case 'monitoring': return ['monitoring', 'prometheus', 'grafana', 'observability'].includes(topic);
          default: return true;
        }
      })
    );
  };

  return (
    <div id="projects" className="portfolio-section" ref={projectsRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="projects-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-code-branch"></i>
              <span>Portfolio Projects</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Innovative <span className="gradient-text">Solutions</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              Showcasing cutting-edge projects in cloud infrastructure, automation, 
              DevOps practices, and enterprise solutions
            </p>
          </div>
        </div>

        {/* Project Filter Navigation */}
        <div className="project-navigation">
          <div className="nav-wrapper">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <div className="filter-icon">
                  <i className={category.icon}></i>
                </div>
                <span className="filter-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="projects-loading">
            <div className="loading-container">
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
              <h3>Loading Projects...</h3>
              <p>Fetching latest projects from GitHub</p>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="projects-notice">
                <div className="notice-content">
                  <i className="fas fa-info-circle"></i>
                  <span>Showing featured projects (GitHub API temporarily unavailable)</span>
                </div>
              </div>
            )}
            
            {/* Projects Grid */}
            <div className="projects-content">
              <div className="projects-grid">
                {getFilteredProjects().map((project, index) => (
                  <div 
                    key={project.id} 
                    className={`project-item ${animateContent ? 'animate' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard id={project.id} value={project} />
                  </div>
                ))}
              </div>

              {getFilteredProjects().length === 0 && (
                <div className="no-projects">
                  <div className="no-projects-content">
                    <i className="fas fa-search"></i>
                    <h3>No Projects Found</h3>
                    <p>No projects match the selected filter. Try selecting a different category.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Project Categories Overview */}
            <div className="categories-overview">
              <div className="overview-content">
                <h2 className="overview-title">Project Categories</h2>
                <p className="overview-description">
                  Diverse portfolio spanning multiple technology domains
                </p>
                
                <div className="categories-grid">
                  <div className={`category-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
                    <div className="category-icon">
                      <i className="fas fa-cloud"></i>
                    </div>
                    <h3 className="category-title">Cloud Infrastructure</h3>
                    <p className="category-description">
                      Scalable cloud solutions and infrastructure automation using modern IaC practices
                    </p>
                    <div className="category-tech">
                      <span className="tech-tag">Terraform</span>
                      <span className="tech-tag">AWS</span>
                      <span className="tech-tag">Azure</span>
                    </div>
                  </div>
                  
                  <div className={`category-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                    <div className="category-icon">
                      <i className="fas fa-cogs"></i>
                    </div>
                    <h3 className="category-title">DevOps Tools</h3>
                    <p className="category-description">
                      CI/CD pipelines and automation frameworks for streamlined development workflows
                    </p>
                    <div className="category-tech">
                      <span className="tech-tag">Jenkins</span>
                      <span className="tech-tag">GitLab CI</span>
                      <span className="tech-tag">Docker</span>
                    </div>
                  </div>
                  
                  <div className={`category-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                    <div className="category-icon">
                      <i className="fas fa-vial"></i>
                    </div>
                    <h3 className="category-title">Testing Frameworks</h3>
                    <p className="category-description">
                      Comprehensive testing and quality assurance tools for reliable software delivery
                    </p>
                    <div className="category-tech">
                      <span className="tech-tag">Selenium</span>
                      <span className="tech-tag">Cypress</span>
                      <span className="tech-tag">API Testing</span>
                    </div>
                  </div>
                  
                  <div className={`category-card ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                    <div className="category-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <h3 className="category-title">Monitoring & Analytics</h3>
                    <p className="category-description">
                      Observability and performance monitoring solutions for production systems
                    </p>
                    <div className="category-tech">
                      <span className="tech-tag">Prometheus</span>
                      <span className="tech-tag">Grafana</span>
                      <span className="tech-tag">ELK Stack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Statistics */}
            <div className="project-statistics">
              <div className="stats-content">
                <h2 className="stats-title">Project Impact</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{displayProjects.length}+</div>
                      <div className="stat-label">Active Projects</div>
                      <div className="stat-description">Open source contributions</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{displayProjects.reduce((sum, p) => sum + (p.stargazers_count || 0), 0)}+</div>
                      <div className="stat-label">GitHub Stars</div>
                      <div className="stat-description">Community recognition</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{displayProjects.reduce((sum, p) => sum + (p.forks_count || 0), 0)}+</div>
                      <div className="stat-label">Forks</div>
                      <div className="stat-description">Developer adoption</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">50+</div>
                      <div className="stat-label">Contributors</div>
                      <div className="stat-description">Collaborative development</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="projects-cta">
              <div className="cta-content">
                <h2 className="cta-title">Let's Build Something Amazing</h2>
                <p className="cta-description">
                  Interested in collaboration or have a project idea? Let's discuss how we can work together
                </p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn-cta-primary">
                    <i className="fas fa-envelope"></i>
                    <span>Get in Touch</span>
                  </a>
                  <a 
                    href={`https://github.com/${gitHubUsername}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-cta-secondary"
                  >
                    <i className="fab fa-github"></i>
                    <span>View All Projects</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Project;
