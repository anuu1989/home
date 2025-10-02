import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const Experience = React.lazy(() => import("../components/home/Experience"));

const ExperiencePage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Professional Experience</h1>
            <p className="page-subtitle">
              My journey through different roles and companies in the tech industry
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="experience" className="section-content">
            <Experience />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default ExperiencePage;