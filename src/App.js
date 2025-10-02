import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { showNavigationbar, showBlog } from "./editable-stuff/configurations.json";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/home/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import SectionWrapper from "./components/SectionWrapper";
import SectionNavigation from "./components/SectionNavigation";
import ScrollToTop from "./components/ScrollToTop";
import { useAnalytics } from "./hooks/useAnalytics";

// Lazy load page components for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ResponsibilitiesPage = lazy(() => import("./pages/ResponsibilitiesPage"));
const LeadershipPage = lazy(() => import("./pages/LeadershipPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const InterestsPage = lazy(() => import("./pages/InterestsPage"));

// Lazy load blog components only if blog is enabled
const Blog = showBlog ? lazy(() => import("./components/blog/Blog")) : null;
const BlogPost = showBlog ? lazy(() => import("./components/blog/BlogPost")) : null;

// Page wrapper component for consistent layout
const PageWrapper = ({ children }) => {
  return (
    <main className="main-content">
      {children}
    </main>
  );
};

// 404 Not Found component
const NotFound = () => (
  <div className="container mt-5 pt-5 text-center">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="display-1 text-muted">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="lead mb-4">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="btn btn-primary">
          <i className="fas fa-home"></i> Go Home
        </a>
      </div>
    </div>
  </div>
);

// Main App Router Component
const AppRouter = () => {
  const { trackEvent } = useAnalytics();

  // Track navigation events
  const handleRouteChange = (path) => {
    trackEvent('navigation', { path });
  };

  return (
    <div className="App">
      <ScrollToTop />
      {showNavigationbar && <Navbar />}

      <Routes>
        {/* Home/Landing Page */}
        <Route 
          path="/" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
              </Suspense>
            </PageWrapper>
          } 
        />

        {/* Individual Section Pages */}
        <Route 
          path="/about" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <AboutPage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/experience" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <ExperiencePage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/responsibilities" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <ResponsibilitiesPage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/leadership" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <LeadershipPage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/projects" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <ProjectsPage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/skills" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <SkillsPage />
              </Suspense>
            </PageWrapper>
          } 
        />
        
        <Route 
          path="/interests" 
          element={
            <PageWrapper>
              <Suspense fallback={<LoadingSpinner />}>
                <InterestsPage />
              </Suspense>
            </PageWrapper>
          } 
        />

        {/* Blog routes - only if blog is enabled */}
        {showBlog && Blog && (
          <>
            <Route
              path="/blog"
              element={
                <PageWrapper>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Blog />
                  </Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <PageWrapper>
                  <Suspense fallback={<LoadingSpinner />}>
                    <BlogPost />
                  </Suspense>
                </PageWrapper>
              }
            />
          </>
        )}

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <AppRouter />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
