import React from 'react';
import {
  RiMailLine,
  RiPhoneLine,
  RiLinkedinFill,
  RiGithubFill,
  RiArrowRightUpLine,
} from '@remixicon/react';

export default function ContactSection({ details }) {
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--card-x', `${x}px`);
    card.style.setProperty('--card-y', `${y}px`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--card-x', `-500px`);
    card.style.setProperty('--card-y', `-500px`);
  };

  return (
    <div className="contact-wrapper">
      <p className="contact-pitch">
        Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
      </p>

      {/* Contact Cards Grid (4 Direct Channels) */}
      <div className="contact-cards-grid">
        {/* Email Card */}
        <a
          href={`mailto:${details.email}`}
          className="contact-card"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiMailLine size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">DIRECT EMAIL</span>
              <span className="c-value">{details.email}</span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>

        {/* Phone Card */}
        <a
          href={`tel:${details.phone}`}
          className="contact-card"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiPhoneLine size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">PHONE / WHATSAPP</span>
              <span className="c-value">{details.phone}</span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href={details.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiLinkedinFill size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">LINKEDIN</span>
              <span className="c-value">{details.linkedin}</span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href={details.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiGithubFill size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">GITHUB</span>
              <span className="c-value">{details.github}</span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>
      </div>

      {/* Minimalist Footer Signature */}
      <div className="footer-sig">
        <span>© {new Date().getFullYear()} Vasudev Yadav • Designed with Minimalist Black & Grey Aesthetics</span>
      </div>
    </div>
  );
}
