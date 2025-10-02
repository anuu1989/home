import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { showBlog, FirstName } from "../editable-stuff/configurations.json";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { href: "/", label: "Welcome", icon: "fas fa-home", route: "/" },
    { href: "/about", label: "My Story", icon: "fas fa-user-circle", route: "/about" },
    { href: "/experience", label: "Journey", icon: "fas fa-route", route: "/experience" },
    { href: "/responsibilities", label: "Expertise", icon: "fas fa-star", route: "/responsibilities" },
    { href: "/leadership", label: "Leadership", icon: "fas fa-users-cog", route: "/leadership" },
    { href: "/projects", label: "Portfolio", icon: "fas fa-rocket", route: "/projects" },
    { href: "/skills", label: "Tech Stack", icon: "fas fa-code", route: "/skills" },
    { href: "/interests", label: "Beyond Code", icon: "fas fa-compass", route: "/interests" },
  ];

  // Handle scroll effects and route changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <nav
      className={`modern-navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand-container">
          <Link
            className="navbar-brand"
            to="/"
            aria-label={`${FirstName}'s Portfolio Home`}
            onClick={handleNavClick}
          >
            <div className="brand-logo">
              <span className="brand-bracket">&lt;</span>
              <span className="brand-name">{FirstName}</span>
              <span className="brand-bracket">/&gt;</span>
            </div>
            <div className="brand-subtitle">Infrasmith</div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav-desktop">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  className={`nav-link ${activeRoute === item.route ? "active" : ""}`}
                  to={item.route}
                  onClick={handleNavClick}
                  aria-label={`Navigate to ${item.label} page`}
                >
                  <span className="nav-text">{item.label}</span>
                  <div className="nav-indicator"></div>
                </Link>
              </li>
            ))}

            {showBlog && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/blog"
                  aria-label="Navigate to blog"
                >
                  <span className="nav-text">Blog</span>
                  <div className="nav-indicator"></div>
                </Link>
              </li>
            )}
          </ul>

          {/* CTA Button */}
          <div className="navbar-cta">
            <a
              href="mailto:anuragvaidhya786@gmail.com?subject=Let's Connect - Portfolio Inquiry&body=Hi Anurag,%0D%0A%0D%0AI came across your portfolio and would like to connect with you.%0D%0A%0D%0ABest regards,"
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Let's Connect</span>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={toggleMenu}
          aria-controls="mobileNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`} id="mobileNav">
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <div className="mobile-brand">
                <span className="brand-bracket">&lt;</span>
                <span className="brand-name">{FirstName}</span>
                <span className="brand-bracket">/&gt;</span>
              </div>
              <button
                className="mobile-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li key={item.href} className="mobile-nav-item" style={{ "--delay": `${index * 0.1}s` }}>
                  <Link
                    className={`mobile-nav-link ${activeRoute === item.route ? "active" : ""}`}
                    to={item.route}
                    onClick={handleNavClick}
                    aria-label={`Navigate to ${item.label} page`}
                  >
                    <div className="mobile-nav-icon">
                      <i className={item.icon}></i>
                    </div>
                    <span className="mobile-nav-text">{item.label}</span>
                    <div className="mobile-nav-arrow">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </Link>
                </li>
              ))}

              {showBlog && (
                <li className="mobile-nav-item" style={{ "--delay": `${navItems.length * 0.1}s` }}>
                  <Link
                    className="mobile-nav-link"
                    to="/blog"
                    onClick={closeMenu}
                    aria-label="Navigate to blog"
                  >
                    <div className="mobile-nav-icon">
                      <i className="fas fa-blog"></i>
                    </div>
                    <span className="mobile-nav-text">Blog</span>
                    <div className="mobile-nav-arrow">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </Link>
                </li>
              )}
            </ul>

            <div className="mobile-nav-footer">
              <a
                href="mailto:anuragvaidhya786@gmail.com?subject=Let's Connect - Portfolio Inquiry&body=Hi Anurag,%0D%0A%0D%0AI came across your portfolio and would like to connect with you.%0D%0A%0D%0ABest regards,"
                className="mobile-cta-button"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
              >
                <span>Let's Connect</span>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};


export default Navbar;
