import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { showBlog, FirstName, LastName } from "../editable-stuff/configurations.json";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { to: "/", label: "Welcome" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/leadership", label: "Leadership" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/interests", label: "Interests" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ onOpenCommandPalette }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const items = showBlog ? [...NAV_ITEMS, { to: "/blog", label: "Blog" }] : NAV_ITEMS;

  return (
    <>
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label={`${FirstName}'s Portfolio Home`}>
          <img src="/logo_av_navbar.svg" alt="" />
          <span className="navbar-brand-title">
            {FirstName} {LastName}
            <span className="navbar-brand-sub">Senior Tech Leader</span>
          </span>
        </Link>

        <div className="navbar-links">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`navbar-link ${location.pathname === item.to ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button type="button" className="cmdk-trigger" onClick={onOpenCommandPalette} aria-label="Open command palette">
            <i className="fas fa-search cmdk-trigger-icon" aria-hidden="true"></i>
            <span>Search</span>
            <kbd>&#8984;K</kbd>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
          >
            <i className={resolvedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </nav>

    <div className={`navbar-mobile ${isMenuOpen ? "open" : ""}`}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`navbar-mobile-link ${location.pathname === item.to ? "active" : ""}`}
        >
          {item.label}
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </Link>
      ))}
    </div>
    </>
  );
};

export default Navbar;
