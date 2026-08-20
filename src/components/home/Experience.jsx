import React, { useState } from "react";
import Reveal from "../Reveal";
import CountUp from "../CountUp";
import Wipro from "../../editable-stuff/asset/images/wipro.jpg";
import Cognizant from "../../editable-stuff/asset/images/cognizant.jpg";
import Accenture from "../../editable-stuff/asset/images/accenture.jpg";
import Thoughtworks from "../../editable-stuff/asset/images/thoughtworks.png";
import AusPost from "../../editable-stuff/asset/images/auspost.png";

const EXPERIENCES = [
  {
    company: "Wipro Technologies", logo: Wipro, color: "#4A90E2", position: "Senior Consultant", department: "Testing/DevOps",
    duration: "Feb 2011 - Feb 2020", years: "9 years",
    description: "Led testing and DevOps initiatives, implementing automated testing frameworks and CI/CD pipelines.",
    technologies: ["Testing", "DevOps", "Automation", "CI/CD"],
  },
  {
    company: "Cognizant Technology Solutions", logo: Cognizant, color: "#00A1C9", position: "Senior Engineer", department: "Cloud/DevOps/Platform",
    duration: "Feb 2020 - June 2022", years: "2.5 years",
    description: "Architected cloud solutions and managed DevOps platforms, focusing on scalability and performance.",
    technologies: ["Cloud", "DevOps", "Platform Engineering", "AWS", "GCP"],
  },
  {
    company: "Accenture", logo: Accenture, color: "#A100FF", position: "Engineering Lead", department: "Cloud/DevOps/Platform",
    duration: "June 2022 - Aug 2025", years: "2+ years",
    description: "Leading engineering teams in cloud transformation and platform modernization initiatives.",
    technologies: ["Leadership", "Cloud Architecture", "DevOps", "Team Management", "AWS", "Platform Engineering"],
  },
  {
    company: "Thoughtworks", logo: Thoughtworks, color: "#FF6B35", position: "Lead Consultant", department: "Cloud/DevOps/Platform",
    duration: "Aug 2025 - Nov 2025", years: "3 months",
    description: "Championed agile methodologies and DevOps practices while leading digital transformation initiatives for enterprise clients.",
    technologies: ["Agile", "DevOps", "Cloud", "Platform Engineering", "Digital Transformation", "Consulting", "Technology Radar"],
  },
  {
    company: "Australia Post", logo: AusPost, color: "#E31E24", position: "Engineer - Platform, DevOps and Cloud", department: "Platform Engineering",
    duration: "Jan 2026 - Present", years: "Current",
    description: "Leading platform engineering initiatives and cloud infrastructure modernization for Australia's national postal service, focusing on scalable and reliable digital solutions.",
    technologies: ["Platform Engineering", "DevOps", "Cloud Infrastructure", "AWS", "Kubernetes", "CI/CD", "Infrastructure as Code", "Observability"],
  },
];

const Experience = () => {
  const [active, setActive] = useState(EXPERIENCES.length - 1);
  const exp = EXPERIENCES[active];

  return (
    <div className="container">
      <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
        <div className="tabs" role="tablist">
          {EXPERIENCES.map((e, i) => (
            <button key={e.company} role="tab" aria-selected={active === i} className={`tab-btn ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
              <span className="company-dot" style={{ backgroundColor: e.color }}>{e.company.charAt(0)}</span>
              {e.company}
            </button>
          ))}
        </div>

        <div className="card card-pad" style={{ padding: "var(--space-lg)" }}>
          <div className="spread" style={{ alignItems: "flex-start", flexWrap: "wrap", marginBottom: "var(--space-md)" }}>
            <div className="cluster">
              <div className="company-logo-frame">
                <img src={exp.logo} alt={exp.company} className="company-logo" />
              </div>
              <div>
                <h2 style={{ fontSize: "var(--fs-lg)" }}>{exp.company}</h2>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--fs-sm)" }}>{exp.position}</p>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="tag" style={{ color: exp.color, borderColor: exp.color, background: `${exp.color}14` }}>{exp.department}</span>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)", marginTop: "var(--space-3xs)" }}>
                {exp.duration} &middot; {exp.years}
              </p>
            </div>
          </div>

          <p style={{ color: "var(--color-text-secondary)", lineHeight: "var(--lh-normal)", marginBottom: "var(--space-md)" }}>{exp.description}</p>

          <div className="tag-list">
            {exp.technologies.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section-sm" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <span className="section-kicker">Timeline</span>
          <h2 className="section-title">Career Progression</h2>
        </div>
        <div className="timeline">
          {EXPERIENCES.map((e, i) => (
            <div key={e.company} className="timeline-item">
              <button className="btn-ghost" style={{ padding: 0, textAlign: "left", display: "block" }} onClick={() => setActive(i)}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)" }}>{e.duration}</span>
                <h4 style={{ fontSize: "var(--fs-md)", marginTop: "var(--space-3xs)" }}>{e.company}</h4>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-secondary)" }}>{e.position}</p>
              </button>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="card card-pad" style={{ padding: "var(--space-lg)", marginBottom: "var(--space-xl)" }}>
        <div className="stat-grid">
          <div className="stat"><span className="stat-number"><CountUp end={15} suffix="+" /></span><span className="stat-label">Years Experience</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={5} /></span><span className="stat-label">Major Companies</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={50} suffix="+" /></span><span className="stat-label">Projects Delivered</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={25} suffix="+" /></span><span className="stat-label">Team Members Led</span></div>
        </div>
      </Reveal>
    </div>
  );
};

export default Experience;
