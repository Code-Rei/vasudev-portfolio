import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import {
  RiMailLine,
  RiPhoneLine,
  RiLinkedinFill,
  RiGithubFill,
  RiArrowRightUpLine,
  RiCheckLine
} from '@remixicon/react';
import TypewriterText from './TypewriterText.jsx';

const CONTACT_PEERS = [
  {
    id: 'c-elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981',
    action: 'Linking Direct Mail',
    startPos: { x: -60, y: -40 },
  },
  {
    id: 'c-sarah',
    name: 'Sarah',
    role: 'QA Lead',
    color: '#EC4899',
    action: 'Verifying Phone Line',
    startPos: { x: '50%', y: -60 },
  },
  {
    id: 'c-dev',
    name: 'Dev',
    role: 'FinTech Lead',
    color: '#3B82F6',
    action: 'Connecting LinkedIn',
    startPos: { x: '105%', y: -40 },
  },
  {
    id: 'c-alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6',
    action: 'Linking GitHub Repos',
    startPos: { x: '105%', y: '105%' },
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

    // Fast, snappy timeline (~0.9s)
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAssembled(true);
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

    gsap.set('.contact-inner-content', { opacity: 0, y: 10 });

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
            duration: 0.45,
            ease: 'power3.out',
          },
          0.05 * i
        );
      }
    });

    // Step 2: Cursors drag open the 4 contact cards fast
    ['0', '1', '2', '3'].forEach((key, i) => {
      const peer = CONTACT_PEERS[i];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[`contact-${key}`];

      if (cursorEl && cardEl) {
        const drawLabel = `draw-contact-${i}`;
        tl.addLabel(drawLabel, 0.45 + i * 0.08);

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
            duration: 0.5,
            ease: 'power2.inOut',
          },
          drawLabel
        );

        tl.to(
          cardEl,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          drawLabel
        );
      }
    });

    // Step 3: Card contents fade in
    tl.to(
      '.contact-inner-content',
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.3,
        ease: 'back.out(1.4)',
      },
      '+=0.05'
    );

    // Step 4: Cursors fly off
    CONTACT_PEERS.forEach((peer) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            y: '-=100',
            x: '+=70',
            opacity: 0,
            scale: 0.7,
            duration: 0.45,
            ease: 'power3.in',
          },
          '-=0.15'
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
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

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
                    <RiCheckLine size={11} className="inline-icon mr-1" /> Connected
                  </>
                ) : (
                  peer.action
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-intro">
        <p className="contact-subtext">
          Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
        </p>
      </div>

      {/* Contact Grid with Official Remix Icons */}
      <div className="contact-grid">
        {/* Email Card */}
        <a
          ref={(el) => (cardRefs.current['contact-0'] = el)}
          href={`mailto:${details.email}`}
          className="contact-card"
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiMailLine size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">Direct Email</span>
              <span className="c-value">
                {isAssembled ? (
                  <TypewriterText text={details.email} speed={15} delay={100} isTriggered={isAssembled} />
                ) : (
                  details.email
                )}
              </span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>

        {/* Phone Card */}
        <a
          ref={(el) => (cardRefs.current['contact-1'] = el)}
          href={`tel:${details.phone}`}
          className="contact-card"
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiPhoneLine size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">Phone / WhatsApp</span>
              <span className="c-value">
                {isAssembled ? (
                  <TypewriterText text={details.phone} speed={18} delay={150} isTriggered={isAssembled} />
                ) : (
                  details.phone
                )}
              </span>
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
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiLinkedinFill size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">LinkedIn</span>
              <span className="c-value">
                {isAssembled ? (
                  <TypewriterText text={details.linkedin} speed={15} delay={200} isTriggered={isAssembled} />
                ) : (
                  details.linkedin
                )}
              </span>
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
        >
          <div className="contact-inner-content flex-row-item">
            <div className="contact-icon-box">
              <RiGithubFill size={20} className="c-icon" />
            </div>
            <div className="contact-info">
              <span className="c-label">GitHub</span>
              <span className="c-value">
                {isAssembled ? (
                  <TypewriterText text={details.github} speed={18} delay={250} isTriggered={isAssembled} />
                ) : (
                  details.github
                )}
              </span>
            </div>
            <RiArrowRightUpLine size={18} className="c-arrow" />
          </div>
        </a>
      </div>

      {/* Minimalist Footer Signature */}
      <div className="minimal-footer">
        <span className="footer-meta">
          © 2026 Vasudev Yadav • Built with React, GSAP Multiplayer Engine & Minimalist Black & Grey Aesthetics
        </span>
      </div>
    </div>
  );
}
