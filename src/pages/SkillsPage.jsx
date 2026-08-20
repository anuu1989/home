import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";

const Skills = React.lazy(() => import("../components/home/Skills"));

const SkillsPage = () => (
  <div>
    <PageHeader title="Skills & Expertise" subtitle="15+ years of hands-on technical skills, core responsibilities, leadership, and certifications across the full stack" />
    <Suspense fallback={<LoadingSpinner />}>
      <Skills />
    </Suspense>
  </div>
);

export default SkillsPage;
