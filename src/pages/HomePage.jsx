import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const MainBody = React.lazy(() => import("../components/home/MainBody"));

const HomePage = () => {
  return (
    <div className="page-container home-page">
      <div className="page-content home-content">
    
        <Suspense fallback={<LoadingSpinner />}>
          <section className="hero-section">
            <MainBody />
          </section>
        </Suspense>

        {/* Section Divider with Logo */}
        <div className="section-logo-divider">
          <img src="/logo_av_navbar.svg" alt="" aria-hidden="true" />
        </div>

        {/* Experience Highlights Section */}
        <section className="experience-highlights" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "800",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#0f172a",
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem"
              }}>
                15+ Years of <span className="gradient-text">Excellence</span>
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem", 
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.7"
              }}>Proven track record of delivering results across diverse industries and technologies</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center h-100">
                  <div className="stat-icon mb-3" style={{ fontSize: '1.5rem', color: '#667eea' }}>
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '800', fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.25rem' }}>15+</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.95rem', color: '#334155', marginBottom: '0.25rem' }}>Years Experience</p>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Since 2011</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center h-100">
                  <div className="stat-icon mb-3" style={{ fontSize: '1.5rem', color: '#8b5cf6' }}>
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '800', fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.25rem' }}>25+</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.95rem', color: '#334155', marginBottom: '0.25rem' }}>Engineers Mentored</p>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Across multiple teams</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center h-100">
                  <div className="stat-icon mb-3" style={{ fontSize: '1.5rem', color: '#ec4899' }}>
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '800', fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.25rem' }}>100+</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.95rem', color: '#334155', marginBottom: '0.25rem' }}>Projects Delivered</p>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>From startups to enterprise</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center h-100">
                  <div className="stat-icon mb-3" style={{ fontSize: '1.5rem', color: '#10b981' }}>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '800', fontSize: '2.25rem', color: '#0f172a', marginBottom: '0.25rem' }}>$2M+</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.95rem', color: '#334155', marginBottom: '0.25rem' }}>Cost Savings</p>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Through optimization</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider with Logo */}
        <div className="section-logo-divider">
          <img src="/logo_av_navbar.svg" alt="" aria-hidden="true" />
        </div>

        {/* Quick Navigation Section */}
        <section className="home-navigation" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "800",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#0f172a",
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem"
              }}>
                Explore My <span className="gradient-text">Portfolio</span>
              </h2>
              <p style={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem", 
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.7"
              }}>Discover my 15+ year journey, skills, and achievements in technology leadership</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/about" className="nav-card modern-card p-4 text-decoration-none d-block text-center h-100">
                  <div className="nav-icon mb-3" style={{ fontSize: '1.5rem', color: '#667eea' }}>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>About Me</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748b', marginBottom: '0' }}>My background, skills, and journey</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/skills" className="nav-card modern-card p-4 text-decoration-none d-block text-center h-100">
                  <div className="nav-icon mb-3" style={{ fontSize: '1.5rem', color: '#8b5cf6' }}>
                    <i className="fas fa-code"></i>
                  </div>
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Skills</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748b', marginBottom: '0' }}>Technical expertise and certifications</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/projects" className="nav-card modern-card p-4 text-decoration-none d-block text-center h-100">
                  <div className="nav-icon mb-3" style={{ fontSize: '1.5rem', color: '#ec4899' }}>
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Projects</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748b', marginBottom: '0' }}>Featured work and achievements</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/contact" className="nav-card modern-card p-4 text-decoration-none d-block text-center h-100">
                  <div className="nav-icon mb-3" style={{ fontSize: '1.5rem', color: '#10b981' }}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700', fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Contact</h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#64748b', marginBottom: '0' }}>Let's discuss opportunities</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
