import React from 'react';
import {
  RiMailLine,
  RiPhoneLine,
  RiLinkedinFill,
  RiGithubFill,
  RiArrowRightUpLine
} from '@remixicon/react';

export default function ContactSection({ details }) {
  return (
    <div className="contact-wrapper">
      <div className="contact-intro">
        <p className="contact-subtext">
          Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
        </p>
      </div>

      {/* Contact Grid with Official Remix Icons */}
      <div className="contact-grid">
        {/* Email Card */}
        <a href={`mailto:${details.email}`} className="contact-card">
          <div className="contact-icon-box">
            <RiMailLine size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">Direct Email</span>
            <span className="c-value">{details.email}</span>
          </div>
          <RiArrowRightUpLine size={18} className="c-arrow" />
        </a>

        {/* Phone Card */}
        <a href={`tel:${details.phone}`} className="contact-card">
          <div className="contact-icon-box">
            <RiPhoneLine size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">Phone / WhatsApp</span>
            <span className="c-value">{details.phone}</span>
          </div>
          <RiArrowRightUpLine size={18} className="c-arrow" />
        </a>

        {/* LinkedIn Card */}
        <a href={details.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-card">
          <div className="contact-icon-box">
            <RiLinkedinFill size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">LinkedIn</span>
            <span className="c-value">{details.linkedin}</span>
          </div>
          <RiArrowRightUpLine size={18} className="c-arrow" />
        </a>

        {/* GitHub Card */}
        <a href={details.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-card">
          <div className="contact-icon-box">
            <RiGithubFill size={20} className="c-icon" />
          </div>
          <div className="contact-info">
            <span className="c-label">GitHub</span>
            <span className="c-value">{details.github}</span>
          </div>
          <RiArrowRightUpLine size={18} className="c-arrow" />
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
