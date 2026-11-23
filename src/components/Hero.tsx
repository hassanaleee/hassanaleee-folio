'use client';

import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { GlyphBackground } from './GlyphBackground';

export const Hero: React.FC = () => {
  const word1 = 'MACHINE';
  const word2 = 'LEARNING';

  return (
    <div className="hero wrap" id="hero-wrap">
      {/* Confined WebGL Code Atlas Canvas Background — Hero Only */}
      <GlyphBackground
        code={personalInfo.codeDeclaration}
        className="hero-code-background"
        fontSize={12}
        interactive={true}
      />

      {/* Top professional identity label & primary CTA */}
      <div className="hero-top-composition" aria-label="Professional Identity">
        <div className="hero-top-badge">
          <span className="hero-status-pulse" aria-hidden="true" />
          <span className="hero-role-title">
            Hassan Kazmi <span className="hero-role-sep">—</span> AI/ML Engineer &amp; Managing Partner at Zeploy
          </span>
        </div>
        <div className="hero-top-actions">
          <a href="#projects" className="hero-cta-btn primary">
            <span>View Projects</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="#contact" className="hero-cta-btn secondary">
            <span>Let&apos;s Talk</span>
          </a>
        </div>
      </div>

      {/* Anchor frame for the single traveling 3D portrait */}
      <a
        href="#biography"
        className="hero-portrait-link"
        aria-label={`About ${personalInfo.name}`}
      />

      {/* Large typographic headline */}
      <div className="hero-heading-composition">
        <h1 className="hero-title hero-display-title" aria-label="AI & Machine Learning Engineer">
          <span className="title-line block">
            <span className="hero-word">
              <span className="hero-code-open hero-code-mark" aria-hidden="true">
                <svg
                  fill="none"
                  viewBox="20 0 110 160"
                  stroke="currentColor"
                  strokeWidth="16"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path
                    d="M105 30 48 80 105 130"
                    opacity=".16"
                    transform="translate(5 6)"
                  />
                  <path d="M105 30 48 80 105 130" />
                </svg>
              </span>
              {word1.split('').map((letter, i) => (
                <span key={i} className="hero-letter-window">
                  <span className="hero-letter">{letter}</span>
                </span>
              ))}
            </span>
          </span>

          <span className="title-line block">
            <span className="hero-word">
              <span className="hero-code-close hero-code-mark" aria-hidden="true">
                <svg
                  fill="none"
                  viewBox="0 0 180 160"
                  stroke="currentColor"
                  strokeWidth="16"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path
                    d="M65 30 25 130M100 30 157 80 100 130"
                    opacity=".16"
                    transform="translate(5 6)"
                  />
                  <path d="M65 30 25 130M100 30 157 80 100 130" />
                </svg>
              </span>
              {word2.split('').map((letter, i) => (
                <span key={i} className="hero-letter-window">
                  <span className="hero-letter">{letter}</span>
                </span>
              ))}
            </span>
          </span>
        </h1>
      </div>

      {/* Hero footer status line */}
      <div className="hero-footer">
        <span className="hero-year">©2026</span>
        <div className="hero-focus">
          <span className="terminal-text" data-running="true">
            <span aria-hidden="true">{'{{ '}</span>
            <span>/{personalInfo.role.toUpperCase()}</span>
            <span className="terminal-caret" aria-hidden="true" />
            <span aria-hidden="true">{' }}'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
