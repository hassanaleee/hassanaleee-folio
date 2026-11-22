'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Biography: React.FC = () => {
  return (
    <div className="biography wrap" id="biography">
      <div className="bio-introduction">
        <h2>
          Hi, I&apos;m
          <br />
          {personalInfo.name.split(' ')[0]}.
        </h2>
        <p className="bio-role">
          {personalInfo.role.split('&')[0]}
          <span>&amp; {personalInfo.role.split('&')[1] || 'Systems Engineer.'}</span>
        </p>

        <div className="bio-current">
          <span>Currently at</span>
          <p>
            <strong>{personalInfo.currentRole.organization}</strong>
            <br />
            {personalInfo.currentRole.title}
            <br />
            <span>{personalInfo.currentRole.location}</span>
          </p>
        </div>
      </div>

      {/* Anchor frame for the single traveling 3D portrait */}
      <figure className="bio-portrait" aria-label={`Portrait of ${personalInfo.name}`} />

      <div className="bio-description">
        <p className="bio-lead">
          I work across <strong>artificial intelligence</strong>,{' '}
          <strong>machine learning</strong>, and <strong>software systems</strong>, building practical
          applications that turn complex ideas into useful solutions.
        </p>

        <div className="bio-actions">
          <a href="#projects" className="bio-projects">
            <span>Explore projects</span>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};
