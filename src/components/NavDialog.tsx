'use client';

import React, { useEffect } from 'react';
import { X, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavDialog: React.FC<NavDialogProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Freelance', href: '#freelance' },
    { label: 'World of Hassan', href: '#world' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <>
      <div
        className={`nav-dialog-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`nav-panel ${isOpen ? 'open' : ''}`}
      >
        <div className="nav-panel-top">
          <button
            type="button"
            className="nav-panel-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <span>close</span>
            <span className="nav-close-circle">
              <X size={20} />
            </span>
          </button>
        </div>

        <nav className="nav-panel-links" aria-label="Site navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-item"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-panel-footer">
          <a href={`mailto:${personalInfo.email}`} className="nav-panel-email">
            {personalInfo.email}
          </a>

          <div className="nav-panel-socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
