'use client';

import React from 'react';
import { skillCategories } from '../data/portfolioData';

export const TechStack: React.FC = () => {
  return (
    <section className="skills-section section-pad" id="skills">
      <div className="wrap">
        <div className="skills-heading">
          <h2>Tech Stack</h2>
          <p>
            The tools behind
            <br />
            my work.
          </p>
        </div>

        <div className="skills-specimens">
          {skillCategories.map((specimen, idx) => (
            <article key={idx} className="skills-specimen">
              <h3>{specimen.title}</h3>
              <p className="skills-specimen-note">{specimen.subtitle}</p>
              <ul className="skills-type-mosaic">
                {specimen.skills.map((skill, sIdx) => (
                  <li key={sIdx}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
