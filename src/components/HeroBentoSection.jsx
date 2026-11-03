import React from 'react';
import {
  RiMapPin2Line,
  RiBuilding4Line,
  RiBarChartBoxLine,
  RiStackLine,
  RiCpuLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
} from '@remixicon/react';

export default function HeroBentoSection({ data, onContactClick }) {
  // Isolated subtle spotlight on card hover
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
    <section id="about" className="bento-hero-section container">
      {/* Bento Grid (Desktop 100% Viewport, Zero Scroll) */}
      <div className="bento-grid">
        {/* Card 1: Main Identity & Profile Portrait (Spans 2 columns, Row 1) */}
        <div
          className="bento-card bento-card-main"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner main-card-layout bento-inner-content">
            {/* Left Column: Details */}
            <div className="main-text-col">
              <div className="status-pill-row">
                <span className="mono-badge">PRODUCT OWNER & TECH BA</span>
                <span className="location-badge">
                  <RiMapPin2Line size={13} className="inline-icon" /> Kota, RJ
                </span>
              </div>

              {/* Title */}
              <h1 className="main-title">{data.personalDetails.name}</h1>

              {/* Subtitle */}
              <h2 className="sub-role">{data.personalDetails.title}</h2>

              <p className="about-summary">
                Pairs front-line operational leadership with <strong>hands-on product design in Figma</strong>, <strong>practical SQL stored procedures</strong>, and <strong>AI-accelerated prototyping</strong> to build and scale FinTech systems.
              </p>

              <div className="pill-tag-group">
                <span className="zinc-pill">Figma Wireframing</span>
                <span className="zinc-pill">BRD / PRD</span>
                <span className="zinc-pill">Practical SQL</span>
                <span className="zinc-pill">AI-Native MVPs</span>
              </div>
            </div>

            {/* Right Column: User Profile Photo (Clean, no badge overlay) */}
            <div className="main-photo-col">
              <div className="profile-photo-frame">
                <img
                  src="/profile.jpg"
                  alt="Vasudev Yadav"
                  className="profile-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Ground Operations Scale (1 col, Row 1) */}
        <div
          className="bento-card bento-card-stat"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner bento-inner-content">
            <div className="stat-top">
              <RiBuilding4Line size={18} className="stat-icon" />
              <span className="stat-tag">GROUND OPERATIONS</span>
            </div>
            <div className="stat-number">76 Staff</div>
            <div className="stat-label">36 Branches Managed</div>
            <p className="stat-desc">
              Direct leadership over loan disbursements, delinquency (OD buckets), and YES Bank BC compliance.
            </p>
          </div>
        </div>

        {/* Card 3: Analytics Project Card (1 col, Row 2) */}
        <div
          className="bento-card bento-card-stat"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner bento-inner-content">
            <div className="stat-top">
              <RiBarChartBoxLine size={18} className="stat-icon" />
              <span className="stat-tag">PORTFOLIO & DATA ANALYTICS</span>
            </div>
            <div className="stat-number">OD & MIS</div>
            <div className="stat-label">Delinquency & SQL Pipeline</div>
            <p className="stat-desc">
              Architected real-time OD bucket tracking (0–90+ DPD), SQL stored procedure audits, and automated daily portfolio MIS dashboards across 36 branches.
            </p>
          </div>
        </div>

        {/* Card 4: Flagship Platform (Spans 2 columns, Row 2) */}
        <div
          className="bento-card bento-card-feature"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner bento-inner-content">
            <div className="project-header">
              <div className="feature-tag-wrap">
                <RiStackLine size={16} className="inline-icon" />
                <span className="feature-tag">FLAGSHIP PLATFORM</span>
              </div>
              <span className="tech-tag-row">.NET Core • Angular • React Native</span>
            </div>

            <h3 className="feature-title">Fieldmate+</h3>
            <p className="feature-desc">
              White-label collection & field ops SaaS for NBFCs and MFIs. Features Android LO app with geo-tagged attendance, real-time UPI QR collections, and floating cash-lock safeguards.
            </p>

            <div className="feature-meta">
              <span>Guided 4 Developers</span>
              <a href="#projects" className="feature-link">
                View Architectural Specs <RiArrowRightLine size={14} className="inline-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Card 5: AI Microservice (1 col, Row 3) */}
        <div
          className="bento-card bento-card-ai"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner bento-inner-content">
            <div className="ai-header">
              <div className="ai-tag-wrap">
                <RiCpuLine size={16} className="inline-icon" />
                <span className="feature-tag">AI-NATIVE PROTOTYPE</span>
              </div>
              <span className="go-badge">Go 1.22</span>
            </div>

            <h3 className="ai-title">GST Vision AI Solver</h3>
            <p className="ai-desc">
              Solves tax portal CAPTCHAs via Gemma Multimodal Vision AI with cookiejar session persistence.
            </p>
          </div>
        </div>

        {/* Card 6: Contact & Interaction Hub (Spans 2 columns, Row 3) */}
        <div
          className="bento-card bento-card-cta"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner cta-inner bento-inner-content">
            <div className="cta-text">
              <span className="cta-pre">READY TO COLLABORATE?</span>
              <h3 className="cta-title">Let&apos;s Build Impact</h3>
            </div>
            <div className="cta-action-row">
              <button onClick={onContactClick} className="btn-dark-primary">
                Get In Touch <RiArrowRightLine size={15} className="inline-icon" />
              </button>
              <a
                href={data.personalDetails.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-secondary"
              >
                LinkedIn <RiArrowRightUpLine size={15} className="inline-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
