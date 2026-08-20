import React, { useState } from "react";
import Reveal from "../Reveal";
import CountUp from "../CountUp";

const PRINCIPLES = [
  { icon: "fas fa-users", title: "Empowerment", desc: "Enabling team members to take ownership and make decisions" },
  { icon: "fas fa-lightbulb", title: "Innovation", desc: "Fostering creativity and encouraging calculated risk-taking" },
  { icon: "fas fa-handshake", title: "Collaboration", desc: "Building bridges across teams and breaking down silos" },
  { icon: "fas fa-seedling", title: "Growth", desc: "Investing in continuous learning and development" },
];

const AREAS = [
  { title: "Team Development", icon: "fas fa-users", description: "Mentoring and developing team members through structured growth programs and personalized coaching.", achievements: ["Mentored 20+ junior developers", "Implemented career development frameworks", "Achieved 95% team retention rate", "Conducted 100+ technical training sessions"] },
  { title: "Community Building", icon: "fas fa-handshake", description: "Creating inclusive environments that foster collaboration, innovation, and continuous learning.", achievements: ["Led diversity and inclusion initiatives", "Organized 15+ community events", "Built cross-functional collaboration", "Established knowledge sharing programs"] },
  { title: "Technical Leadership", icon: "fas fa-code-branch", description: "Driving technical excellence through architecture decisions, best practices, and innovation.", achievements: ["Architected scalable solutions", "Established coding standards", "Led technical decision making", "Implemented DevOps best practices"] },
  { title: "Strategic Vision", icon: "fas fa-lightbulb", description: "Developing and executing strategic initiatives that align with business objectives and drive growth.", achievements: ["Defined technology roadmaps", "Led digital transformation", "Optimized operational efficiency", "Delivered strategic projects"] },
];

const JOURNEY = [
  { company: "Wipro Technologies", role: "Senior Consultant & Team Lead", period: "2011-2020", highlights: ["Cultivated culture of inclusivity and collaboration", "Led new member onboarding and mentoring programs", "Organized technology training on niche skills", "Conducted social cause events (food wastage awareness)"] },
  { company: "Cognizant Technology Solutions", role: "Senior Engineer & Community Leader", period: "2020-2022", highlights: ["Led community goal-setting and achievement programs", "Organized tech conferences and knowledge sharing events", "Guided team members in career development", "Built cross-team collaboration frameworks"] },
  { company: "Accenture", role: "Engineering Lead", period: "2023-2025", highlights: ["Leading engineering teams in cloud transformation", "Driving platform modernization initiatives", "Mentoring senior engineers and architects", "Establishing engineering excellence standards"] },
  { company: "Thoughtworks", role: "Lead Consultant", period: "Aug 2025 - Nov 2025", highlights: ["Championed agile methodologies and DevOps practices", "Led cross-functional teams in digital transformation projects", "Mentored consultants on technical excellence and client engagement", "Drove innovation through technology radar and best practices"] },
  { company: "Australia Post", role: "Engineer - Platform, DevOps and Cloud", period: "Jan 2026 - Present", highlights: ["Leading platform engineering and cloud infrastructure modernization", "Implementing scalable DevOps practices for national postal operations", "Driving digital transformation initiatives across the organization", "Establishing cloud-native architecture and observability practices"] },
];

const TABS = [
  { id: "philosophy", icon: "fas fa-lightbulb", label: "Philosophy" },
  { id: "areas", icon: "fas fa-cogs", label: "Core Areas" },
  { id: "journey", icon: "fas fa-route", label: "Journey" },
];

const Leadership = () => {
  const [activeTab, setActiveTab] = useState("philosophy");

  return (
    <div className="container">
      <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
        <div className="tabs" role="tablist">
          {TABS.map((tab) => (
            <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
              <i className={tab.icon} aria-hidden="true"></i> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "philosophy" && (
          <div className="grid grid-2" style={{ '--gap': 'var(--space-lg)', alignItems: "start" }}>
            <div className="card card-pad" style={{ padding: "var(--space-lg)" }}>
              <span className="icon-tile"><i className="fas fa-heart"></i></span>
              <h3 style={{ margin: "var(--space-sm) 0 var(--space-2xs)" }}>People-First Approach</h3>
              <p style={{ color: "var(--color-text-secondary)", lineHeight: "var(--lh-normal)" }}>
                I believe that great technology solutions come from great teams. My leadership philosophy
                centers on creating environments where people can thrive, innovate, and deliver their best work
                while growing both personally and professionally.
              </p>
              <div className="grid grid-2" style={{ '--gap': 'var(--space-sm)', marginTop: "var(--space-md)" }}>
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="cluster" style={{ '--gap': 'var(--space-2xs)', alignItems: "flex-start", flexWrap: "nowrap" }}>
                    <i className={p.icon} style={{ color: "var(--color-accent)", marginTop: 4 }} aria-hidden="true"></i>
                    <div>
                      <h4 style={{ fontSize: "var(--fs-sm)" }}>{p.title}</h4>
                      <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-secondary)" }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="stat"><span className="stat-number"><CountUp end={95} suffix="%" /></span><span className="stat-label">Team Retention</span></div>
              <div className="stat"><span className="stat-number"><CountUp end={50} suffix="+" /></span><span className="stat-label">People Mentored</span></div>
              <div className="stat"><span className="stat-number"><CountUp end={25} suffix="+" /></span><span className="stat-label">Events Organized</span></div>
              <div className="stat"><span className="stat-number"><CountUp end={15} suffix="+" /></span><span className="stat-label">Years Leading</span></div>
            </div>
          </div>
        )}

        {activeTab === "areas" && (
          <div className="grid grid-2" style={{ '--gap': 'var(--space-sm)' }}>
            {AREAS.map((area) => (
              <div key={area.title} className="card card-pad" style={{ padding: "var(--space-md)" }}>
                <div className="cluster" style={{ '--gap': 'var(--space-2xs)', marginBottom: "var(--space-2xs)" }}>
                  <span className="icon-tile"><i className={area.icon}></i></span>
                  <h3 style={{ fontSize: "var(--fs-md)" }}>{area.title}</h3>
                </div>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--fs-sm)", marginBottom: "var(--space-sm)" }}>{area.description}</p>
                <ul className="stack" style={{ '--gap': '0.4rem' }}>
                  {area.achievements.map((a) => (
                    <li key={a} className="cluster" style={{ '--gap': '0.5rem', fontSize: "var(--fs-sm)", color: "var(--color-text)", flexWrap: "nowrap", alignItems: "flex-start" }}>
                      <i className="fas fa-check-circle" style={{ color: "var(--color-accent)" }} aria-hidden="true"></i> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "journey" && (
          <div className="timeline">
            {JOURNEY.map((j) => (
              <div key={j.company} className="timeline-item">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)" }}>{j.period}</span>
                <h4 style={{ fontSize: "var(--fs-md)", marginTop: "var(--space-3xs)" }}>{j.company}</h4>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-2xs)" }}>{j.role}</p>
                <ul className="stack" style={{ '--gap': '0.3rem' }}>
                  {j.highlights.map((h) => (
                    <li key={h} className="cluster" style={{ '--gap': '0.5rem', fontSize: "var(--fs-sm)", flexWrap: "nowrap", alignItems: "flex-start" }}>
                      <i className="fas fa-star" style={{ color: "var(--color-accent)", fontSize: "0.75rem" }} aria-hidden="true"></i> {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal as="section" className="section-sm card card-pad" style={{ padding: "var(--space-lg)" }}>
        <div className="stat-grid">
          <div className="stat"><span className="stat-number"><CountUp end={40} suffix="%" /></span><span className="stat-label">Productivity Increase</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={95} suffix="%" /></span><span className="stat-label">Team Retention</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={50} suffix="+" /></span><span className="stat-label">People Developed</span></div>
          <div className="stat"><span className="stat-number"><CountUp end={25} suffix="+" /></span><span className="stat-label">Innovation Projects</span></div>
        </div>
      </Reveal>
    </div>
  );
};

export default Leadership;
