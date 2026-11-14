import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PAGES } from "../data/profile";

/* Classic edit distance — catches typos like /expereince or /skils. */
const levenshtein = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
};

const slugOf = (to) => (to === "/" ? "home" : to.slice(1));

/** Ranks known pages by how close they are to the path the visitor tried. */
const suggestPages = (pathname) => {
  const tried = decodeURIComponent(pathname).toLowerCase().replace(/^\/+|\/+$/g, "").split("/")[0] || "";
  if (!tried) return [];
  return PAGES.map((p) => {
    const slug = slugOf(p.to);
    const distance = slug.startsWith(tried) || tried.startsWith(slug) ? 0 : levenshtein(tried, slug);
    return { ...p, slug, distance };
  })
    .filter((p) => p.distance <= Math.max(2, Math.floor(p.slug.length / 3)))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2);
};

const POPULAR = ["/experience", "/projects", "/skills", "/contact"];

/** Types the terminal lines out once; instant when reduced motion is preferred. */
const useTypedLines = (lines, speed = 28) => {
  const [shown, setShown] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? lines : lines.map(() => "")
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let line = 0;
    let char = 0;
    const id = setInterval(() => {
      if (line >= lines.length) {
        clearInterval(id);
        return;
      }
      char += 1;
      // Snapshot the loop position: the updater runs later, after line/char have moved on.
      const lineIndex = line;
      const text = lines[lineIndex].slice(0, char);
      setShown((prev) => prev.map((existing, i) => (i === lineIndex ? text : existing)));
      if (char >= lines[line].length) {
        line += 1;
        char = 0;
      }
    }, speed);
    return () => clearInterval(id);
  }, [lines, speed]);

  return shown;
};

const NotFound = ({ onSearch }) => {
  const location = useLocation();
  useDocumentTitle("404 · Page not found", "This page drifted out of orbit.");

  const path = location.pathname;
  const suggestions = useMemo(() => suggestPages(path), [path]);
  const popular = PAGES.filter((p) => POPULAR.includes(p.to));

  const lines = useMemo(
    () => [
      `$ curl -I https://anuragvaidhya.com${path}`,
      "HTTP/2 404",
      "x-served-by: edge-melbourne-1",
      `$ kubectl get page ${slugOf(path).slice(0, 28) || "?"}`,
      `Error from server (NotFound): pages "${slugOf(path).slice(0, 28)}" not found`,
    ],
    [path]
  );
  const typed = useTypedLines(lines);

  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf-sky" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="nf-star" style={{ "--i": i, left: `${(i * 37) % 100}%`, top: `${(i * 53 + 7) % 100}%` }} />
        ))}
      </div>

      <div className="container nf-grid">
        <div className="nf-copy">
          <span className="nf-kicker">
            <span className="nf-dot" aria-hidden="true" /> Error 404 · Route not found
          </span>

          <h1 id="nf-title" className="nf-code" data-text="404">404</h1>

          <h2 className="nf-title">This page drifted out of orbit.</h2>
          <p className="nf-sub">
            <code className="nf-path">{path}</code> isn&apos;t deployed anywhere in this cluster. It may have been
            moved, renamed, or never existed.
          </p>

          {suggestions.length > 0 && (
            <div className="nf-suggest" role="status">
              <span className="nf-suggest-label">Did you mean</span>
              {suggestions.map((s) => (
                <Link key={s.to} to={s.to} className="nf-suggest-link">
                  <i className={s.icon} aria-hidden="true" /> {s.to}
                </Link>
              ))}
            </div>
          )}

          <div className="nf-actions">
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-house" aria-hidden="true" /> Back to home
            </Link>
            {onSearch && (
              <button type="button" className="btn btn-secondary" onClick={onSearch}>
                <i className="fas fa-search" aria-hidden="true" /> Search the site <kbd className="nf-kbd">⌘K</kbd>
              </button>
            )}
          </div>

          <nav className="nf-popular" aria-label="Popular pages">
            {popular.map((p) => (
              <Link key={p.to} to={p.to}>
                {p.label} <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="nf-visual" aria-hidden="true">
          <div className="nf-orbit nf-orbit-1"><span className="nf-sat"><i className="fas fa-rocket" /></span></div>
          <div className="nf-orbit nf-orbit-2"><span className="nf-moon" /></div>
          <div className="nf-planet">
            <i className="fas fa-cloud" />
          </div>

          <div className="nf-term">
            <div className="nf-term-bar"><span /><span /><span /></div>
            <pre className="nf-term-body">
              {typed.map((text, i) => (
                <div key={i} className={i === 1 || i === 4 ? "nf-err" : text.startsWith("$") ? "nf-cmd" : "nf-dim"}>
                  {text || " "}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
