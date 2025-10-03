import React, { useState, useEffect, useRef } from 'react';
import { gitHubLink, gitHubUsername, gitHubQuerry } from '../../editable-stuff/configurations.json';

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [animateProjects, setAnimateProjects] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateProjects(true), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateProjects(true);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${gitHubLink}${gitHubUsername}${gitHubQuerry}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos = await response.json();
      
      // Filter and process repositories
      const processedProjects = repos
        .filter(repo => !repo.fork) // Only exclude forks, keep repos without description
        .slice(0, 20) // Increase limit to show more projects
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || `A ${repo.language || 'software'} project by ${gitHubUsername}`,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
          topics: repo.topics || [],
          created_at: repo.created_at,
          size: repo.size,
          open_issues_count: repo.open_issues_count,
          default_branch: repo.default_branch,
          visibility: repo.visibility
        }));
      
      setProjects(processedProjects);
      console.log('✅ Fetched GitHub projects:', processedProjects.length);
    } catch (err) {
      console.error('❌ Error fetching GitHub projects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Shell: '#89e051',
      Dockerfile: '#384d54',
      Go: '#00ADD8',
      PHP: '#4F5D95',
      Ruby: '#701516',
      'C++': '#f34b7d',
      C: '#555555',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      Rust: '#dea584',
      Vue: '#2c3e50',
      React: '#61dafb'
    };
    return colors[language] || '#666666';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getUniqueLanguages = () => {
    const languages = projects
      .map(project => project.language)
      .filter(lang => lang)
      .filter((lang, index, arr) => arr.indexOf(lang) === index);
    return languages.slice(0, 6); // Limit to 6 languages for filter
  };

  const getProjectCategories = () => {
    const categories = [
      {
        id: 'cloud',
        title: "Cloud & Infrastructure",
        icon: "fas fa-cloud",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        description: "Cloud-native applications and infrastructure solutions",
        projects: projects.filter(p => 
          p.topics?.some(topic => ['aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes', 'terraform'].includes(topic.toLowerCase())) ||
          p.description?.toLowerCase().includes('cloud') ||
          p.description?.toLowerCase().includes('infrastructure')
        )
      },
      {
        id: 'automation',
        title: "DevOps & Automation",
        icon: "fas fa-cogs",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        description: "CI/CD pipelines and automation tools",
        projects: projects.filter(p => 
          p.topics?.some(topic => ['devops', 'ci-cd', 'automation', 'jenkins', 'github-actions'].includes(topic.toLowerCase())) ||
          p.description?.toLowerCase().includes('automation') ||
          p.description?.toLowerCase().includes('devops')
        )
      },
      {
        id: 'web',
        title: "Web Applications",
        icon: "fas fa-globe",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        description: "Full-stack web applications and APIs",
        projects: projects.filter(p => 
          p.topics?.some(topic => ['react', 'javascript', 'nodejs', 'web', 'frontend', 'backend'].includes(topic.toLowerCase())) ||
          p.language === 'JavaScript' ||
          p.language === 'TypeScript' ||
          p.language === 'HTML'
        )
      },
      {
        id: 'tools',
        title: "Tools & Utilities",
        icon: "fas fa-tools",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        description: "Development tools and utility applications",
        projects: projects.filter(p => 
          p.topics?.some(topic => ['cli', 'tool', 'utility', 'script'].includes(topic.toLowerCase())) ||
          p.language === 'Shell' ||
          p.language === 'Python'
        )
      }
    ];

    return categories.filter(cat => cat.projects.length > 0);
  };

  const getFeaturedProjects = () => {
    return projects
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by most recent
      .slice(0, 6);
  };

  const getFilteredProjects = () => {
    let filteredProjects = projects;
    
    if (searchTerm) {
      filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.language?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredProjects;
  };

  if (loading) {
    return (
      <div className="portfolio-section-clean">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <p>Loading projects from GitHub...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-section-clean">
        <div className="container">
          <div className="error-state">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Unable to load projects</h3>
            <p>Error: {error}</p>
            <button onClick={fetchGitHubProjects} className="retry-btn">
              <i className="fas fa-redo"></i>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="projects" className="portfolio-section" ref={projectsRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="projects-hero">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-rocket"></i>
              <span>Portfolio Projects</span>
            </div>
            <h1 className="hero-title">
              Building <span className="gradient-text">Innovation</span>
            </h1>
            <p className="hero-description">
              A comprehensive collection of {projects.length}+ projects showcasing expertise in cloud infrastructure, 
              automation, web development, and enterprise solutions built over 14+ years
            </p>
            
            {/* Search Bar */}
            <div className="projects-search">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search projects, technologies, or topics..."
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

            {/* GitHub Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fab fa-github"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{projects.length}</div>
                  <div className="stat-label">Public Repos</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{projects.reduce((sum, project) => sum + project.stargazers_count, 0)}</div>
                  <div className="stat-label">Total Stars</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-code-branch"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{projects.reduce((sum, project) => sum + project.forks_count, 0)}</div>
                  <div className="stat-label">Total Forks</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">2024</div>
                  <div className="stat-label">Latest Update</div>
                </div>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="hero-actions">
              <a href={`https://github.com/${gitHubUsername}`} target="_blank" rel="noopener noreferrer" className="github-btn">
                <i className="fab fa-github"></i>
                View on GitHub
              </a>
            </div>
          </div>
          
          {/* Floating Projects Preview */}
          <div className="floating-projects">
            {projects.slice(0, 8).map((project, index) => (
              <div key={project.id} className="project-bubble" style={{ animationDelay: `${index * 0.5}s` }}>
                <i className={project.language === 'JavaScript' ? 'fab fa-js-square' : 
                           project.language === 'Python' ? 'fab fa-python' :
                           project.language === 'Shell' ? 'fas fa-terminal' :
                           project.language === 'Dockerfile' ? 'fab fa-docker' :
                           'fas fa-code'}></i>
                <span>{project.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Navigation Tabs */}
        <div className="projects-navigation">
          <div className="nav-wrapper">
            {[
              { id: 'featured', icon: 'fas fa-star', title: 'Featured', subtitle: 'Top Projects' },
              { id: 'all', icon: 'fab fa-github', title: 'All Repos', subtitle: 'GitHub Portfolio' },
              { id: 'categories', icon: 'fas fa-th-large', title: 'Categories', subtitle: 'By Technology' },
              { id: 'timeline', icon: 'fas fa-clock', title: 'Timeline', subtitle: 'Chronological View' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnimateProjects(false);
                  setTimeout(() => setAnimateProjects(true), 100);
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

        {/* Featured Projects Content */}
        {activeTab === 'featured' && (
          <div className="projects-content">
            <div className="content-header">
              <h2 className="content-title">Featured Projects</h2>
              <p className="content-subtitle">
                Highlighting the most impactful and innovative projects from my portfolio
              </p>
            </div>
            
            <div className="featured-projects-grid">
              {getFeaturedProjects().map((project, index) => (
                <div 
                  key={project.id} 
                  className={`featured-project-card ${animateProjects ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="project-card-header">
                    <div className="project-icon">
                      <i className={project.language === 'JavaScript' ? 'fab fa-js-square' : 
                                   project.language === 'Python' ? 'fab fa-python' :
                                   project.language === 'Shell' ? 'fas fa-terminal' :
                                   project.language === 'Dockerfile' ? 'fab fa-docker' :
                                   'fas fa-code'}></i>
                    </div>
                    <div className="project-stats-mini">
                      <span><i className="fas fa-star"></i> {project.stargazers_count}</span>
                      <span><i className="fas fa-code-branch"></i> {project.forks_count}</span>
                    </div>
                  </div>
                  
                  <div className="project-card-body">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-meta">
                      <span className="language-tag" style={{ backgroundColor: getLanguageColor(project.language) }}>
                        {project.language || 'Mixed'}
                      </span>
                      <span className="update-date">Updated {formatDate(project.updated_at)}</span>
                    </div>
                    
                    {project.topics && project.topics.length > 0 && (
                      <div className="project-topics">
                        {project.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span key={topicIndex} className="topic-tag">{topic}</span>
                        ))}
                        {project.topics.length > 3 && (
                          <span className="topic-more">+{project.topics.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="project-card-footer">
                    <div className="project-actions">
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="action-btn">
                        <i className="fab fa-github"></i>
                        Code
                      </a>
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                          <i className="fas fa-external-link-alt"></i>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="project-overlay" style={{ 
                    background: `${getLanguageColor(project.language)}10` 
                  }}></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Repositories Content */}
        {activeTab === 'all' && (
          <div className="projects-content">
            <div className="content-header">
              <h2 className="content-title">All Repositories</h2>
              <p className="content-subtitle">
                Complete collection of public repositories from GitHub
              </p>
            </div>
            
            <div className="all-repos-grid">
              {getFilteredProjects().map((project, index) => (
                <div 
                  key={project.id} 
                  className={`repo-card ${animateProjects ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="repo-header">
                    <div className="repo-name">
                      <i className={project.language === 'JavaScript' ? 'fab fa-js-square' : 
                                   project.language === 'Python' ? 'fab fa-python' :
                                   project.language === 'Shell' ? 'fas fa-terminal' :
                                   project.language === 'Dockerfile' ? 'fab fa-docker' :
                                   'fas fa-code'}></i>
                      <h3>{project.name}</h3>
                    </div>
                    <div className="repo-stats">
                      <span><i className="fas fa-star"></i> {project.stargazers_count}</span>
                      <span><i className="fas fa-code-branch"></i> {project.forks_count}</span>
                    </div>
                  </div>
                  
                  <p className="repo-description">{project.description}</p>
                  
                  <div className="repo-footer">
                    <div className="repo-meta">
                      <span className="language-tag" style={{ backgroundColor: getLanguageColor(project.language) }}>
                        {project.language || 'Mixed'}
                      </span>
                      <span className="update-date">Updated {formatDate(project.updated_at)}</span>
                    </div>
                    <div className="repo-actions">
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
                        <i className="fab fa-github"></i>
                      </a>
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="repo-link">
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {project.topics && project.topics.length > 0 && (
                    <div className="repo-topics">
                      {project.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="topic-tag">{topic}</span>
                      ))}
                      {project.topics.length > 3 && (
                        <span className="topic-more">+{project.topics.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Content */}
        {activeTab === 'categories' && (
          <div className="projects-content">
            <div className="content-header">
              <h2 className="content-title">Project Categories</h2>
              <p className="content-subtitle">
                Projects organized by technology stack and domain expertise
              </p>
            </div>
            
            <div className="project-categories">
              {getProjectCategories().map((category, index) => (
                <div 
                  key={category.id} 
                  className={`project-category ${animateProjects ? 'animate' : ''}`}
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
                      <span className="project-count">{category.projects.length} Projects</span>
                    </div>
                  </div>
                  
                  <div className="category-projects-grid">
                    {category.projects.slice(0, 4).map((project, projectIndex) => (
                      <div
                        key={project.id}
                        className={`category-project-card ${animateProjects ? 'animate' : ''}`}
                        style={{ animationDelay: `${(index * 0.15) + (projectIndex * 0.05)}s` }}
                      >
                        <div className="project-header">
                          <h4 className="project-name">{project.name}</h4>
                          <div className="project-stats">
                            <span><i className="fas fa-star"></i> {project.stargazers_count}</span>
                          </div>
                        </div>
                        
                        <p className="project-description">{project.description}</p>
                        
                        <div className="project-footer">
                          <span className="language-tag" style={{ color: getLanguageColor(project.language) }}>
                            {project.language || 'Mixed'}
                          </span>
                          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="view-link">
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Content */}
        {activeTab === 'timeline' && (
          <div className="projects-content">
            <div className="content-header">
              <h2 className="content-title">Project Timeline</h2>
              <p className="content-subtitle">
                Chronological view of project development and evolution
              </p>
            </div>
            
            <div className="projects-timeline">
              {projects.slice(0, 10).map((project, index) => (
                <div 
                  key={project.id} 
                  className={`timeline-item ${animateProjects ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="timeline-marker">
                    <div className="timeline-dot" style={{ backgroundColor: getLanguageColor(project.language) }}>
                      <i className={project.language === 'JavaScript' ? 'fab fa-js-square' : 
                                   project.language === 'Python' ? 'fab fa-python' :
                                   project.language === 'Shell' ? 'fas fa-terminal' :
                                   'fas fa-code'}></i>
                    </div>
                  </div>
                  
                  <div className="timeline-content">
                    <div className="timeline-card">
                      <div className="timeline-header">
                        <h3 className="project-name">{project.name}</h3>
                        <span className="project-date">{formatDate(project.updated_at)}</span>
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      
                      <div className="timeline-meta">
                        <span className="language-tag" style={{ backgroundColor: getLanguageColor(project.language) }}>
                          {project.language || 'Mixed'}
                        </span>
                        <div className="project-stats">
                          <span><i className="fas fa-star"></i> {project.stargazers_count}</span>
                          <span><i className="fas fa-code-branch"></i> {project.forks_count}</span>
                        </div>
                      </div>
                      
                      <div className="timeline-actions">
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="timeline-btn">
                          <i className="fab fa-github"></i>
                          View Code
                        </a>
                        {project.homepage && (
                          <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="timeline-btn primary">
                            <i className="fas fa-external-link-alt"></i>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Summary */}
        <div className="projects-summary">
          <div className="summary-content">
            <h2 className="summary-title">Development Impact</h2>
            <p className="summary-description">
              Leveraging diverse technologies and methodologies to deliver exceptional solutions
            </p>
            
            <div className="impact-metrics">
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">{projects.length}+</div>
                  <div className="metric-label">Projects Built</div>
                  <div className="metric-description">Across multiple domains</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">{projects.reduce((sum, project) => sum + project.stargazers_count, 0)}+</div>
                  <div className="metric-label">GitHub Stars</div>
                  <div className="metric-description">Community recognition</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">50+</div>
                  <div className="metric-label">Contributors</div>
                  <div className="metric-description">Collaborative development</div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-download"></i>
                </div>
                <div className="metric-content">
                  <div className="metric-number">10K+</div>
                  <div className="metric-label">Downloads</div>
                  <div className="metric-description">Real-world usage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;