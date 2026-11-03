import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building2,
  Zap,
  Layers,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 16,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 190,
      damping: 18,
      mass: 0.8,
    },
  },
};

export default function HeroBentoSection({ data, onContactClick }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--card-x', `${x}px`);
    card.style.setProperty('--card-y', `${y}px`);

    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--card-x', `-500px`);
    card.style.setProperty('--card-y', `-500px`);
  };

  useEffect(() => {
    // Fallback timer for touch devices
    const timer = setTimeout(() => {
      setHasInteracted(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="bento-hero-section container">
      {/* Wake-up Hint */}
      <div className={`wake-up-hint ${hasInteracted ? 'is-dormant' : ''}`}>
        <span className="pulse-beacon" />
        <span className="hint-text">Move cursor across workspace to assemble</span>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={hasInteracted ? 'visible' : 'hidden'}
        className="bento-grid"
      >
        {/* Component 1: Main Identity & Profile Portrait (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-main"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner main-card-layout">
            {/* Left Column: Details */}
            <div className="main-text-col">
              <div className="status-pill-row">
                <span className="mono-badge">PRODUCT OWNER & TECH BA</span>
                <span className="location-badge">
                  <MapPin size={13} className="inline-block mr-1" /> Kota, RJ
                </span>
                <span className="live-status">
                  <span className="live-dot" /> Available for Roles
                </span>
              </div>

              <h1 className="main-title">{data.personalDetails.name}</h1>
              <h2 className="sub-role">{data.personalDetails.title}</h2>

              <p className="about-summary">
                Pairs front-line operational leadership (previously directed <strong>76 staff across 36 branches</strong> in microfinance lending) with hands-on product design in Figma, practical SQL, and developer sprint orchestration. Rapidly prototypes working microservices with AI.
              </p>

              <div className="pill-tag-group">
                <span className="zinc-pill">Figma Wireframing</span>
                <span className="zinc-pill">BRD / PRD</span>
                <span className="zinc-pill">Practical SQL</span>
                <span className="zinc-pill">AI-Native MVPs</span>
              </div>
            </div>

            {/* Right Column: User Profile Photo */}
            <div className="main-photo-col">
              <div className="profile-photo-frame">
                <img
                  src="/profile.jpg"
                  alt="Vasudev Yadav"
                  className="profile-img"
                />
                <div className="profile-badge-overlay">
                  <ShieldCheck size={13} className="text-white" />
                  <span>Vasudev Yadav</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Component 2: Ground Operations Scale */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-stat"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner">
            <div className="stat-top">
              <Building2 size={18} className="text-white" />
              <span className="stat-tag">GROUND OPERATIONS</span>
            </div>
            <div className="stat-number">76 Staff</div>
            <div className="stat-label">36 Branches Managed</div>
            <p className="stat-desc">
              Direct leadership over loan disbursements, delinquency (OD buckets), and YES Bank BC compliance.
            </p>
          </div>
        </motion.div>

        {/* Component 3: Product Velocity */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-stat"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner">
            <div className="stat-top">
              <Zap size={18} className="text-white" />
              <span className="stat-tag">PRODUCT VELOCITY</span>
            </div>
            <div className="stat-number">&gt;40%</div>
            <div className="stat-label">Turnaround Reduction</div>
            <p className="stat-desc">
              Cut insurance claim and KYC processing times via automated pre-filled forms and single-file uploads.
            </p>
          </div>
        </motion.div>

        {/* Component 4: Flagship Platform (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-feature"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner">
            <div className="project-header">
              <div className="feature-tag-wrap">
                <Layers size={15} className="mr-1 inline-block" />
                <span className="feature-tag">FLAGSHIP PLATFORM</span>
              </div>
              <span className="tech-tag-row">.NET Core • Angular • React Native</span>
            </div>

            <h3 className="feature-title">Fieldmate+</h3>
            <p className="feature-desc">
              White-label collection & field ops SaaS for NBFCs and MFIs. Features Android LO app with geo-tagged selfie attendance, real-time UPI QR collections, and floating cash-lock safeguards.
            </p>

            <div className="feature-meta">
              <span>Guided 4 Developers + 1 QA</span>
              <a href="#projects" className="feature-link">
                View Architectural Specs <ArrowRight size={14} className="inline-block ml-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Component 5: AI Microservice */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-ai"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner">
            <div className="ai-header">
              <div className="ai-tag-wrap">
                <Cpu size={15} className="mr-1 inline-block" />
                <span className="feature-tag">AI-NATIVE PROTOTYPE</span>
              </div>
              <span className="go-badge">Go 1.22</span>
            </div>

            <h3 className="ai-title">GST Vision AI Solver</h3>
            <p className="ai-desc">
              Solves tax portal CAPTCHAs via Gemma Multimodal Vision AI with cookiejar session persistence.
            </p>

            <div className="ai-footer">
              <span className="docker-badge">Docker Sub-25MB</span>
            </div>
          </div>
        </motion.div>

        {/* Component 6: Contact & Interaction Hub */}
        <motion.div
          variants={itemVariants}
          className="bento-card bento-card-cta"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="card-inner cta-inner">
            <div className="cta-text">
              <span className="cta-pre">READY TO COLLABORATE?</span>
              <h3 className="cta-title">Let&apos;s Build Impact</h3>
            </div>
            <div className="cta-action-row">
              <button onClick={onContactClick} className="btn-dark-primary">
                Get In Touch <ArrowRight size={15} className="inline-block ml-1" />
              </button>
              <a
                href={data.personalDetails.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-secondary"
              >
                LinkedIn <ArrowUpRight size={15} className="inline-block ml-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
