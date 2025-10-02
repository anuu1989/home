import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Interests = React.lazy(() => import("../components/home/Interests"));

const InterestsPage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Personal Interests</h1>
            <p className="page-subtitle">
              What I enjoy doing outside of work and technology
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="interests" className="section-content">
            <Interests />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default InterestsPage;