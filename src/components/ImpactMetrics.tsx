'use client';

import React from 'react';

export const ImpactMetrics: React.FC = () => {
  const metrics = [
    {
      value: '10+',
      label: 'Production AI Systems',
      detail: 'LLM applications, RAG pipelines & agentic workflows',
    },
    {
      value: '5+',
      label: 'Client & Startup Deployments',
      detail: 'Full-stack software engineering & cloud architecture led',
    },
    {
      value: '<15s',
      label: 'Multimodal Feedback Latency',
      detail: 'Speech, NLP & facial emotion inference turnaround',
    },
    {
      value: '100%',
      label: 'End-to-End Stack Coverage',
      detail: 'FastAPI, pgvector, Next.js, Docker & microservices',
    },
  ];

  return (
    <section className="impact-strip wrap" aria-label="Key Milestones and Engineering Impact">
      <div className="impact-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="impact-card">
            <span className="impact-value">{metric.value}</span>
            <strong className="impact-label">{metric.label}</strong>
            <p className="impact-detail">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
