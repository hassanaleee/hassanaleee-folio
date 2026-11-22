'use client';

import React from 'react';
import { Bot, Cpu, Database, Globe, Wrench } from 'lucide-react';
import { freelanceServices } from '../data/portfolioData';

export const Freelance: React.FC = () => {
  const icons = [Bot, Cpu, Database, Globe, Wrench];

  return (
    <section className="section-pad" id="freelance">
      <div className="wrap">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3 text-[var(--sc-ink)]">
            What I Work On
          </h2>
          <p className="text-lg sm:text-xl text-[var(--sc-ink-soft)] max-w-2xl">
            Practical artificial intelligence, robust backend infrastructure, and modern software
            systems built for reliability and clarity.
          </p>
        </div>

        <div className="services-grid">
          {freelanceServices.map((service, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div key={idx} className="service-card group">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-strong)] border border-[var(--line)] flex items-center justify-center mb-5 text-[var(--sc-ink)] group-hover:border-[var(--line-strong)] transition-colors">
                  <IconComponent size={20} />
                </div>
                <h3 className="text-[var(--sc-ink)]">{service.title}</h3>
                <p className="text-[var(--sc-ink-soft)]">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
