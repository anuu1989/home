import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";

const Experience = React.lazy(() => import("../components/home/Experience"));

const ExperiencePage = () => (
  <div>
    <PageHeader title="Professional Experience" subtitle="15+ years of progressive growth through different roles and companies in the tech industry" />
    <Suspense fallback={<LoadingSpinner />}>
      <Experience />
    </Suspense>
  </div>
);

export default ExperiencePage;
