import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const MainBody = React.lazy(() => import("../components/home/MainBody"));

const HomePage = () => {
  return (
    <div className="page-container home-page">
      <div className="page-content home-content">
        {/* Availability Banner */}
        <section style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "1.5rem 0",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "600"
                }}>
                  <span style={{
                    width: "12px",
                    height: "12px",
                    background: "#48bb78",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                    boxShadow: "0 0 0 0 rgba(72, 187, 120, 0.7)"
                  }}></span>
                  <span>Actively looking for new opportunities</span>
                  <a href="/contact" style={{
                    background: "white",
                    color: "#667eea",
                    padding: "0.75rem 2rem",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: "700",
                    marginLeft: "1rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "2px solid white"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px) scale(1.05)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                    e.target.style.background = "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";
                    e.target.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                    e.target.style.background = "white";
                    e.target.style.color = "#667eea";
                  }}>
                    <i className="fas fa-envelope" style={{ fontSize: "1rem" }}></i>
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<LoadingSpinner />}>
          <section className="hero-section">
            <MainBody />
          </section>
        </Suspense>

        {/* Experience Highlights Section */}
        <section className="experience-highlights py-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
          <div className="container">
            <div className="row text-center mb-5">
              <div className="col-12">
                <h2 className="modern-heading stat-number" style={{ fontWeight: "700", fontSize: "2.5rem" }}>14+ Years of Excellence</h2>
                <p className="stat-number" style={{ 
                  fontSize: "1.125rem", 
                  fontWeight: "700", 
                  margin: "0"
                }}>Proven track record of delivering results across diverse industries and technologies</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center">
                  <div className="stat-icon mb-3">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h3 className="stat-number">14+</h3>
                  <p className="stat-label stat-number">Years Experience</p>
                  <small className="text-muted">Since 2010</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center">
                  <div className="stat-icon mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="stat-number">25+</h3>
                  <p className="stat-label stat-number">Engineers Mentored</p>
                  <small className="text-muted">Across multiple teams</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center">
                  <div className="stat-icon mb-3">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h3 className="stat-number">100+</h3>
                  <p className="stat-label stat-number">Projects Delivered</p>
                  <small className="text-muted">From startups to enterprise</small>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="experience-stat modern-card p-4 text-center">
                  <div className="stat-icon mb-3">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3 className="stat-number">$2M+</h3>
                  <p className="stat-label stat-number">Cost Savings</p>
                  <small className="text-muted">Through optimization</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
        <section className="home-navigation py-5" style={{ background: "white" }}>
          <div className="container">
            <div className="row text-center">
              <div className="col-12 mb-4">
                <h2 className="modern-heading">Explore My Portfolio</h2>
                <p className="modern-text">Discover my 14+ year journey, skills, and achievements in technology leadership</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/about" className="nav-card modern-card p-4 text-decoration-none">
                  <div className="nav-icon mb-3">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h4 className="modern-heading mb-2">About Me</h4>
                  <p className="modern-text">My background, skills, and journey</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/skills" className="nav-card modern-card p-4 text-decoration-none">
                  <div className="nav-icon mb-3">
                    <i className="fas fa-code"></i>
                  </div>
                  <h4 className="modern-heading mb-2">Skills</h4>
                  <p className="modern-text">Technical expertise and certifications</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/projects" className="nav-card modern-card p-4 text-decoration-none">
                  <div className="nav-icon mb-3">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h4 className="modern-heading mb-2">Projects</h4>
                  <p className="modern-text">Featured work and achievements</p>
                </a>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <a href="/contact" className="nav-card modern-card p-4 text-decoration-none">
                  <div className="nav-icon mb-3">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4 className="modern-heading mb-2">Contact</h4>
                  <p className="modern-text">Let's discuss opportunities</p>
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