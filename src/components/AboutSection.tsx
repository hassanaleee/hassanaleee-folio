'use client';

import React from 'react';
import { Hero } from './Hero';
import { Biography } from './Biography';
import { PortraitJourney } from './PortraitJourney';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section relative">
      <PortraitJourney />
      <Hero />
      <Biography />
    </section>
  );
};
