'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { NavDialog } from '../components/NavDialog';
import { AboutSection } from '../components/AboutSection';
import { ImpactMetrics } from '../components/ImpactMetrics';
import { TechStack } from '../components/TechStack';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { Freelance } from '../components/Freelance';
import { WorldOfHassan } from '../components/WorldOfHassan';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="portfolio">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Floating Header with Theme Toggle */}
      <Header onOpenNav={() => setIsNavOpen(true)} />

      {/* Slide-in Navigation Dialog */}
      <NavDialog isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Main Content Sections */}
      <main id="main">
        {/* AboutSection combines Hero and Biography */}
        <AboutSection />
        <ImpactMetrics />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <Freelance />
        <WorldOfHassan />
        <Contact />
      </main>

      {/* Footer with Crowd Scene */}
      <Footer />
    </div>
  );
}
