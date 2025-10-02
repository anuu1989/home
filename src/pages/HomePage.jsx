import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionDivider from "../components/SectionDivider";

const MainBody = React.lazy(() => import("../components/home/MainBody"));

const HomePage = () => {
  return (
    <div className="page-container home-page">
      <div 
        className="page-content home-content"
        style={{ background: "white" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <section className="hero-section">
            <MainBody />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;