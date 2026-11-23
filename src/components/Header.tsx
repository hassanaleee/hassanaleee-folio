'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun, MoreHorizontal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeaderProps {
  onOpenNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
    setTheme(current);

    const handleThemeChange = () => {
      const updated = (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
      setTheme(updated);
    };

    window.addEventListener('portfolio-theme', handleThemeChange);

    const sectionIds = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
    const handleScroll = () => {
      // If user reaches near the bottom of the page, activate the last tab ('contact')
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection('contact');
        return;
      }

      const scrollPos = window.scrollY + 200;
      const sortedSections = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item): item is { id: string; el: HTMLElement } => Boolean(item.el))
        .sort((a, b) => b.el.offsetTop - a.el.offsetTop);

      for (const item of sortedSections) {
        if (item.el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          return;
        }
      }
      setActiveSection('about');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('portfolio-theme', handleThemeChange);
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWordmarkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      {/* Top floating bar: Wordmark + Theme Toggle + Menu */}
      <div className="header-inner">
        <a
          href="#hero-wrap"
          className="wordmark"
          onClick={handleWordmarkClick}
          aria-label={`${personalInfo.name}, home`}
        >
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

      {/* Second row: Minimal navigation tabs pill */}
      <nav className="header-nav-tabs" aria-label="Section navigation">
        <div className="nav-tabs-scroll">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-tab-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleTabClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
