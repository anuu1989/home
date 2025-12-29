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