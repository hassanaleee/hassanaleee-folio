'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun, MoreHorizontal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeaderProps {
  onOpenNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
    setTheme(current);

    const handleThemeChange = () => {
      const updated = (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
      setTheme(updated);
    };

    window.addEventListener('portfolio-theme', handleThemeChange);
    return () => window.removeEventListener('portfolio-theme', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {}
    setTheme(nextTheme);
    window.dispatchEvent(new Event('portfolio-theme'));
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#about" className="wordmark" aria-label={`${personalInfo.name}, home`}>
          <span className="wordmark-text">{personalInfo.name.split(' ')[0]}</span>
        </a>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={onOpenNav}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
          >
            <MoreHorizontal size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};
