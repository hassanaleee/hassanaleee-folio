'use client';

import React from 'react';
import { experienceItems } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section className="experience-section section-pad" id="experience">
      <div className="wrap">
        <div className="experience-heading mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3 text-[var(--sc-ink)]">
            Experience.
          </h2>
          <p className="text-lg sm:text-xl text-[var(--sc-ink-soft)]">
            Current work.
            <br />
            Back to the foundations.
          </p>
        </div>

        {/* Journey Roadmap Grid */}
        <div className="journey-roadmap">
          {experienceItems.map((item, idx) => (
            <article
              key={item.id}
              className={`journey-stop ${idx === 0 ? 'active' : ''}`}
            >
              <div className="journey-stop-marker" aria-hidden="true">
                <span />
              </div>

              <div className="journey-stop-content">
                <div className="journey-date">
                  <span>{item.period}</span>
                  {item.statusBadge && (
                    <span className="journey-current">{item.statusBadge}</span>
                  )}
                </div>

                <h3 className="text-[var(--sc-ink)]">{item.role}</h3>
                <div className="journey-place text-[var(--sc-ink)]">
                  {item.organization}
                  <span className="text-[var(--sc-ink-soft)]">{item.location}</span>
                </div>

                <p className="journey-description text-[var(--sc-ink-soft)]">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--sc-ink-soft)] space-y-1.5 list-disc list-inside">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
