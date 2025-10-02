import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const Responsibilities = React.lazy(() => import("../components/home/Responsibilities"));

const ResponsibilitiesPage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Key Responsibilities</h1>
            <p className="page-subtitle">
              Core duties and achievements in my professional roles
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="responsibilities" className="section-content">
            <Responsibilities />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default ResponsibilitiesPage;