import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import PortfolioSection from "../components/modern/PortfolioSection";

const ProjectsPage = () => (
  <div>
    <PageHeader title="Innovative Solutions" subtitle="Showcasing cutting-edge projects in cloud infrastructure, automation, DevOps practices, and enterprise solutions" />
    <Suspense fallback={<LoadingSpinner />}>
      <PortfolioSection />
    </Suspense>
  </div>
);

export default ProjectsPage;
