import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const Skills = React.lazy(() => import("../components/home/Skills"));

const SkillsPage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Technical Skills</h1>
            <p className="page-subtitle">
              14+ years of expertise with cutting-edge technologies, tools, and frameworks across the full stack
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="skills" className="section-content">
            <Skills />
          </section>
        </Suspense>
      </div>
      

    </div>
  );
};

export default SkillsPage;