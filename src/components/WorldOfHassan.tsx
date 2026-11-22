'use client';

import React, { useEffect, useRef } from 'react';
import { Compass } from 'lucide-react';
import { worldOfHassan } from '../data/portfolioData';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  radius: number;
}

export const WorldOfHassan: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const labels = [
      'Speech Recognition',
      'Emotion Analysis',
      'pgvector HNSW',
      'RAG Pipelines',
      'FastAPI Microservices',
      'Reciprocal Rank Fusion',
      'Docker Containers',
      'Multimodal Processing',
      'TypeScript Ergonomics',
      'Context Preservation',
    ];

    const nodes: Node[] = labels.map((label) => ({
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 60) + 30,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      label,
      radius: 4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const computedStyle = getComputedStyle(container);
      const isDark = document.documentElement.dataset.theme === 'dark';
      const strokeColor = isDark ? '255, 255, 255' : '20, 20, 20';
      const textColor = computedStyle.color || (isDark ? '#f8f7f4' : '#141414');

      // Draw faint connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.16;
            ctx.strokeStyle = `rgba(${strokeColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes and labels
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        ctx.fillStyle = textColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isDark ? 'rgba(248, 247, 244, 0.5)' : 'rgba(20, 20, 20, 0.6)';
        ctx.font = '11px monospace';
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="section-pad" id="world" ref={containerRef}>
      <div className="wrap">
        <div className="border border-[var(--line)] rounded-2xl bg-[var(--sc-surface)] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--line)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Compass size={16} className="text-[var(--sc-ink-soft)]" />
                <span className="text-xs uppercase tracking-wider font-mono text-[var(--sc-ink-soft)]">
                  Interactive Space · Experimental
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--sc-ink)]">
                {worldOfHassan.title}
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sc-ink)]">
              {worldOfHassan.status}
            </span>
          </div>

          <p className="text-base sm:text-lg text-[var(--sc-ink-soft)] max-w-3xl mb-8 leading-relaxed">
            {worldOfHassan.description}
          </p>

          {/* Interactive Neural Topology Canvas */}
          <div className="relative w-full h-[360px] rounded-xl overflow-hidden bg-[var(--sc-canvas)] border border-[var(--line)] mb-8">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-4 left-4 text-xs font-mono text-[var(--sc-ink-soft)] bg-[var(--sc-surface)] px-2.5 py-1 rounded border border-[var(--line)] pointer-events-none">
              Interactive Latent Space Topology
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-xl bg-[var(--surface-strong)] border border-[var(--line)]">
            <p className="italic text-[var(--sc-ink)] text-sm sm:text-base m-0">
              &ldquo;{worldOfHassan.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
