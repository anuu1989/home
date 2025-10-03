import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import AboutSection from "../components/modern/AboutSection";

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ background: "white" }}>
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">About Me</h1>
            <p className="page-subtitle">
              Get to know more about my background, skills, and passion for technology
            </p>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <section id="about" className="section-content">
            <AboutSection />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default AboutPage;