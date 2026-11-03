import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  RiMapPin2Line,
  RiBuilding4Line,
  RiBarChartBoxLine,
  RiStackLine,
  RiCpuLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiShieldCheckLine,
  RiCheckLine
} from '@remixicon/react';

// Simulated Multiplayer Cursors for Hero Bento Assembly
const HERO_PEERS = [
  {
    id: 'h-elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981', // Emerald
    action: 'Framing Identity & UX',
    startPos: { x: -120, y: -80 },
  },
  {
    id: 'h-dev',
    name: 'Dev',
    role: 'FinTech Lead',
    color: '#3B82F6', // Blue
    action: 'Assembling Fieldmate+',
    startPos: { x: '110%', y: -80 },
  },
  {
    id: 'h-marcus',
    name: 'Marcus',
    role: 'Operations & SQL',
    color: '#F59E0B', // Amber
    action: 'Syncing 36 Branches & OD',
    startPos: { x: -100, y: '110%' },
  },
  {
    id: 'h-alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6', // Purple
    action: 'Deploying Gemma Vision AI',
    startPos: { x: '110%', y: '110%' },
  },
];

export default function HeroBentoSection({ data, onContactClick }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const sectionRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container || hasAnimatedRef.current) return;

    // Timeline setup
    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        setIsAssembled(true);
      },
    });

    // 1. Initial State: Cursors off-screen, cards unmasked via clip-path
    HERO_PEERS.forEach((peer) => {
      const el = cursorRefs.current[peer.id];
      if (el) {
        gsap.set(el, {
          x: peer.startPos.x,
          y: peer.startPos.y,
          opacity: 0,
          scale: 0.85,
        });
      }
    });

    // Cards start with collapsed clip-path
    Object.values(cardRefs.current).forEach((card) => {
      if (card) {
        gsap.set(card, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
          opacity: 0.1,
        });
      }
    });

    // Internal content inside cards hidden
    gsap.set('.bento-inner-content', { opacity: 0, y: 14 });

    // Step 1: Cursors fly in from off-screen to card start coordinates
    HERO_PEERS.forEach((peer, i) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            x: () => {
              const targetCard = cardRefs.current[`card-${i + 1}`] || cardRefs.current['card-1'];
              if (!targetCard) return 40;
              const r = targetCard.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.left - pr.left + 15;
            },
            y: () => {
              const targetCard = cardRefs.current[`card-${i + 1}`] || cardRefs.current['card-1'];
              if (!targetCard) return 40;
              const r = targetCard.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.top - pr.top + 15;
            },
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          0.08 * i
        );
      }
    });

    // Step 2: Cursors drag across the Bento cards to draw their borders
    const drawPairs = [
      { peerId: 'h-elena', cardKey: 'card-1', label: 'draw-hero-1' },
      { peerId: 'h-marcus', cardKey: 'card-2', label: 'draw-hero-2' },
      { peerId: 'h-marcus', cardKey: 'card-3', label: 'draw-hero-3' },
      { peerId: 'h-dev', cardKey: 'card-4', label: 'draw-hero-4' },
      { peerId: 'h-alex', cardKey: 'card-5', label: 'draw-hero-5' },
      { peerId: 'h-alex', cardKey: 'card-6', label: 'draw-hero-6' },
    ];

    drawPairs.forEach((pair, idx) => {
      const cursorEl = cursorRefs.current[pair.peerId];
      const cardEl = cardRefs.current[pair.cardKey];

      if (cursorEl && cardEl) {
        tl.addLabel(pair.label, 0.75 + idx * 0.14);

        // Move cursor across card
        tl.to(
          cursorEl,
          {
            x: () => {
              const r = cardEl.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.right - pr.left - 15;
            },
            y: () => {
              const r = cardEl.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.bottom - pr.top - 15;
            },
            duration: 0.85,
            ease: 'power2.inOut',
          },
          pair.label
        );

        // Synchronized clipPath reveal of the card
        tl.to(
          cardEl,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          pair.label
        );
      }
    });

    // Step 3: Card internal details spring in
    tl.to(
      '.bento-inner-content',
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: 'back.out(1.4)',
      },
      '+=0.1'
    );

    // Step 4: Cursors fly off-screen
    HERO_PEERS.forEach((peer) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            y: '-=120',
            x: '+=90',
            opacity: 0,
            scale: 0.7,
            duration: 0.6,
            ease: 'power3.in',
          },
          '-=0.2'
        );
      }
    });

    hasAnimatedRef.current = true;

    return () => {
      tl.kill();
    };
  }, []);

  // Card-specific isolated flashlight spotlight (active after assembly)
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
    <section id="about" ref={sectionRef} className="bento-hero-section container">
      {/* Stitch Status Beacon */}
      <div className={`wake-up-hint ${isAssembled ? 'is-active' : ''}`}>
        <span className="pulse-beacon" />
        <span className="hint-text">
          {isAssembled
            ? 'SYSTEM ARCHITECTURE ASSEMBLED • LIVE WORKSPACE'
            : 'SIMULATING DISTRIBUTED PEERS ASSEMBLING WORKSPACE...'}
        </span>
      </div>

      {/* Simulated Fake SVG Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {HERO_PEERS.map((peer) => (
          <div
            key={peer.id}
            ref={(el) => (cursorRefs.current[peer.id] = el)}
            className="fake-svg-cursor"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-svg-icon"
            >
              <path
                d="M3 3L10.5 21L14 14L21 10.5L3 3Z"
                fill={peer.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="cursor-name-badge" style={{ backgroundColor: peer.color }}>
              <span className="cursor-user-name">{peer.name}</span>
              <span className="cursor-user-action">
                {isAssembled ? (
                  <>
                    <RiCheckLine size={11} className="inline-icon mr-1" /> Ready
                  </>
                ) : (
                  peer.action
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid (Cards drawn by fake cursors, then fully interactive) */}
      <div className="bento-grid">
        {/* Component 1: Main Identity & Profile Portrait (Spans 2 columns, Row 1) */}
        <div
          ref={(el) => (cardRefs.current['card-1'] = el)}
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

              <h1 className="main-title">{data.personalDetails.name}</h1>
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

            {/* Right Column: User Profile Photo */}
            <div className="main-photo-col">
              <div className="profile-photo-frame">
                <img
                  src="/profile.jpg"
                  alt="Vasudev Yadav"
                  className="profile-img"
                />
                <div className="profile-badge-overlay">
                  <RiShieldCheckLine size={12} className="inline-icon text-white" />
                  <span>Vasudev Yadav</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component 2: Ground Operations Scale (1 col, Row 1) */}
        <div
          ref={(el) => (cardRefs.current['card-2'] = el)}
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

        {/* Component 3: Analytics Project Card (1 col, Row 2) */}
        <div
          ref={(el) => (cardRefs.current['card-3'] = el)}
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

        {/* Component 4: Flagship Platform (Spans 2 columns, Row 2) */}
        <div
          ref={(el) => (cardRefs.current['card-4'] = el)}
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
              <span>Guided 4 Developers + 1 QA</span>
              <a href="#projects" className="feature-link">
                View Architectural Specs <RiArrowRightLine size={14} className="inline-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Component 5: AI Microservice (1 col, Row 3) */}
        <div
          ref={(el) => (cardRefs.current['card-5'] = el)}
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

            <div className="ai-footer">
              <span className="docker-badge">Docker Sub-25MB</span>
            </div>
          </div>
        </div>

        {/* Component 6: Contact & Interaction Hub (Spans 2 columns, Row 3) */}
        <div
          ref={(el) => (cardRefs.current['card-6'] = el)}
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
