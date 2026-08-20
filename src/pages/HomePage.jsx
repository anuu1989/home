import React, { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Reveal from "../components/Reveal";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { gitHubLink, gitHubUsername, gitHubQuerry } from "../editable-stuff/configurations.json";

const MainBody = React.lazy(() => import("../components/home/MainBody"));

const QUICK_LINKS = [
  { to: "/about", icon: "fas fa-user-circle", title: "About Me", desc: "My background, skills, and journey" },
  { to: "/skills", icon: "fas fa-code", title: "Skills & Expertise", desc: "Technical skills, responsibilities, and certifications" },
  { to: "/projects", icon: "fas fa-diagram-project", title: "Projects", desc: "Featured work and achievements" },
  { to: "/contact", icon: "fas fa-envelope", title: "Contact", desc: "Let's discuss opportunities" },
];

const formatRelative = (dateString) => {
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

const HomePage = () => {
  useDocumentTitle('Cloud, DevOps and Platform Engineering', "Anurag Vaidhya's portfolio — cloud infrastructure, DevOps, and platform engineering leadership.");
  const [recentRepos, setRecentRepos] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${gitHubLink}${gitHubUsername}${gitHubQuerry}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((repos) => {
        if (cancelled || !Array.isArray(repos)) return;
        const recent = repos
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 3);
        setRecentRepos(recent);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
  <div>
    <Suspense fallback={<LoadingSpinner />}>
      <MainBody />
    </Suspense>

    {recentRepos && recentRepos.length > 0 && (
      <Reveal as="section" className="section-sm container" stagger>
        <div className="spread" style={{ marginBottom: "var(--space-lg)", flexWrap: "wrap" }}>
          <span className="cluster" style={{ "--gap": "0.5rem" }}>
            <span className="pulse-dot"></span>
            <span className="section-kicker" style={{ marginBottom: 0 }}>Recently shipped</span>
          </span>
          <a href="/projects" className="btn btn-ghost btn-sm">
            View all projects <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="grid grid-3">
          {recentRepos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="card card-hover card-pad">
              <div className="spread" style={{ marginBottom: "var(--space-2xs)" }}>
                <h3 style={{ fontSize: "var(--fs-md)", fontFamily: "var(--font-mono)" }}>{repo.name}</h3>
                {repo.language && <span className="tag">{repo.language}</span>}
              </div>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-2xs)" }}>
                {repo.description || `A ${repo.language || "software"} project`}
              </p>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)" }}>
                Updated {formatRelative(repo.updated_at)}
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    )}

    <Reveal as="section" className="section container" stagger>
      <div className="section-header centered">
        <span className="section-kicker">Quick links</span>
        <h2 className="section-title">Explore My Portfolio</h2>
      </div>
      <div className="grid grid-4">
        {QUICK_LINKS.map((link) => (
          <a key={link.to} href={link.to} className="card card-hover quicknav-card">
            <span className="icon-tile"><i className={link.icon}></i></span>
            <h3>{link.title}</h3>
            <p>{link.desc}</p>
          </a>
        ))}
      </div>
    </Reveal>
  </div>
  );
};

export default HomePage;
