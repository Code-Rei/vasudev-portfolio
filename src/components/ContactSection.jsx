import React from 'react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

// Crisp pixel-perfect standard SVG icons matching Lucide 24x24 stroke style
function LinkedinIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ContactSection({ details }) {
  return (
    <div className="contact-wrapper">
      <div className="contact-intro">
        <p className="contact-subtext">
          Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
        </p>
      </div>

      {/* Contact Grid with Crisp Official Icons */}
      <div className="contact-grid">
        {/* Email Card */}
        <a href={`mailto:${details.email}`} className="contact-card">
          <div className="contact-icon-box">
            <Mail size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">Direct Email</span>
            <span className="c-value">{details.email}</span>
          </div>
          <ArrowUpRight size={18} className="c-arrow" />
        </a>

        {/* Phone Card */}
        <a href={`tel:${details.phone}`} className="contact-card">
          <div className="contact-icon-box">
            <Phone size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">Phone / WhatsApp</span>
            <span className="c-value">{details.phone}</span>
          </div>
          <ArrowUpRight size={18} className="c-arrow" />
        </a>

        {/* LinkedIn Card */}
        <a href={details.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-card">
          <div className="contact-icon-box">
            <LinkedinIcon size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">LinkedIn</span>
            <span className="c-value">{details.linkedin}</span>
          </div>
          <ArrowUpRight size={18} className="c-arrow" />
        </a>

        {/* GitHub Card */}
        <a href={details.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-card">
          <div className="contact-icon-box">
            <GithubIcon size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">GitHub</span>
            <span className="c-value">{details.github}</span>
          </div>
          <ArrowUpRight size={18} className="c-arrow" />
        </a>
      </div>

      {/* Minimalist Footer Signature */}
      <div className="minimal-footer">
        <span className="footer-meta">
          © 2026 Vasudev Yadav • Built with React, Framer Motion & Minimalist Black & Grey Aesthetics
        </span>
      </div>
    </div>
  );
}
