import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const Leadership = React.lazy(() => import("../components/home/Leadership"));

const LeadershipPage = () => {
  return (
    <div className="page-container">
      <div 
        className="page-content"
        style={{ background: "white" }}
      >
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">Leadership & Management</h1>
            <p className="page-subtitle">
              Leading teams and driving successful project outcomes
            </p>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <section id="leadership" className="section-content">
            <Leadership />
          </section>
        </Suspense>
      </div>
      

    </div>
  );
};

export default LeadershipPage;