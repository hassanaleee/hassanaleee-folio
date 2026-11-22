'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = 360);

    interface Walker {
      x: number;
      speed: number;
      size: number;
      isFront: boolean;
      shade: number;
    }

    const walkers: Walker[] = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * width,
      speed: (Math.random() * 0.8 + 0.4) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 20 + 70,
      isFront: Math.random() > 0.5,
      shade: Math.floor(Math.random() * 40 + 20),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isPaused) {
        for (const w of walkers) {
          w.x += w.speed;
          if (w.x > width + 50) w.x = -50;
          if (w.x < -50) w.x = width + 50;

          const isDark = document.documentElement.dataset.theme === 'dark';
          ctx.fillStyle = isDark
            ? `rgba(${w.shade + 180}, ${w.shade + 180}, ${w.shade + 180}, 0.85)`
            : `rgba(${w.shade}, ${w.shade}, ${w.shade}, 0.85)`;

          const yBase = height - 10;
          // Head
          ctx.beginPath();
          ctx.arc(w.x, yBase - w.size, w.size * 0.12, 0, Math.PI * 2);
          ctx.fill();
          // Torso
          ctx.fillRect(w.x - w.size * 0.1, yBase - w.size * 0.85, w.size * 0.2, w.size * 0.5);
          // Legs
          ctx.fillRect(w.x - w.size * 0.09, yBase - w.size * 0.35, w.size * 0.07, w.size * 0.35);
          ctx.fillRect(w.x + w.size * 0.02, yBase - w.size * 0.35, w.size * 0.07, w.size * 0.35);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 1000;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>{personalInfo.name.split(' ')[0]}.</h2>
            <p>{personalInfo.role}</p>
          </div>

          <div className="footer-nav-grid">
            <div className="footer-nav-col">
              <p>Explore</p>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#freelance">Freelance</a>
              <a href="#world">World of Hassan</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-nav-col">
              <p>Connect</p>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1">
                <span>{personalInfo.email}</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <p className="mt-6 text-[var(--sc-ink-soft)] font-mono text-xs">
                © {new Date().getFullYear()} {personalInfo.name}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-finale">
          <div className="footer-finale-heading">
            <p>See you around.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={16} />
            </button>
          </div>

          {/* Crowd Scene button / canvas */}
          <button
            type="button"
            className="footer-crowd-scene"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={`${personalInfo.name.toUpperCase()}. Pause crowd animation`}
          >
            <span className="footer-crowd-name" aria-hidden="true">
              {personalInfo.name.split(' ')[0].toUpperCase()}.
            </span>

            {/* Pedestrians layer */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
          </button>

          <div className="footer-scene-bottom">
            <small>Finally, some traffic on my website.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};
