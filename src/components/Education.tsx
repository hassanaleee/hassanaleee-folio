'use client';

import React from 'react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section className="education-section section-pad" id="education">
      <div className="wrap">
        <div className="section-heading mb-10">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3 text-[var(--sc-ink)]">
            Education.
          </h2>
          <p className="text-lg sm:text-xl text-[var(--sc-ink-soft)]">
            Academic foundations and coursework.
          </p>
        </div>

        <div className="education-card p-6 sm:p-10 rounded-2xl border border-[var(--line)] bg-[var(--sc-surface)] transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--sc-ink)]">
              {educationData.degree}
            </h3>
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sc-ink)] self-start sm:self-auto">
              {educationData.period}
            </span>
          </div>

          <div className="text-base sm:text-lg font-medium text-[var(--sc-ink-soft)] mb-4">
            {educationData.institution}
          </div>

          <p className="text-sm sm:text-base text-[var(--sc-ink-soft)] leading-relaxed mb-6">
            {educationData.description} Student ID: {educationData.regNo}.
          </p>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--sc-ink-soft)] block mb-3">
              Core Coursework
            </span>
            <div className="flex flex-wrap gap-2">
              {educationData.coursework.map((course, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sc-ink)]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
