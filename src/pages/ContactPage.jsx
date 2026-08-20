import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import ContactSection from "../components/modern/ContactSection";

const ContactPage = () => (
  <div>
    <PageHeader title="Let's Connect" subtitle="With 15+ years in technology leadership, I'm ready to discuss your next project, share insights, or explore collaboration opportunities." />
    <Suspense fallback={<LoadingSpinner />}>
      <ContactSection />
    </Suspense>
  </div>
);

export default ContactPage;
