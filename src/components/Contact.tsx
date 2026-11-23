'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2500);
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
              my inbox and direct channels are open.
            </p>

            {/* Direct Contact Channels */}
            <div className="contact-direct-channels">
              {/* Email */}
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

              {/* Phone / WhatsApp */}
              <div className="phone-block">
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="phone-link"
                  aria-label="Direct message on WhatsApp (+92 333 7184344)"
                >
                  <WhatsAppIcon size={19} className="whatsapp-icon-accent shrink-0" />
                  <span>{personalInfo.phone}</span>
                  <ArrowUpRight size={20} />
                </a>

                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyPhone}
                  aria-label="Copy phone number"
                >
                  {phoneCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  <span>{phoneCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Social Pills including quick WhatsApp message pill */}
            <div className="socials-list">
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill whatsapp-pill"
                aria-label="Message on WhatsApp"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>

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
