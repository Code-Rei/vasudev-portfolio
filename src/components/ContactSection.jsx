import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import {
  RiMailLine,
  RiPhoneLine,
  RiLinkedinFill,
  RiGithubFill,
  RiArrowRightUpLine,
  RiCheckLine,
} from '@remixicon/react';

const CONTACT_PEERS = [
  {
    id: 'c-elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981',
    action: 'Wiring Direct Channels',
    startPos: { x: -80, y: -40 },
  },
  {
    id: 'c-dev',
    name: 'Dev',
    role: 'Tech Lead',
    color: '#3B82F6',
    action: 'Verifying Telemetry Endpoints',
    startPos: { x: '105%', y: -40 },
  },
];

export default function ContactSection({ details }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimatedRef.current) return;

    // Fast, punchy timeline (~0.8s total)
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAssembled(true);
        Object.values(cardRefs.current).forEach((card) => {
          if (card) {
            card.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
            card.style.opacity = '1';
          }
        });
        CONTACT_PEERS.forEach((peer) => {
          const el = cursorRefs.current[peer.id];
          if (el) el.style.opacity = '0';
        });
      },
    });

    // 1. Initial State
    CONTACT_PEERS.forEach((peer) => {
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

    Object.values(cardRefs.current).forEach((card) => {
      if (card) {
        gsap.set(card, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
          opacity: 0.1,
        });
      }
    });

    // Content pre-rendered for instant unmasking without delayed typing
    gsap.set('.contact-inner-content', { opacity: 1 });

    // Step 1: Cursors fly in fast
    CONTACT_PEERS.forEach((peer, i) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            x: () => {
              const card = cardRefs.current[`contact-${i}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.left - pr.left + 15;
            },
            y: () => {
              const card = cardRefs.current[`contact-${i}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.top - pr.top + 15;
            },
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.05 * i
        );
      }
    });

    // Step 2: Cursors drag open the 4 contact cards
    const contactKeys = ['contact-0', 'contact-1', 'contact-2', 'contact-3'];
    contactKeys.forEach((key, i) => {
      const peer = CONTACT_PEERS[i % CONTACT_PEERS.length];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[key];

      if (cardEl) {
        const drawLabel = `draw-${key}`;
        tl.addLabel(drawLabel, 0.36 + i * 0.08);

        if (cursorEl) {
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
              duration: 0.42,
              ease: 'power2.inOut',
            },
            drawLabel
          );
        }

        tl.to(
          cardEl,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.42,
            ease: 'power2.inOut',
          },
          drawLabel
        );
      }
    });

    // Step 3: Cursors fly off cleanly
    CONTACT_PEERS.forEach((peer) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            y: '-=80',
            x: '+=60',
            opacity: 0,
            scale: 0.7,
            duration: 0.4,
            ease: 'power3.in',
          },
          '-=0.1'
        );
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            tl.play();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

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
    <div ref={containerRef} className="contact-wrapper stitch-section-wrapper">
      {/* Simulated Fake SVG Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {CONTACT_PEERS.map((peer) => (
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

      <p className="contact-pitch">
        Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
      </p>

      {/* Contact Cards Grid (4 Direct Channels) */}
      <div className="contact-cards-grid">
        {/* Email Card */}
        <a
          ref={(el) => (cardRefs.current['contact-0'] = el)}
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
          ref={(el) => (cardRefs.current['contact-1'] = el)}
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
          ref={(el) => (cardRefs.current['contact-2'] = el)}
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
          ref={(el) => (cardRefs.current['contact-3'] = el)}
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
