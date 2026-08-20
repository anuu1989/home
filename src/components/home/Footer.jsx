import React from "react";
import useVisitorCounter from "../../hooks/useVisitorCounter";

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/anuu1989", icon: "fab fa-github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/anurag-vaidhya-47b93222", icon: "fab fa-linkedin" },
  { name: "Email", url: "mailto:anuragvaidhya786@gmail.com", icon: "fas fa-envelope" },
];

const Footer = () => {
  const { visitorCount, isLoading } = useVisitorCounter();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="mailto:anuragvaidhya786@gmail.com" className="footer-email">
            <i className="fas fa-envelope" aria-hidden="true"></i>
            anuragvaidhya786@gmail.com
          </a>
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`Connect on ${social.name}`}
              >
                <i className={social.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <img src="/logo_av_navbar.svg" alt="" />
            <div>
              <span className="footer-brand-name">Anurag Vaidhya</span>
              <span className="footer-brand-loc">Melbourne, Australia</span>
            </div>
          </div>

          <div className="footer-meta">
            <span className="visitor-counter">
              <i className="fas fa-users" aria-hidden="true"></i>
              {isLoading ? "..." : `${visitorCount} visitors`}
            </span>
            <span>&copy; {new Date().getFullYear()} Anurag Vaidhya. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
