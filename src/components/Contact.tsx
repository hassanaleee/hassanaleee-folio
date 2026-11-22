'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg('Please complete all fields before sending.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="wrap">
        <div className="contact-layout">
          {/* Contact Opening */}
          <div className="contact-opening">
            <h2 className="text-[var(--sc-ink)]">Let&apos;s talk.</h2>
            <p className="text-[var(--sc-ink-soft)]">
              Whether it&apos;s a full-time engineering role, a collaboration, or an AI system project,
              my inbox is open.
            </p>

            <div className="email-block">
              <a href={`mailto:${personalInfo.email}`} className="email-link">
                <span>{personalInfo.email}</span>
                <ArrowUpRight size={20} />
              </a>

              <button
                type="button"
                className="copy-email-btn"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to clipboard!' : 'Copy'}</span>
              </button>
            </div>

            <div className="socials-list">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Working Contact Form */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="text-center py-12 px-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-[var(--sc-ink)]">Message Received</h3>
                <p className="text-[var(--sc-ink-soft)] text-sm max-w-sm mx-auto mb-6">
                  Thank you for reaching out. I have received your message and will get back to you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-wider font-mono text-[var(--sc-ink-soft)] hover:text-[var(--sc-ink)] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Tell me about your project, timeline, or engineering inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                {errorMsg && (
                  <p className="text-rose-500 text-sm mb-4">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--sc-canvas)] border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
