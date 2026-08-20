import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMountTransition } from '../hooks/useMountTransition';

const ROUTES = [
  { icon: 'fas fa-home', label: 'Welcome', to: '/' },
  { icon: 'fas fa-user-circle', label: 'About Me', to: '/about' },
  { icon: 'fas fa-route', label: 'Experience', to: '/experience' },
  { icon: 'fas fa-users-cog', label: 'Leadership', to: '/leadership' },
  { icon: 'fas fa-rocket', label: 'Projects', to: '/projects' },
  { icon: 'fas fa-code', label: 'Skills & Expertise', to: '/skills' },
  { icon: 'fas fa-compass', label: 'Interests', to: '/interests' },
  { icon: 'fas fa-envelope', label: 'Contact', to: '/contact' },
];

const CommandPalette = ({ isOpen, onClose, onOpenShortcuts }) => {
  const navigate = useNavigate();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, animateIn] = useMountTransition(isOpen);
  const inputRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        icon: resolvedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon',
        label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`,
        hint: 'Theme',
        run: toggleTheme,
      },
      {
        icon: 'fas fa-paper-plane',
        label: 'Email me',
        hint: 'anuragvaidhya786@gmail.com',
        run: () => { window.location.href = 'mailto:anuragvaidhya786@gmail.com'; },
      },
      {
        icon: 'fas fa-file-arrow-down',
        label: 'Download resume',
        hint: 'PDF',
        run: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer'),
      },
      {
        icon: 'fab fa-github',
        label: 'Open GitHub',
        hint: 'github.com/anuu1989',
        run: () => window.open('https://github.com/anuu1989', '_blank', 'noopener,noreferrer'),
      },
      {
        icon: 'fab fa-linkedin',
        label: 'Open LinkedIn',
        hint: 'linkedin.com',
        run: () => window.open('https://www.linkedin.com/in/anurag-vaidhya-47b93222', '_blank', 'noopener,noreferrer'),
      },
      {
        icon: 'fas fa-keyboard',
        label: 'Keyboard shortcuts',
        hint: '?',
        run: () => onOpenShortcuts?.(),
      },
    ],
    [resolvedTheme, toggleTheme, onOpenShortcuts]
  );

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const routeItems = ROUTES.filter((r) => r.label.toLowerCase().includes(q)).map((r) => ({
      ...r,
      group: 'Go to',
      run: () => navigate(r.to),
    }));
    const actionItems = actions
      .filter((a) => a.label.toLowerCase().includes(q))
      .map((a) => ({ ...a, group: 'Actions' }));
    return [...routeItems, ...actionItems];
  }, [query, actions, navigate]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const runItem = (item) => {
    if (!item) return;
    item.run();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(items[activeIndex]);
    }
  };

  if (!mounted) return null;

  let lastGroup = null;

  return (
    <div className={`cmdk-overlay ${animateIn ? 'open' : ''}`} onMouseDown={onClose}>
      <div className="cmdk-panel" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cmdk-input-row">
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a page or run an action..."
            aria-label="Command palette search"
          />
          <kbd>Esc</kbd>
        </div>
        <div className="cmdk-list" role="listbox">
          {items.length === 0 && <div className="cmdk-empty">No matches for "{query}"</div>}
          {items.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <React.Fragment key={`${item.group}-${item.label}`}>
                {showGroup && <div className="cmdk-group-label">{item.group}</div>}
                <div
                  className={`cmdk-item ${index === activeIndex ? 'active' : ''}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runItem(item)}
                >
                  <span className="icon-tile"><i className={item.icon}></i></span>
                  <span className="cmdk-item-label">{item.label}</span>
                  {item.hint && <span className="cmdk-item-hint">{item.hint}</span>}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
