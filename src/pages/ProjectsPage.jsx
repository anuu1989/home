import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PortfolioSection from "../components/modern/PortfolioSection";

const ProjectsPage = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ background: "white" }}>
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Innovative Solutions</h1>
            <p className="page-subtitle">
              Showcasing cutting-edge projects in cloud infrastructure, automation,<br />
              DevOps practices, and enterprise solutions
            </p>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <section id="projects" className="section-content">
            <PortfolioSection />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default ProjectsPage;