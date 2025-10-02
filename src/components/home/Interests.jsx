import { useState, useEffect, useRef } from "react";

const Interests = () => {
  const [animateContent, setAnimateContent] = useState(false);
  const [activeInterest, setActiveInterest] = useState(0);
  const interestsRef = useRef(null);

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

    if (interestsRef.current) {
      observer.observe(interestsRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const interests = [
    {
      title: "Fitness & Wellness",
      icon: "fas fa-dumbbell",
      color: "#667eea",
      description: "Passionate about maintaining physical and mental well-being through structured fitness routines and mindful practices.",
      details: [
        "Certified fitness and nutrition specialist from INFS",
        "Regular strength training and cardio routines",
        "Mindfulness and meditation practices",
        "Holistic approach to health and wellness"
      ],
      link: {
        text: "INFS Certification",
        url: "https://infs.co.in"
      }
    },
    {
      title: "Continuous Learning",
      icon: "fas fa-graduation-cap",
      color: "#764ba2",
      description: "Always exploring new technologies, industry trends, and best practices to stay at the forefront of innovation.",
      details: [
        "Regular reading of tech publications and research papers",
        "Attending conferences and webinars",
        "Hands-on experimentation with emerging technologies",
        "Contributing to open-source projects and communities"
      ],
      link: {
        text: "InfoQ",
        url: "https://www.infoq.com"
      }
    },
    {
      title: "Travel & Culture",
      icon: "fas fa-globe-americas",
      color: "#f093fb",
      description: "Exploring diverse cultures and destinations to gain new perspectives and broaden understanding of the world.",
      details: [
        "Visited 5+ countries across different continents",
        "Cultural immersion and local cuisine exploration",
        "Photography and travel documentation",
        "Planning future adventures and destinations"
      ],
      stats: "5+ Countries Visited"
    },
    {
      title: "Culinary Arts",
      icon: "fas fa-utensils",
      color: "#4facfe",
      description: "Experimenting with international cuisines and cooking techniques as a creative outlet and social activity.",
      details: [
        "International cuisine experimentation",
        "Hosting dinner parties and cooking for friends",
        "Learning traditional cooking techniques",
        "Exploring the intersection of food and culture"
      ],
      stats: "15+ Cuisines Mastered"
    }
  ];

  const personalValues = [
    {
      value: "Growth Mindset",
      icon: "fas fa-seedling",
      description: "Embracing challenges as opportunities to learn and improve"
    },
    {
      value: "Work-Life Balance",
      icon: "fas fa-balance-scale",
      description: "Maintaining harmony between professional excellence and personal fulfillment"
    },
    {
      value: "Community Impact",
      icon: "fas fa-hands-helping",
      description: "Contributing positively to communities through knowledge sharing and mentorship"
    },
    {
      value: "Innovation",
      icon: "fas fa-lightbulb",
      description: "Constantly seeking creative solutions and new approaches to challenges"
    }
  ];

  return (
    <div id="interests" className="portfolio-section" ref={interestsRef}>
      <div className="container-fluid px-4">
        {/* Hero Section */}
        <div className="interests-hero">
          <div className="hero-content">
            <div className={`hero-badge ${animateContent ? 'animate' : ''}`}>
              <i className="fas fa-heart"></i>
              <span>Personal Interests</span>
            </div>
            <h1 className={`hero-title ${animateContent ? 'animate' : ''}`}>
              Beyond <span className="gradient-text">Technology</span>
            </h1>
            <p className={`hero-description ${animateContent ? 'animate' : ''}`}>
              Exploring passions that drive creativity, personal growth, and well-being 
              while maintaining a balanced and fulfilling lifestyle
            </p>
          </div>
        </div>

        {/* Interest Navigation */}
        <div className="interest-navigation">
          <div className="nav-wrapper">
            {interests.map((interest, index) => (
              <button
                key={index}
                className={`interest-nav-btn ${activeInterest === index ? 'active' : ''}`}
                onClick={() => setActiveInterest(index)}
                style={{ '--interest-color': interest.color }}
              >
                <div className="nav-icon">
                  <i className={interest.icon}></i>
                </div>
                <span className="nav-title">{interest.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Interest View */}
        <div className="interest-details">
          {interests.map((interest, index) => (
            <div
              key={index}
              className={`interest-detail-card ${activeInterest === index ? 'active' : ''} ${animateContent ? 'animate' : ''}`}
              style={{ display: activeInterest === index ? 'block' : 'none' }}
            >
              <div className="detail-header">
                <div className="interest-info">
                  <div className="interest-icon-large" style={{ backgroundColor: interest.color }}>
                    <i className={interest.icon}></i>
                  </div>
                  <div className="interest-content">
                    <h2 className="interest-title-large">{interest.title}</h2>
                    <p className="interest-description-large">{interest.description}</p>
                    {interest.stats && (
                      <div className="interest-stats-badge" style={{ backgroundColor: interest.color }}>
                        {interest.stats}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="interest-details-grid">
                {interest.details.map((detail, detailIndex) => (
                  <div 
                    key={detailIndex} 
                    className={`detail-item-card ${animateContent ? 'animate' : ''}`}
                    style={{ animationDelay: `${detailIndex * 0.1}s` }}
                  >
                    <div className="detail-icon" style={{ backgroundColor: interest.color }}>
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="detail-content">
                      <p className="detail-text">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {interest.link && (
                <div className="interest-link-section">
                  <a 
                    href={interest.link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="external-link-btn"
                    style={{ borderColor: interest.color, color: interest.color }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>{interest.link.text}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interests Overview Grid */}
        <div className="interests-overview">
          <div className="overview-content">
            <h2 className="overview-title">Interest Areas</h2>
            <p className="overview-description">
              Diverse passions that contribute to personal and professional growth
            </p>
            
            <div className="overview-grid">
              {interests.map((interest, index) => (
                <div 
                  key={index}
                  className={`overview-card ${animateContent ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="overview-icon" style={{ backgroundColor: interest.color }}>
                    <i className={interest.icon}></i>
                  </div>
                  <h3 className="overview-interest">{interest.title}</h3>
                  <div className="overview-count">{interest.details.length} Activities</div>
                  <div className="overview-progress">
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: animateContent ? '100%' : '0%',
                        backgroundColor: interest.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Values */}
        <div className="personal-values">
          <div className="values-content">
            <h2 className="values-title">Core Values</h2>
            <p className="values-description">
              Fundamental principles that guide personal and professional decisions
            </p>
            
            <div className="values-grid">
              {personalValues.map((value, index) => (
                <div 
                  key={index}
                  className={`value-card ${animateContent ? 'animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="value-icon">
                    <i className={value.icon}></i>
                  </div>
                  <h3 className="value-name">{value.value}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inspiration Quote */}
        <div className="inspiration-section">
          <div className="quote-container">
            <div className="quote-decoration">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
            </div>
            <blockquote className="inspiration-quote">
              "The best way to predict the future is to create it. Whether in technology or life, 
              I believe in continuous learning, meaningful connections, and making a positive impact."
            </blockquote>
            <div className="quote-author">Personal Philosophy</div>
          </div>
        </div>

        {/* Interest Statistics */}
        <div className="interest-statistics">
          <div className="stats-content">
            <h2 className="stats-title">Personal Journey</h2>
            <p className="stats-description">
              Quantifying the pursuit of diverse interests and continuous growth
            </p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-book-reader"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Books Read Annually</div>
                  <div className="stat-description">Continuous learning and knowledge expansion</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-camera"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Travel Photos</div>
                  <div className="stat-description">Capturing memories and experiences</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Cuisines Explored</div>
                  <div className="stat-description">Cultural exploration through food</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Fitness Journey</div>
                  <div className="stat-description">Commitment to health and wellness</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Interests;
