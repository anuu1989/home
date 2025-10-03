import React, { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ContactSection from "../components/modern/ContactSection";

const ContactPage = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ background: "white" }}>
        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  );
};

export default ContactPage;