import React, { useState } from "react";
import Reveal from "../Reveal";
import CountUp from "../CountUp";

const SKILL_CATEGORIES = [
  { id: "cloud", title: "Cloud Platforms & Services", icon: "fas fa-server", skills: [
    { name: "AWS", level: 80, experience: "8+ years", projects: 25, tags: ["EC2", "Lambda", "S3", "RDS"] },
    { name: "Azure", level: 75, experience: "6+ years", projects: 18, tags: ["App Service", "Functions", "DevOps"] },
    { name: "GCP", level: 70, experience: "4+ years", projects: 12, tags: ["Compute Engine", "Cloud Run", "BigQuery"] },
    { name: "OpenShift", level: 72, experience: "5+ years", projects: 10, tags: ["Enterprise", "Operators", "Pipelines"] },
  ]},
  { id: "devops", title: "DevOps & Infrastructure", icon: "fas fa-cloud", skills: [
    { name: "CI/CD Pipelines", level: 90, experience: "9+ years", projects: 28, tags: ["Jenkins", "GitLab CI", "GitHub Actions"] },
    { name: "Docker", level: 85, experience: "7+ years", projects: 22, tags: ["Containerization", "Multi-stage", "Compose"] },
    { name: "Kubernetes", level: 75, experience: "5+ years", projects: 15, tags: ["Orchestration", "Helm", "Operators"] },
    { name: "Terraform", level: 82, experience: "6+ years", projects: 18, tags: ["IaC", "Multi-cloud", "Modules"] },
  ]},
  { id: "programming", title: "Programming & Development", icon: "fas fa-code", skills: [
    { name: "Java", level: 85, experience: "8+ years", projects: 25, tags: ["Enterprise", "Spring Boot", "Microservices"] },
    { name: "Node.js", level: 87, experience: "6+ years", projects: 18, tags: ["Backend", "APIs", "Real-time"] },
    { name: "Python", level: 80, experience: "5+ years", projects: 15, tags: ["Automation", "Data Science", "ML"] },
    { name: "JavaScript", level: 90, experience: "10+ years", projects: 30, tags: ["Frontend", "React", "Vue.js"] },
  ]},
  { id: "testing", title: "Testing & Quality Engineering", icon: "fas fa-vial", skills: [
    { name: "Test Automation", level: 95, experience: "12+ years", projects: 40, tags: ["Selenium", "Cypress", "Playwright"] },
    { name: "API Testing", level: 92, experience: "10+ years", projects: 35, tags: ["REST", "GraphQL", "Postman"] },
    { name: "Performance Testing", level: 85, experience: "8+ years", projects: 20, tags: ["JMeter", "LoadRunner", "K6"] },
    { name: "Security Testing", level: 78, experience: "6+ years", projects: 12, tags: ["OWASP", "Penetration", "SAST"] },
  ]},
];

const RESPONSIBILITY_CATEGORIES = [
  {
    category: "Testing & Automation", icon: "fas fa-vial",
    items: [
      "Creating testing and test automation strategy on program/project level",
      "Automating testing scenarios for UI and API layers",
      "Designing and developing automation testing frameworks",
      "Implementing shift left testing with Service Virtualization tools",
    ],
  },
  {
    category: "DevOps & CI/CD", icon: "fas fa-cogs",
    items: [
      "Build automation and deployment automation",
      "Building CI/CD automation pipelines with various tools",
      "Containerization strategy and best practices implementation",
      "Infrastructure as Code using Terraform",
    ],
  },
  {
    category: "Cloud & Infrastructure", icon: "fas fa-cloud",
    items: [
      "Creating and managing cloud infrastructure",
      "Designing cloud architecture with security endorsement",
      "Container orchestration with Kubernetes and OpenShift",
      "Platform automation and management",
    ],
  },
  {
    category: "Leadership & Strategy", icon: "fas fa-users",
    items: [
      "Team handling, guidance, and mentoring",
      "GTM strategy development for products and solutions",
      "Customer consultation for testing, SV, and DevOps",
      "Requirements gathering and scope analysis",
    ],
  },
  {
    category: "Organizational Development", icon: "fas fa-chart-line",
    items: [
      "Designing DevOps Maturity Models for organizations",
      "Cross-team coordination and collaboration",
      "Process improvement and optimization",
      "Technology adoption and transformation",
    ],
  },
];

const RESPONSIBILITY_IMPACT = [
  { end: 50, suffix: "+", label: "Projects Led" },
  { end: 15, suffix: "+", label: "Teams Managed" },
  { end: 25, suffix: "+", label: "Cloud Migrations" },
  { end: 100, suffix: "+", label: "Automations Built" },
];

const SOFT_SKILLS = [
  { name: "Leadership & Management", icon: "fas fa-users", rating: 5, description: "Leading cross-functional teams and driving organizational transformation", achievements: ["Led 15+ person teams", "Managed $2M+ budgets", "Reduced delivery time by 40%"] },
  { name: "Communication & Presentation", icon: "fas fa-comments", rating: 5, description: "Effective stakeholder engagement and technical communication", achievements: ["100+ technical presentations", "C-level stakeholder management", "Cross-cultural teams"] },
  { name: "Problem Solving & Innovation", icon: "fas fa-lightbulb", rating: 5, description: "Analytical thinking and creative solution development", achievements: ["50+ complex problems solved", "15+ process improvements", "3 patents filed"] },
  { name: "Collaboration & Teamwork", icon: "fas fa-handshake", rating: 5, description: "Building strong partnerships across diverse teams", achievements: ["Cross-functional collaboration", "Remote team leadership", "Conflict resolution"] },
  { name: "Mentoring & Development", icon: "fas fa-chalkboard-teacher", rating: 4, description: "Developing talent and fostering continuous learning", achievements: ["Mentored 25+ engineers", "Training program development", "Knowledge transfer"] },
  { name: "Strategic & Systems Thinking", icon: "fas fa-chess", rating: 5, description: "Long-term planning and architectural decision making", achievements: ["Enterprise architecture", "Technology roadmaps", "Digital transformation"] },
];

const CERTIFICATIONS = [
  { name: "AWS DevOps - Professional", issuer: "Amazon Web Services", year: "2022", icon: "fab fa-aws", status: "Active" },
  { name: "AWS Developer - Associate", issuer: "Amazon Web Services", year: "2022", icon: "fab fa-aws", status: "Active" },
  { name: "Certified Kubernetes Application Developer", issuer: "Cloud Native Computing Foundation", year: "2022", icon: "fas fa-dharmachakra", status: "Active" },
  { name: "HashiCorp Certified Terraform Associate", issuer: "HashiCorp", year: "2021", icon: "fas fa-layer-group", status: "Expired" },
  { name: "Certified Jenkins Engineer", issuer: "CloudBees", year: "2022", icon: "fas fa-cogs", status: "Active" },
  { name: "Google Cloud Architect Professional", issuer: "Google Cloud", year: "2019", icon: "fab fa-google", status: "Expired" },
  { name: "Scrum Master Pro by ISQI", issuer: "ISQI", year: "2018", icon: "fas fa-users-cog", status: "Active" },
];

const TABS = [
  { id: "technical", icon: "fas fa-code", label: "Technical Skills" },
  { id: "responsibilities", icon: "fas fa-star", label: "Responsibilities" },
  { id: "soft", icon: "fas fa-users", label: "Leadership" },
  { id: "certifications", icon: "fas fa-certificate", label: "Certifications" },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [search, setSearch] = useState("");
  const [activeRespCategory, setActiveRespCategory] = useState(0);
  const respCategory = RESPONSIBILITY_CATEGORIES[activeRespCategory];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <div className="container">
      <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
        <div className="project-toolbar" style={{ marginBottom: 0 }}>
          <div className="tabs" style={{ marginBottom: 0, borderBottom: "none" }} role="tablist">
            {TABS.map((tab) => (
              <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                <i className={tab.icon} aria-hidden="true"></i> {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "technical" && (
            <div className="project-search">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search skills or tags..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          )}
        </div>
        <div style={{ borderBottom: "1px solid var(--color-border)", marginBottom: "var(--space-lg)" }}></div>

        {activeTab === "technical" && (
          <div className="stack" style={{ '--gap': 'var(--space-xl)' }}>
            {(search ? filteredCategories : SKILL_CATEGORIES).map((cat) => (
              <div key={cat.id}>
                <h3 className="cluster" style={{ '--gap': 'var(--space-2xs)', fontSize: "var(--fs-md)", marginBottom: "var(--space-sm)" }}>
                  <i className={cat.icon} style={{ color: "var(--color-accent)" }} aria-hidden="true"></i> {cat.title}
                </h3>
                <div className="grid grid-auto-lg">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="card card-pad card-hover">
                      <div className="spread">
                        <h4 style={{ fontSize: "var(--fs-md)" }}>{skill.name}</h4>
                        <span className="tag">{skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : skill.level >= 70 ? "Intermediate" : "Beginner"}</span>
                      </div>
                      <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)", margin: "var(--space-2xs) 0" }}>
                        {skill.experience} &middot; {skill.projects} projects
                      </p>
                      <div className="progress" style={{ margin: "var(--space-2xs) 0 var(--space-sm)" }}>
                        <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
                      </div>
                      <div className="tag-list">
                        {skill.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "responsibilities" && (
          <>
            <div className="tabs" role="tablist">
              {RESPONSIBILITY_CATEGORIES.map((c, i) => (
                <button key={c.category} role="tab" aria-selected={activeRespCategory === i} className={`tab-btn ${activeRespCategory === i ? "active" : ""}`} onClick={() => setActiveRespCategory(i)}>
                  <i className={c.icon} aria-hidden="true"></i> {c.category}
                </button>
              ))}
            </div>
            <div className="grid grid-2" style={{ '--gap': 'var(--space-sm)' }}>
              {respCategory.items.map((item) => (
                <div key={item} className="card card-pad cluster" style={{ '--gap': 'var(--space-xs)', alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                  <span className="icon-tile" style={{ width: 32, height: 32, fontSize: '0.85rem' }}><i className="fas fa-check"></i></span>
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="stat-grid" style={{ marginTop: "var(--space-lg)" }}>
              {RESPONSIBILITY_IMPACT.map((m) => (
                <div key={m.label} className="stat">
                  <span className="stat-number"><CountUp end={m.end} suffix={m.suffix} /></span>
                  <span className="stat-label">{m.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "soft" && (
          <div className="grid grid-auto-lg">
            {SOFT_SKILLS.map((skill) => (
              <div key={skill.name} className="card card-pad">
                <div className="spread" style={{ marginBottom: "var(--space-sm)" }}>
                  <span className="icon-tile"><i className={skill.icon}></i></span>
                  <span className="star-rating">
                    {[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star ${i < skill.rating ? "filled" : ""}`}></i>)}
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--fs-md)", marginBottom: "var(--space-2xs)" }}>{skill.name}</h3>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>{skill.description}</p>
                <ul className="stack" style={{ '--gap': '0.35rem' }}>
                  {skill.achievements.map((a) => (
                    <li key={a} className="cluster" style={{ '--gap': '0.5rem', fontSize: "var(--fs-sm)", flexWrap: "nowrap", alignItems: "flex-start" }}>
                      <i className="fas fa-check-circle" style={{ color: "var(--color-accent)" }} aria-hidden="true"></i> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certifications" && (
          <>
            <div className="grid grid-auto-lg">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="card card-pad">
                  <div className="spread" style={{ marginBottom: "var(--space-sm)" }}>
                    <span className="icon-tile"><i className={cert.icon}></i></span>
                    <span className={`badge ${cert.status === "Active" ? "badge-success" : "badge-neutral"}`}>
                      <i className="fas fa-check-circle" aria-hidden="true"></i> {cert.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "var(--fs-sm)", lineHeight: 1.3 }}>{cert.name}</h3>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-tertiary)", marginTop: "var(--space-2xs)" }}>{cert.issuer} &middot; {cert.year}</p>
                </div>
              ))}
            </div>
            <div className="stat-grid" style={{ marginTop: "var(--space-lg)" }}>
              <div className="stat"><span className="stat-number"><CountUp end={5} /></span><span className="stat-label">Active Certifications</span></div>
              <div className="stat"><span className="stat-number">2022</span><span className="stat-label">Latest Achievement</span></div>
              <div className="stat"><span className="stat-number"><CountUp end={7} /></span><span className="stat-label">Total Earned</span></div>
            </div>
          </>
        )}
      </Reveal>
    </div>
  );
};

export default Skills;
