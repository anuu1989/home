import React from "react";
import Reveal from "../Reveal";
import CountUp from "../CountUp";

const INTERESTS = [
  {
    title: "Fitness & Wellness", icon: "fas fa-dumbbell",
    description: "Passionate about maintaining physical and mental well-being through structured fitness routines and mindful practices.",
    details: ["Certified fitness and nutrition specialist from INFS", "Regular strength training and cardio routines", "Mindfulness and meditation practices", "Holistic approach to health and wellness"],
    link: { text: "INFS Certification", url: "https://infs.co.in" },
  },
  {
    title: "Continuous Learning", icon: "fas fa-graduation-cap",
    description: "Always exploring new technologies, industry trends, and best practices to stay at the forefront of innovation.",
    details: ["Regular reading of tech publications and research papers", "Attending conferences and webinars", "Hands-on experimentation with emerging technologies", "Contributing to open-source projects and communities"],
    link: { text: "InfoQ", url: "https://www.infoq.com" },
  },
  {
    title: "Travel & Culture", icon: "fas fa-globe-americas",
    description: "Exploring diverse cultures and destinations to gain new perspectives and broaden understanding of the world.",
    details: ["Visited 5+ countries across different continents", "Cultural immersion and local cuisine exploration", "Photography and travel documentation", "Planning future adventures and destinations"],
    stat: "5+ Countries Visited",
  },
  {
    title: "Culinary Arts", icon: "fas fa-utensils",
    description: "Experimenting with international cuisines and cooking techniques as a creative outlet and social activity.",
    details: ["International cuisine experimentation", "Hosting dinner parties and cooking for friends", "Learning traditional cooking techniques", "Exploring the intersection of food and culture"],
    stat: "15+ Cuisines Mastered",
  },
];

const VALUES = [
  { value: "Growth Mindset", icon: "fas fa-seedling", description: "Embracing challenges as opportunities to learn and improve" },
  { value: "Work-Life Balance", icon: "fas fa-balance-scale", description: "Maintaining harmony between professional excellence and personal fulfillment" },
  { value: "Community Impact", icon: "fas fa-hands-helping", description: "Contributing positively to communities through knowledge sharing and mentorship" },
  { value: "Innovation", icon: "fas fa-lightbulb", description: "Constantly seeking creative solutions and new approaches to challenges" },
];

const Interests = () => (
  <div className="container">
    <Reveal as="section" className="section" style={{ paddingTop: 0 }}>
      <div className="grid grid-auto-lg">
        {INTERESTS.map((interest) => (
          <div key={interest.title} className="card card-pad" style={{ padding: "var(--space-md)" }}>
            <div className="spread" style={{ alignItems: "flex-start", marginBottom: "var(--space-2xs)" }}>
              <span className="icon-tile"><i className={interest.icon}></i></span>
              {interest.stat && <span className="tag tag-accent">{interest.stat}</span>}
            </div>
            <h3 style={{ fontSize: "var(--fs-md)" }}>{interest.title}</h3>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-secondary)", margin: "var(--space-2xs) 0 var(--space-sm)" }}>{interest.description}</p>
            <ul className="stack" style={{ '--gap': '0.3rem', marginBottom: interest.link ? "var(--space-sm)" : 0 }}>
              {interest.details.map((d) => (
                <li key={d} className="cluster" style={{ '--gap': '0.5rem', fontSize: "var(--fs-sm)", flexWrap: "nowrap", alignItems: "flex-start" }}>
                  <i className="fas fa-check" style={{ color: "var(--color-accent)", fontSize: "0.7rem" }} aria-hidden="true"></i> {d}
                </li>
              ))}
            </ul>
            {interest.link && (
              <a href={interest.link.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <i className="fas fa-external-link-alt" aria-hidden="true"></i> {interest.link.text}
              </a>
            )}
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal as="section" className="section-sm">
      <div className="section-header centered">
        <span className="section-kicker">Values</span>
        <h2 className="section-title">Core Values</h2>
      </div>
      <div className="grid grid-4">
        {VALUES.map((v) => (
          <div key={v.value} className="card card-pad" style={{ textAlign: "center" }}>
            <i className={v.icon} style={{ color: "var(--color-accent)", fontSize: "1.4rem" }} aria-hidden="true"></i>
            <h3 style={{ fontSize: "var(--fs-sm)", margin: "var(--space-2xs) 0" }}>{v.value}</h3>
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-secondary)" }}>{v.description}</p>
          </div>
        ))}
      </div>
    </Reveal>

    <Reveal as="section" className="section-sm">
      <div className="quote">
        <p className="quote-text">
          "The best way to predict the future is to create it. Whether in technology or life,
          I believe in continuous learning, meaningful connections, and making a positive impact."
        </p>
        <p className="quote-author">&mdash; Personal Philosophy</p>
      </div>
    </Reveal>

    <Reveal as="section" className="section-sm card card-pad" style={{ padding: "var(--space-lg)" }}>
      <div className="stat-grid">
        <div className="stat"><span className="stat-number"><CountUp end={50} suffix="+" /></span><span className="stat-label">Books Read Annually</span></div>
        <div className="stat"><span className="stat-number"><CountUp end={1000} suffix="+" /></span><span className="stat-label">Travel Photos</span></div>
        <div className="stat"><span className="stat-number"><CountUp end={15} suffix="+" /></span><span className="stat-label">Cuisines Explored</span></div>
        <div className="stat"><span className="stat-number"><CountUp end={5} suffix="+" /></span><span className="stat-label">Years Fitness Journey</span></div>
      </div>
    </Reveal>
  </div>
);

export default Interests;
