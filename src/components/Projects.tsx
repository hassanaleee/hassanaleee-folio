'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, FileText, ArrowRight, X } from 'lucide-react';
import { projects } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('mockai');
  const [activeScreenshotUrl, setActiveScreenshotUrl] = useState<string | null>(null);

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  useEffect(() => {
    if (selectedProject) {
      setActiveScreenshotUrl(selectedProject.image);
    }
  }, [selectedProjectId, selectedProject]);

  const handleOpenFolder = (id: string) => {
    setSelectedProjectId(id);
    setTimeout(() => {
      const panel = document.getElementById('project-details-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <section className="projects-section wrap section-pad measure-content" id="projects">
      <div className="section-heading mb-8">
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-3">Featured Projects</h2>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--sc-ink-soft)]">
          <a
            href="https://github.com/hassanaleee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[var(--sc-ink)] hover:underline"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <span>·</span>
          <span>
            Independent systems and applied machine learning projects. Open a folder to explore architecture and case study.
          </span>
        </div>
      </div>

      {/* 3D Physical Project Folders Grid */}
      <div className="project-folder-grid">
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          return (
            <button
              key={project.id}
              type="button"
              className="project-folder"
              data-folder-id={project.id}
              aria-expanded={isSelected}
              aria-controls="project-details-panel"
              onClick={() => handleOpenFolder(project.id)}
              onPointerMove={(e) => {
                if (e.pointerType !== 'mouse') return;
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  '--folder-lean',
                  `${((e.clientX - rect.left) / rect.width - 0.5) * 10}deg`
                );
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty('--folder-lean', '0deg');
              }}
            >
              <span className="sr-only">{project.title}</span>
              <span className="folder-scene" aria-hidden="true">
                <span className="folder-back" />

                {/* Back Paper */}
                <span className="folder-paper folder-paper-back">
                  <FileText size={18} />
                  <span>Case study overview</span>
                  <span className="folder-paper-lines" />
                </span>

                {/* Preview Paper */}
                <span className="folder-paper folder-paper-preview">
                  {project.image ? (
                    <div className="folder-thumb-frame">
                      <Image
                        src={project.image}
                        alt=""
                        width={600}
                        height={360}
                        className="folder-preview-img"
                      />
                    </div>
                  ) : (
                    <span className="folder-case-preview">
                      <span>{project.companyOrContext}</span>
                      <strong>{project.title}</strong>
                      <span>Case Study</span>
                    </span>
                  )}
                  <span className="text-xs font-semibold truncate block mt-1">
                    {project.title}
                  </span>
                </span>

                {/* Front Paper */}
                <span className="folder-paper folder-paper-front">
                  <FileText size={18} />
                  <span>Architecture &amp; Metrics</span>
                  <span className="folder-paper-lines" />
                </span>

                {/* Folder Front Flap */}
                <span className="folder-front">
                  <span className="folder-front-title">{project.title}</span>
                  <span className="folder-open-icon">
                    <ArrowRight size={18} />
                  </span>
                </span>
              </span>

              {/* Folder Caption & Outcome Highlight */}
              <span className="folder-caption-block">
                {project.outcomeHighlight && (
                  <span className="folder-outcome-highlight">
                    {project.outcomeHighlight}
                  </span>
                )}
                <span className="folder-caption">
                  <span>{project.category}</span>
                  <span className="folder-caption-action">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Expandable Project Details / Case Study Panel */}
      {selectedProjectId && selectedProject && (
        <div
          id="project-details-panel"
          className="project-details-panel mt-16"
          role="region"
          tabIndex={-1}
        >
          <div className="project-panel-toolbar">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-mono font-bold">
                Project Case Study
              </span>
              <span className="text-xs opacity-60 font-mono">/ {selectedProject.title}</span>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setSelectedProjectId(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>
          </div>

          <div className="project-study-layout grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 pt-6">
            {/* Overview column */}
            <div className="case-study-overview">
              <div className="text-xs uppercase tracking-wider font-mono text-[var(--sc-ink-soft)] mb-2">
                {selectedProject.companyOrContext}
              </div>
              <h3 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-[var(--sc-ink)]">
                {selectedProject.title}
              </h3>
              <p className="case-study-summary text-[var(--sc-ink)]">
                {selectedProject.shortDescription}
              </p>

              <dl className="case-study-facts">
                <div>
                  <dt>Role</dt>
                  <dd>AI &amp; Machine Learning Engineer</dd>
                </div>
                <div>
                  <dt>Ownership</dt>
                  <dd>{selectedProject.caseStudy.contribution}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{selectedProject.technologies.slice(0, 5).join(' · ')}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>Active Verified Implementation</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3 mt-8">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-btn primary"
                  >
                    <Github size={16} />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="case-study-btn secondary"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Narrative column */}
            <div className="case-study-narrative">
              {/* Screenshot artifact */}
              {selectedProject.image && (
                <div className="mb-8 rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--surface-strong)] p-2">
                  <div className="flex items-center justify-between pb-2 px-2 border-b border-[var(--line)] mb-3 text-xs font-mono text-[var(--sc-ink-soft)]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Verified System Artifact
                    </span>
                    <span>{selectedProject.id.toUpperCase()}</span>
                  </div>

                  {/* Secondary Screenshot Tabs */}
                  {selectedProject.secondaryScreenshots &&
                    selectedProject.secondaryScreenshots.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-3 px-1">
                        {selectedProject.secondaryScreenshots.map((shot, idx) => {
                          const isActive =
                            (activeScreenshotUrl || selectedProject.image) === shot.url;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveScreenshotUrl(shot.url)}
                              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                                isActive
                                  ? 'bg-[var(--sc-ink)] text-[var(--sc-canvas)] font-semibold'
                                  : 'bg-[var(--surface-strong)] text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)] border border-[var(--line)]'
                              }`}
                            >
                              {shot.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                  <div className="relative w-full aspect-[16/9] max-h-[440px] rounded-lg overflow-hidden bg-black/20">
                    <Image
                      src={activeScreenshotUrl || selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                </div>
              )}

              {/* Challenge section */}
              <section className="case-study-section">
                <h4>The challenge</h4>
                <p>{selectedProject.caseStudy.challenge}</p>
              </section>

              {/* Approach section */}
              <section className="case-study-section">
                <h4>My approach</h4>
                <ol className="case-study-delivery">
                  {selectedProject.caseStudy.approach.map((step, idx) => (
                    <li key={idx}>
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Impact section */}
              <section className="case-study-section">
                <h4>The impact</h4>
                <div className="case-study-impact">
                  <p>{selectedProject.caseStudy.impact.summary}</p>
                </div>

                {selectedProject.caseStudy.impact.metrics && (
                  <div className="metrics-row">
                    {selectedProject.caseStudy.impact.metrics.map((m, idx) => (
                      <div key={idx} className="metric-box">
                        <div className="metric-label">{m.label}</div>
                        <div className="metric-comparison">
                          <span className="opacity-50 line-through text-sm">{m.before}</span>
                          <span className="metric-arrow">→</span>
                          <span>{m.after}</span>
                        </div>
                        <div className="metric-note">{m.note}</div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
