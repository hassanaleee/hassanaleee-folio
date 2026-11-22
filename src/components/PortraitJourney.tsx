'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { personalInfo } from '../data/portfolioData';

export const PortraitJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const aboutSection = container.closest('.about-section') as HTMLElement | null;
    if (!aboutSection) return;

    const heroPlaceholder = aboutSection.querySelector('.hero-portrait-link') as HTMLElement | null;
    const bioPlaceholder = aboutSection.querySelector('.bio-portrait') as HTMLElement | null;
    const stickyStage = container.querySelector('.portrait-sticky-stage') as HTMLElement | null;
    if (!heroPlaceholder || !bioPlaceholder || !stickyStage) return;

    let animId = 0;
    let currentU = 0;
    let targetU = 0;
    let p = 0;
    let m = 1;
    let f = 0.5;
    let x = 0.5;
    let j = 0;
    let g = 0;
    let initRadius = 9;
    let finalRadius = 16;
    let lastTime = 0;
    let isAutoPlaying = true;
    let userHasScrolled = false;
    let isDisposed = false;

    const applyTransform = (u: number) => {
      const scaleX = f + (1 - f) * u;
      const scaleY = x + (1 - x) * u;
      const smoothA = u * u * (3 - 2 * u); // smoothstep: 3u^2 - 2u^3
      const rotY = 360 * smoothA;
      const radius = initRadius + (finalRadius - initRadius) * u;

      card.style.transform = `perspective(1200px) translate3d(${g * (1 - u)}px, ${j * (1 - u)}px, 0px) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)}) rotateY(${rotY.toFixed(2)}deg)`;
      card.style.borderRadius = `${radius.toFixed(1)}px`;
    };

    const updateBounds = () => {
      if (isDisposed) return;
      const rectAbout = aboutSection.getBoundingClientRect();
      const rectHero = heroPlaceholder.getBoundingClientRect();
      const rectBio = bioPlaceholder.getBoundingClientRect();
      const clientH = document.documentElement.clientHeight || window.innerHeight;
      const S_top = clientH - 20 - rectBio.height;

      p = rectAbout.top + window.scrollY;
      m = rectBio.top + window.scrollY - p - S_top;

      if (m <= 0 || !rectBio.width || !rectHero.width) return;

      f = rectHero.width / rectBio.width;
      x = rectHero.height / rectBio.height;
      j = rectHero.top + window.scrollY - p - S_top - (rectBio.height - rectHero.height) / 2;
      g = rectHero.left + rectHero.width / 2 - (rectBio.left + rectBio.width / 2);
      initRadius = 9 / Math.min(f, x);
      finalRadius = 16;

      container.style.height = `${m + clientH}px`;
      card.style.width = `${rectBio.width}px`;
      card.style.height = `${rectBio.height}px`;
      card.style.left = `${rectBio.left - rectAbout.left}px`;
      card.style.top = `${S_top}px`;

      applyTransform(currentU);
      card.style.visibility = 'visible';
    };

    const handleLoop = (now: number) => {
      if (isDisposed) return;
      const dt = lastTime ? Math.min(now - lastTime, 64) : 16.67;
      lastTime = now;

      if (isAutoPlaying) {
        // Smoothly animate towards targetU on page load
        const step = 0.03 * (dt / 16.67);
        currentU += (targetU - currentU) * step;
        if (Math.abs(targetU - currentU) < 0.001) {
          currentU = targetU;
          isAutoPlaying = false;
        }
      } else {
        // Interactive scroll tracking with exponential easing
        currentU += (targetU - currentU) * (1 - Math.exp(-dt / 65));
        if (Math.abs(targetU - currentU) < 0.0001) {
          currentU = targetU;
        }
      }

      applyTransform(currentU);
      animId = requestAnimationFrame(handleLoop);
    };

    const onScroll = () => {
      if (isAutoPlaying && userHasScrolled) {
        isAutoPlaying = false;
      }
      targetU = Math.max(0, Math.min(1, (window.scrollY - p) / m));
    };

    const onUserInteract = () => {
      userHasScrolled = true;
      isAutoPlaying = false;
      targetU = Math.max(0, Math.min(1, (window.scrollY - p) / m));
    };

    updateBounds();
    animId = requestAnimationFrame(handleLoop);

    // Auto-start entrance & transition on fresh page load after 800ms
    const autoTimer = setTimeout(() => {
      if (!userHasScrolled && window.scrollY < 40) {
        isAutoPlaying = true;
        targetU = 1.0;
        const targetScroll = Math.max(0, p + m);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      } else {
        isAutoPlaying = false;
      }
    }, 800);

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(heroPlaceholder);
    resizeObserver.observe(bioPlaceholder);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onUserInteract, { passive: true });
    window.addEventListener('touchstart', onUserInteract, { passive: true });
    window.addEventListener('keydown', onUserInteract, { passive: true });
    window.addEventListener('resize', updateBounds);
    document.fonts.ready.then(updateBounds);

    return () => {
      isDisposed = true;
      clearTimeout(autoTimer);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onUserInteract);
      window.removeEventListener('touchstart', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  return (
    <div ref={containerRef} className="portrait-journey" aria-hidden="true">
      <div className="portrait-sticky-stage">
        <div ref={cardRef} className="portrait-card" style={{ visibility: 'hidden' }}>
          <Image
            src="/hassan-portrait.jpg"
            alt={personalInfo.name}
            width={960}
            height={1104}
            priority
            className="portrait-single-img"
          />
        </div>
      </div>
    </div>
  );
};
