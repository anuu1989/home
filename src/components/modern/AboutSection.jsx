import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import profileImg from '../../editable-stuff/asset/images/profile.jpg';
import { gitHubLink, gitHubUsername, gitHubQuerry } from '../../editable-stuff/configurations.json';

const TIME_ZONE = 'Australia/Melbourne';

const formatLocalTime = () =>
  new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE }).format(new Date());

const HIGHLIGHTS = [
  { icon: 'fas fa-trophy', title: 'Leadership Excellence', description: 'Led 15+ person engineering teams across multiple time zones, managing $2M+ budgets and delivering critical infrastructure projects.', metric: '15+ Teams Led' },
  { icon: 'fas fa-rocket', title: 'Performance Impact', description: 'Reduced deployment time by 40% and improved system reliability to 99.9% uptime through automation and best practices.', metric: '40% Faster Delivery' },
  { icon: 'fas fa-users-cog', title: 'Talent Development', description: 'Mentored 25+ engineers, developed training programs, and built high-performing teams that consistently exceed targets.', metric: '25+ Engineers Mentored' },
  { icon: 'fas fa-shield-alt', title: 'Security & Compliance', description: 'Implemented enterprise-grade security practices, achieving SOC2 compliance and zero security incidents.', metric: 'Zero Security Incidents' },
  { icon: 'fas fa-cloud', title: 'Cloud Transformation', description: 'Architected and migrated 50+ applications to cloud-native solutions, reducing infrastructure costs by 30%.', metric: '50+ Apps Migrated' },
  { icon: 'fas fa-lightbulb', title: 'Innovation & Growth', description: 'Continuously learning and adapting to emerging technologies, implementing cutting-edge solutions, and fostering innovation mindset across teams.', metric: 'Always Learning' },
];

const COMPETENCIES = [
  { category: 'Cloud & Infrastructure', icon: 'fas fa-cloud', skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CloudFormation', 'Helm'] },
  { category: 'DevOps & Automation', icon: 'fas fa-cogs', skills: ['CI/CD', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Ansible', 'Chef', 'Puppet', 'ArgoCD'] },
  { category: 'Programming & Development', icon: 'fas fa-code', skills: ['Java', 'Python', 'Node.js', 'JavaScript', 'Go', 'Shell Scripting', 'React', 'Spring Boot'] },
  { category: 'Monitoring & Observability', icon: 'fas fa-chart-line', skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'New Relic', 'Splunk', 'Jaeger', 'OpenTelemetry'] },
  { category: 'Security & Compliance', icon: 'fas fa-shield-alt', skills: ['DevSecOps', 'OWASP', 'SOC2', 'GDPR', 'Vault', 'SAST', 'DAST', 'Penetration Testing'] },
  { category: 'Leadership & Management', icon: 'fas fa-users', skills: ['Team Leadership', 'Agile/Scrum', 'Strategic Planning', 'Mentoring', 'Stakeholder Management', 'Budget Management', 'Change Management', 'Performance Management'] },
];

const AboutSection = () => {
  const [localTime, setLocalTime] = useState(formatLocalTime);
  const [copied, setCopied] = useState(false);
  const [gh, setGh] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(formatLocalTime()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${gitHubLink}${gitHubUsername}${gitHubQuerry}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((repos) => {
        if (cancelled || !Array.isArray(repos)) return;
        const owned = repos.filter((r) => !r.fork);
        const stars = owned.reduce((sum, r) => sum + r.stargazers_count, 0);
        const latest = owned.reduce((a, b) => (new Date(a.updated_at) > new Date(b.updated_at) ? a : b), owned[0]);
        setGh({ repoCount: owned.length, stars, latestName: latest?.name, latestDate: latest?.updated_at });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('anuragvaidhya786@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
  <div className="container">
    <Reveal className="section" style={{ paddingTop: 0 }}>
      <div className="about-hero-grid">
        <img
          src={profileImg}
          alt="Anurag Vaidhya"
          style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}
          onError={(e) => { e.target.src = '/profile.jpg'; }}
        />
        <div>
          <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Anurag Vaidhya</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-md)', marginTop: 'var(--space-3xs)' }}>Senior Technologist and Tech Leader</p>

          <div className="cluster" style={{ '--gap': 'var(--space-sm)', marginTop: 'var(--space-2xs)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-tertiary)' }}>
            <span><i className="fas fa-map-marker-alt" aria-hidden="true"></i> Melbourne, Australia</span>
            <span className="cluster" style={{ '--gap': '0.4rem' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }}></span>
              {localTime} local time &middot; open to opportunities
            </span>
          </div>

          <div className="stat-grid" style={{ margin: 'var(--space-md) 0' }}>
            <div className="stat"><span className="stat-number"><CountUp end={15} suffix="+" /></span><span className="stat-label">Years Experience</span></div>
            <div className="stat"><span className="stat-number"><CountUp end={25} suffix="+" /></span><span className="stat-label">Engineers Mentored</span></div>
            <div className="stat"><span className="stat-number"><CountUp end={100} suffix="+" /></span><span className="stat-label">Projects Delivered</span></div>
          </div>

          <div className="cluster">
            <Link to="/contact" className="btn btn-primary">
              <i className="fas fa-envelope" aria-hidden="true"></i> Get In Touch
            </Link>
            <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-download" aria-hidden="true"></i> Resume
            </a>
            <button type="button" className="btn btn-ghost" onClick={copyEmail}>
              <i className={copied ? 'fas fa-check' : 'far fa-copy'} aria-hidden="true"></i> {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </Reveal>

    <Reveal as="section" className="section-sm stack" style={{ '--gap': 'var(--space-sm)', maxWidth: 760 }}>
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-normal)' }}>
        Strategic and hands-on technology leader with 15+ years of experience across DevSecOps,
        platform engineering, and cloud infrastructure. Known for bridging the gap between engineering
        strategy and execution&mdash;designing and delivering secure, scalable, and high-performing platforms
        that enable speed, stability, and innovation at scale.
      </p>
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-normal)' }}>
        Deeply hands-on with modern cloud-native technologies, CI/CD, Kubernetes, infrastructure as code,
        observability, and security automation. Proven ability to roll up sleeves when needed&mdash;whether
        architecting resilient cloud systems, optimizing platform performance, or driving incident
        response&mdash;while mentoring teams and shaping long-term engineering vision.
      </p>
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-normal)' }}>
        A trusted leader at the intersection of cloud, security, and automation. Adept at aligning
        engineering priorities with business objectives, embedding security into the software lifecycle,
        and cultivating high-impact teams that deliver value fast and safely.
      </p>
    </Reveal>

    <Reveal as="section" className="section-sm">
      <div className="section-header">
        <span className="section-kicker">Impact</span>
        <h2 className="section-title">Key Highlights</h2>
      </div>
      <div className="grid grid-auto-lg">
        {HIGHLIGHTS.map((h) => (
          <div key={h.title} className="card card-hover card-pad stack" style={{ '--gap': 'var(--space-2xs)' }}>
            <span className="icon-tile"><i className={h.icon}></i></span>
            <h3 style={{ fontSize: 'var(--fs-md)' }}>{h.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)' }}>{h.description}</p>
            <span className="tag tag-accent" style={{ alignSelf: 'flex-start' }}>{h.metric}</span>
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal as="section" className="section-sm">
      <div className="section-header">
        <span className="section-kicker">Toolkit</span>
        <h2 className="section-title">Core Competencies</h2>
      </div>
      <div className="grid grid-auto-lg">
        {COMPETENCIES.map((c) => (
          <div key={c.category} className="card card-pad stack" style={{ '--gap': 'var(--space-xs)' }}>
            <div className="cluster" style={{ '--gap': 'var(--space-2xs)', flexWrap: 'nowrap' }}>
              <span className="icon-tile"><i className={c.icon}></i></span>
              <h3 style={{ fontSize: 'var(--fs-sm)' }}>{c.category}</h3>
            </div>
            <div className="tag-list">
              {c.skills.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Reveal>

    {gh && (
      <Reveal as="section" className="section-sm card card-pad" style={{ padding: 'var(--space-lg)' }}>
        <div className="spread" style={{ marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
          <span className="cluster" style={{ '--gap': '0.5rem' }}>
            <span className="pulse-dot"></span>
            <span className="section-kicker" style={{ marginBottom: 0 }}>Live from GitHub</span>
          </span>
          <a href={`https://github.com/${gitHubUsername}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            @{gitHubUsername} <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
        <div className="stat-grid">
          <div className="stat">
            <span className="stat-number"><CountUp end={gh.repoCount} suffix="+" /></span>
            <span className="stat-label">Public Repos</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={gh.stars} /></span>
            <span className="stat-label">Stars Earned</span>
          </div>
          {gh.latestName && (
            <div className="stat">
              <span className="stat-number" style={{ fontSize: 'var(--fs-md)', fontFamily: 'var(--font-mono)' }}>{gh.latestName}</span>
              <span className="stat-label">Last Updated Repo</span>
            </div>
          )}
        </div>
      </Reveal>
    )}

    <Reveal as="section" className="section-sm contact-cta card">
      <h2 className="section-title">Let's Connect</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
        Always open to discussing technology, leadership, and opportunities to create impact together.
      </p>
      <div className="cluster" style={{ justifyContent: 'center' }}>
        <Link to="/contact" className="btn btn-primary"><i className="fas fa-envelope" aria-hidden="true"></i> Get In Touch</Link>
        <a href="https://www.linkedin.com/in/anurag-vaidhya-47b93222" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><i className="fab fa-linkedin" aria-hidden="true"></i> LinkedIn</a>
        <a href="https://github.com/anuu1989" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><i className="fab fa-github" aria-hidden="true"></i> GitHub</a>
      </div>
    </Reveal>
  </div>
  );
};

export default AboutSection;
