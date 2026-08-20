import React, { useEffect, useState } from "react";
import CountUp from "../CountUp";
import {
  FirstName,
  LastName,
  MiddleName,
  devDesc,
  icons,
} from "../../editable-stuff/configurations.json";

const TYPE_SPEED = 45;

const useTypewriter = (text) => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, TYPE_SPEED);
    return () => clearInterval(interval);
  }, [text]);

  return output;
};

const TERMINAL_LINES = [
  {
    cmd: "whoami",
    output: <p className="hero-terminal-output">anurag-vaidhya</p>,
  },
  {
    cmd: "role --current",
    output: (
      <p className="hero-terminal-output">
        Platform / DevOps / Cloud Engineer<br />
        <span className="muted">@ Australia Post</span>
      </p>
    ),
  },
  {
    cmd: "stack --top",
    output: (
      <p className="hero-terminal-output muted">
        AWS, Kubernetes, Terraform,<br />CI/CD, Observability
      </p>
    ),
  },
  {
    cmd: "status",
    output: (
      <p className="hero-terminal-output" style={{ color: "var(--color-accent)" }}>
        Open to new opportunities
      </p>
    ),
  },
];

const CMD_CHAR_SPEED = 55;
const CMD_OUTPUT_DELAY = 300;
const CMD_LINE_GAP = 700;

const useTerminalTyping = (lines) => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [outputShown, setOutputShown] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedIndex(lines.length - 1);
      setOutputShown(lines.length - 1);
      return;
    }

    let cancelled = false;
    const timers = [];
    const schedule = (fn, delay) => {
      timers.push(setTimeout(fn, delay));
    };

    const runLine = (index) => {
      if (cancelled || index >= lines.length) return;
      setTypedIndex(index);
      setTypedText("");
      const cmd = lines[index].cmd;
      let i = 0;
      const typeChar = () => {
        if (cancelled) return;
        i += 1;
        setTypedText(cmd.slice(0, i));
        if (i < cmd.length) {
          schedule(typeChar, CMD_CHAR_SPEED);
        } else {
          schedule(() => {
            setOutputShown(index);
            schedule(() => runLine(index + 1), CMD_LINE_GAP);
          }, CMD_OUTPUT_DELAY);
        }
      };
      typeChar();
    };

    runLine(0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [lines]);

  return { typedIndex, typedText, outputShown };
};

const HeroTerminal = () => {
  const { typedIndex, typedText, outputShown } = useTerminalTyping(TERMINAL_LINES);

  return (
    <div className="hero-terminal" aria-hidden="true">
      <div className="hero-terminal-bar">
        <span></span><span></span><span></span>
      </div>
      <div className="hero-terminal-body">
        {TERMINAL_LINES.map((line, index) => {
          if (index > typedIndex) return null;
          const isTyping = index === typedIndex && outputShown < index;
          const commandText = isTyping ? typedText : line.cmd;
          return (
            <div key={line.cmd}>
              <div className="hero-terminal-line">
                <span className="prompt">$</span>{commandText}
                {isTyping && <span className="term-cursor" aria-hidden="true"></span>}
              </div>
              {outputShown >= index && line.output}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MainBody = () => {
  const typed = useTypewriter(devDesc);

  return (
    <div className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-inner">
            <span className="hero-eyebrow">
              <i className="fas fa-circle" style={{ fontSize: 6 }} aria-hidden="true"></i>
              Available for platform &amp; cloud engineering leadership
            </span>

            <h1 className="hero-title">
              {FirstName} {MiddleName} <span className="accent">{LastName}</span>
            </h1>

            <p className="hero-type">
              {typed}
              <span className="cursor" aria-hidden="true"></span>
            </p>

            <div className="hero-actions">
              <a href="/about" className="btn btn-primary">
                <i className="fas fa-user-circle" aria-hidden="true"></i> About Me
              </a>
              <a href="/projects" className="btn btn-secondary">
                <i className="fas fa-code" aria-hidden="true"></i> View Projects
              </a>
            </div>

            <div className="hero-social">
              {icons.map((icon) => (
                <a key={icon.id} href={icon.url} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={icon.image.split("-")[1]}>
                  <i className={`fab ${icon.image}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <HeroTerminal />
        </div>

        <div className="hero-stats stat-grid">
          <div className="stat">
            <span className="stat-number"><CountUp end={15} suffix="+" /></span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={100} suffix="+" /></span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={25} suffix="+" /></span>
            <span className="stat-label">Engineers Mentored</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={2} prefix="$" suffix="M+" /></span>
            <span className="stat-label">Cost Savings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
