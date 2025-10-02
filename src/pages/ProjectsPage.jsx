import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const Project = React.lazy(() => import("../components/home/Project"));

const ProjectsPage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Featured Projects</h1>
            <p className="page-subtitle">
              Showcasing my latest work and technical achievements
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="projects" className="section-content">
            <Project />
          </section>
        </Suspense>
      </div>
      

    </div>
  );
};

export default ProjectsPage;