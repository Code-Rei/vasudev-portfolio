import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { RiCheckLine } from '@remixicon/react';

const EXP_PEERS = [
  {
    id: 'e-marcus',
    name: 'Marcus',
    role: 'Operations Lead',
    color: '#F59E0B',
    action: 'Tracking 36-Branch Timeline',
    startPos: { x: -80, y: -50 },
  },
  {
    id: 'e-dev',
    name: 'Dev',
    role: 'Tech Lead',
    color: '#3B82F6',
    action: 'Validating Track Record',
    startPos: { x: '105%', y: -60 },
  },
];

export default function ExperienceSection({ experience }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimatedRef.current) return;

    // Snappy timeline (~0.9s total)
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
        EXP_PEERS.forEach((peer) => {
          const el = cursorRefs.current[peer.id];
          if (el) el.style.opacity = '0';
        });
      },
    });

    // 1. Initial State
    EXP_PEERS.forEach((peer) => {
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
    gsap.set('.exp-inner-content', { opacity: 1 });
    gsap.set('.timeline-dot', { scale: 0, opacity: 0 });
    gsap.set('.timeline-line', { scaleY: 0, transformOrigin: 'top' });

    // Step 1: Cursors fly in fast
    EXP_PEERS.forEach((peer, i) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            x: () => {
              const card = cardRefs.current[`exp-${i}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.left - pr.left + 10;
            },
            y: () => {
              const card = cardRefs.current[`exp-${i}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.top - pr.top + 10;
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

    // Step 2: Marcus draws the timeline line & drops milestone dots
    tl.to(
      '.timeline-dot',
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.25, ease: 'back.out(2)' },
      0.3
    );
    tl.to(
      '.timeline-line',
      { scaleY: 1, duration: 0.4, ease: 'power2.out' },
      0.3
    );

    // Step 3: Cursors drag open the experience cards fast
    experience.forEach((_, i) => {
      const peer = EXP_PEERS[i % EXP_PEERS.length];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[`exp-${i}`];

      if (cardEl) {
        const drawLabel = `draw-exp-${i}`;
        tl.addLabel(drawLabel, 0.38 + i * 0.09);

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

    // Step 4: Cursors fly off cleanly
    EXP_PEERS.forEach((peer) => {
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
  }, [experience]);

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
    <div ref={containerRef} className="timeline-wrapper stitch-section-wrapper">
      {/* Simulated Fake SVG Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {EXP_PEERS.map((peer) => (
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

      <div className="timeline-container">
        <div className="timeline-line" />

        {experience.map((job, index) => (
          <div key={job.role} className="timeline-item">
            {/* Milestone Beacon */}
            <div className="timeline-dot" />

            {/* Experience Card */}
            <div
              ref={(el) => (cardRefs.current[`exp-${index}`] = el)}
              className="timeline-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="exp-inner-content">
                <div className="card-top-row">
                  <div className="badge-row">
                    <span className="badge-type">{job.badge}</span>
                    <span className="badge-duration">{job.duration}</span>
                  </div>
                  <span className="sys-badge-mono">TRACK // #EXP-0{index + 1}</span>
                </div>

                {/* Role Title - Instant, crisp, bold */}
                <h3 className="role-name">{job.role}</h3>

                <div className="company-name">
                  <strong>{job.company}</strong> — {job.location}
                </div>

                {/* Highlights */}
                {job.highlights && (
                  <div className="resp-section">
                    <div className="resp-header">CORE HIGHLIGHTS & OPERATIONAL ACHIEVEMENTS</div>
                    <ul className="resp-list">
                      {job.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
