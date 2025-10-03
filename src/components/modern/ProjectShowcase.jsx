import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../ImageWithFallback';

const ProjectShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Cloud Infrastructure Automation",
      description: "Automated multi-cloud infrastructure deployment using Terraform and Kubernetes",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["AWS", "Terraform", "Kubernetes", "Docker"],
      category: "infrastructure",
      github: "https://github.com/example/project1",
      demo: "https://demo.example.com",
      featured: true
    },
    {
      id: 2,
      title: "DevOps Pipeline Platform",
      description: "Enterprise CI/CD platform with automated testing and deployment",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["Jenkins", "Docker", "AWS", "Python"],
      category: "devops",
      github: "https://github.com/example/project2",
      demo: "https://demo.example.com",
      featured: true
    },
    {
      id: 3,
      title: "Microservices Architecture",
      description: "Scalable microservices platform with service mesh and monitoring",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["Java", "Spring Boot", "Istio", "Prometheus"],
      category: "backend",
      github: "https://github.com/example/project3",
      demo: "https://demo.example.com",
      featured: false
    },
    {
      id: 4,
      title: "React Portfolio Website",
      description: "Modern, responsive portfolio website with advanced animations",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["React", "CSS3", "JavaScript", "Bootstrap"],
      category: "frontend",
      github: "https://github.com/example/project4",
      demo: "https://demo.example.com",
      featured: false
    },
    {
      id: 5,
      title: "Monitoring & Observability Stack",
      description: "Complete observability solution with metrics, logs, and traces",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["Grafana", "Prometheus", "ELK Stack", "Jaeger"],
      category: "monitoring",
      github: "https://github.com/example/project5",
      demo: "https://demo.example.com",
      featured: true
    },
    {
      id: 6,
      title: "API Gateway & Security",
      description: "Enterprise API gateway with authentication and rate limiting",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=250&fit=crop&auto=format&q=80",
      technologies: ["Kong", "OAuth2", "Redis", "Node.js"],
      category: "backend",
      github: "https://github.com/example/project6",
      demo: "https://demo.example.com",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    { id: 'infrastructure', name: 'Infrastructure', icon: 'fas fa-server' },
    { id: 'devops', name: 'DevOps', icon: 'fas fa-cogs' },
    { id: 'backend', name: 'Backend', icon: 'fas fa-database' },
    { id: 'frontend', name: 'Frontend', icon: 'fas fa-desktop' },
    { id: 'monitoring', name: 'Monitoring', icon: 'fas fa-chart-line' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="project-showcase portfolio-section">
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className={`projects-hero ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-rocket"></i>
              <span>Featured Projects</span>
            </div>
            <h1 className="hero-title">
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="hero-description">
              Showcasing 14+ years of expertise in cloud infrastructure, DevOps automation, and full-stack development. 
              From startup MVPs to enterprise-scale platforms serving millions of users.
            </p>
          </div>
        </div>

        {/* Featured Projects Carousel */}
        <div className="featured-projects mb-5">
          <div className="row">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="col-lg-4 col-md-6 mb-4">
                <div className={`modern-card project-card featured ${isVisible ? 'animate-scale-in' : ''}`}
                     style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} className="w-100" />
                    <div className="project-overlay">
                      <div className="project-actions">
                        <a href={project.github} className="modern-btn modern-btn-primary btn-sm me-2">
                          <i className="fab fa-github"></i>
                        </a>
                        <a href={project.demo} className="modern-btn modern-btn-secondary btn-sm">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      </div>
                    </div>
                    <div className="featured-badge">
                      <i className="fas fa-star"></i>
                      Featured
                    </div>
                  </div>
                  <div className="project-content p-4">
                    <h4 className="project-title modern-heading mb-3">{project.title}</h4>
                    <p className="project-description modern-text mb-3">{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Navigation Tabs */}
        <div className="skills-navigation">
          <div className="nav-wrapper">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`nav-tab ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <div className="tab-icon">
                  <i className={category.icon}></i>
                </div>
                <div className="tab-content">
                  <span className="tab-title">{category.name}</span>
                  <span className="tab-subtitle">
                    {category.id === 'all' ? 'All Categories' :
                     category.id === 'infrastructure' ? 'Cloud & Infrastructure' :
                     category.id === 'devops' ? 'CI/CD & Automation' :
                     category.id === 'backend' ? 'Server & APIs' :
                     category.id === 'frontend' ? 'UI & Experience' :
                     category.id === 'monitoring' ? 'Observability & Metrics' : 'Projects'}
                  </span>
                </div>
                <div className="tab-indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Content */}
        <div className="skills-content">
          <div className="content-header">
            <h2 className="content-title">
              {activeFilter === 'all' ? 'All Projects' : 
               categories.find(cat => cat.id === activeFilter)?.name || 'Projects'}
            </h2>
            <p className="content-subtitle">
              {activeFilter === 'all' ? 'Comprehensive portfolio of technical achievements' :
               `Specialized projects in ${categories.find(cat => cat.id === activeFilter)?.name.toLowerCase()}`}
            </p>
          </div>
          
          <div className="skills-categories">
            <div className={`skill-category ${isVisible ? 'animate' : ''}`}>
              <div className="category-header" style={{ 
                background: activeFilter === 'infrastructure' ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" :
                           activeFilter === 'devops' ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" :
                           activeFilter === 'backend' ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" :
                           activeFilter === 'frontend' ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" :
                           activeFilter === 'monitoring' ? "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" :
                           "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}>
                <div className="category-info">
                  <div className="category-icon">
                    <i className={categories.find(cat => cat.id === activeFilter)?.icon || 'fas fa-th'}></i>
                  </div>
                  <div className="category-text">
                    <h3 className="category-title">
                      {categories.find(cat => cat.id === activeFilter)?.name || 'Projects'}
                    </h3>
                    <p className="category-description">Professional projects and technical achievements</p>
                  </div>
                </div>
                <div className="category-stats">
                  <span className="skill-count">{filteredProjects.length} Projects</span>
                </div>
              </div>
              
              <div className="skills-grid">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`skill-card project-skill-card ${isVisible ? 'animate' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="skill-header">
                      <div className="project-image-small">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          fallbackText={project.category.toUpperCase()}
                          width={60}
                          height={40}
                          backgroundColor={
                            project.category === 'infrastructure' ? '#43e97b' :
                            project.category === 'devops' ? '#4facfe' :
                            project.category === 'backend' ? '#667eea' :
                            project.category === 'frontend' ? '#f093fb' :
                            project.category === 'monitoring' ? '#fa709a' :
                            '#667eea'
                          }
                        />
                      </div>
                      <div className="skill-level">
                        <span className="level-text">{project.category}</span>
                      </div>
                    </div>
                    
                    <div className="skill-body">
                      <h4 className="skill-name">{project.title}</h4>
                      <p className="skill-description mb-3">{project.description}</p>
                      
                      <div className="project-technologies mb-3">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="skill-tag">{tech}</span>
                        ))}
                      </div>
                      
                      <div className="project-actions">
                        <a href={project.github} className="project-link me-2" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github"></i>
                          Code
                        </a>
                        <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt"></i>
                          Demo
                        </a>
                      </div>
                    </div>
                    
                    <div className="skill-overlay" style={{ 
                      background: activeFilter === 'infrastructure' ? "#43e97b10" :
                                 activeFilter === 'devops' ? "#4facfe10" :
                                 activeFilter === 'backend' ? "#667eea10" :
                                 activeFilter === 'frontend' ? "#f093fb10" :
                                 activeFilter === 'monitoring' ? "#fa709a10" :
                                 "#667eea10"
                    }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <a href="https://github.com/yourusername" className="modern-btn modern-btn-primary">
            <i className="fab fa-github"></i>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;