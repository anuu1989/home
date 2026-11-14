import React from "react";
import { CONTACT_EMAIL } from "../data/profile";

const RELOAD_KEY = "chunk-reload-at";

// After a deploy, an open tab may request a lazy chunk whose hashed filename no
// longer exists. That's not a bug the visitor can act on — reload once to pick
// up the new build.
const isStaleChunkError = (error) =>
  /dynamically imported module|Importing a module script failed|Loading chunk [\w-]+ failed|error loading dynamically/i.test(
    String(error?.message || error)
  );

const tryReloadForNewBuild = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 30000) return false; // already tried — avoid reload loops
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    /* storage blocked — still attempt one reload */
  }
  window.location.reload();
  return true;
};

const makeIncidentId = () =>
  `INC-${Date.now().toString(36).slice(-5).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

/**
 * Where it failed. Production builds minify component names, so there we report
 * the route; in development the first component in React's stack is more useful.
 */
const failureLocation = (componentStack) =>
  import.meta.env.DEV ? `<${failingComponent(componentStack)} />` : window.location.pathname;

/** First component name in React's component stack, e.g. "HomePage". */
const failingComponent = (componentStack) => {
  const match = /^\s*at (\w+)/m.exec(componentStack || "") || /^\s*in (\w+)/m.exec(componentStack || "");
  return match ? match[1] : "App";
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, componentStack: "", incidentId: "", copied: false, reloading: false };
  }

  static getDerivedStateFromError(error) {
    return { error, incidentId: makeIncidentId() };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
    this.setState({ componentStack: info?.componentStack || "" });
    if (isStaleChunkError(error) && tryReloadForNewBuild()) {
      this.setState({ reloading: true });
    }
  }

  report() {
    const { error, incidentId, componentStack } = this.state;
    return [
      `Incident: ${incidentId}`,
      `Time: ${new Date().toISOString()}`,
      `URL: ${window.location.href}`,
      `Location: ${failureLocation(componentStack)}`,
      `Error: ${String(error?.message || error)}`,
      `Browser: ${navigator.userAgent}`,
    ].join("\n");
  }

  copyReport = async () => {
    try {
      await navigator.clipboard.writeText(this.report());
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch {
      /* clipboard unavailable — the email option still works */
    }
  };

  render() {
    const { error, componentStack, incidentId, copied, reloading } = this.state;
    if (!error) return this.props.children;

    if (reloading) {
      return (
        <div className="crash crash-reloading" role="status">
          <span className="crash-spinner" aria-hidden="true" />
          <p>A new version of the site was deployed — loading it…</p>
        </div>
      );
    }

    const where = failureLocation(componentStack);
    const message = String(error?.message || error);
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Site error ${incidentId}`)}&body=${encodeURIComponent(
      `Hi Anurag, I hit an error on your site.\n\n${this.report()}`
    )}`;

    return (
      <main className="crash" role="alert" aria-labelledby="crash-title">
        <div className="crash-scan" aria-hidden="true" />

        <div className="crash-card">
          <div className="crash-head">
            <span className="crash-badge"><span className="crash-pulse" aria-hidden="true" /> Incident open</span>
            <code className="crash-id">{incidentId}</code>
          </div>

          <h1 id="crash-title" className="crash-title" data-text="Something crashed.">Something crashed.</h1>
          <p className="crash-sub">
            {isStaleChunkError(error)
              ? "Part of this page couldn't be downloaded — usually a flaky connection or a fresh deploy. Reloading should fix it."
              : "A component failed to render, so I've contained it here instead of showing you a blank page. Reloading usually fixes it."}
          </p>

          <pre className="crash-log" aria-label="Error summary">
            <span className="crash-log-dim">[{new Date().toLocaleTimeString("en-AU", { hour12: false })}]</span>{" "}
            <span className="crash-log-err">panic</span>: render failed {import.meta.env.DEV ? "in" : "on"} <span className="crash-log-hl">{where}</span>
            {"\n"}
            <span className="crash-log-dim">  ↳ </span>{message.length > 160 ? `${message.slice(0, 160)}…` : message}
            {"\n"}
            <span className="crash-log-dim">[{new Date().toLocaleTimeString("en-AU", { hour12: false })}]</span>{" "}
            <span className="crash-log-ok">recovered</span>: error boundary isolated the failure
          </pre>

          <div className="crash-actions">
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              <i className="fas fa-arrows-rotate" aria-hidden="true" /> Reload page
            </button>
            <a href="/" className="btn btn-secondary">
              <i className="fas fa-house" aria-hidden="true" /> Go home
            </a>
            <button type="button" className="btn btn-ghost" onClick={this.copyReport}>
              <i className={copied ? "fas fa-check" : "fas fa-copy"} aria-hidden="true" /> {copied ? "Copied" : "Copy report"}
            </button>
            <a href={mailto} className="btn btn-ghost">
              <i className="fas fa-paper-plane" aria-hidden="true" /> Report it
            </a>
          </div>

          {import.meta.env.DEV && (
            <details className="crash-details">
              <summary>Stack trace (dev only)</summary>
              <pre>{`${error?.stack || message}\n${componentStack}`}</pre>
            </details>
          )}
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
