import React from 'react';
import { useMountTransition } from '../hooks/useMountTransition';

const SHORTCUTS = [
  { keys: ['⌘', 'K'], description: 'Open command palette' },
  { keys: ['Esc'], description: 'Close the open dialog' },
  { keys: ['?'], description: 'Show this help' },
];

const ShortcutsModal = ({ isOpen, onClose }) => {
  const [mounted, animateIn] = useMountTransition(isOpen);

  if (!mounted) return null;

  return (
    <div className={`cmdk-overlay ${animateIn ? 'open' : ''}`} onMouseDown={onClose}>
      <div className="cmdk-panel" style={{ maxWidth: 420 }} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
        <div className="cmdk-input-row">
          <i className="fas fa-keyboard" aria-hidden="true"></i>
          <span style={{ flex: 1, fontWeight: 600 }}>Keyboard Shortcuts</span>
          <kbd>Esc</kbd>
        </div>
        <div className="cmdk-list">
          {SHORTCUTS.map((s) => (
            <div key={s.description} className="cmdk-item" style={{ cursor: 'default' }}>
              <span className="cmdk-item-label">{s.description}</span>
              <span className="cluster" style={{ '--gap': '0.25rem' }}>
                {s.keys.map((k, i) => (
                  <kbd key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 4, padding: '0.15rem 0.45rem' }}>{k}</kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;
