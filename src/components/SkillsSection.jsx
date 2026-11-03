import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { RiCheckLine } from '@remixicon/react';

const SKILL_PEERS = [
  {
    id: 's-elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981',
    action: 'Mapping Competency Matrix',
    startPos: { x: -80, y: -40 },
  },
  {
    id: 's-alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6',
    action: 'Auditing Toolchains',
    startPos: { x: '105%', y: -50 },
  },
];

export default function SkillsSection({ categories }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimatedRef.current) return;

    // Fast, snappy timeline (~0.9s total)
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
        SKILL_PEERS.forEach((peer) => {
          const el = cursorRefs.current[peer.id];
          if (el) el.style.opacity = '0';
        });
      },
    });

    // 1. Initial State
    SKILL_PEERS.forEach((peer) => {
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
    gsap.set('.skill-inner-content', { opacity: 1 });

    // Step 1: Cursors fly in fast
    SKILL_PEERS.forEach((peer, i) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            x: () => {
              const card = cardRefs.current[`skill-${i}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.left - pr.left + 15;
            },
            y: () => {
              const card = cardRefs.current[`skill-${i}`] || container;
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

    // Step 2: Cursors drag open the 4 skill cards
    categories.forEach((_, i) => {
      const peer = SKILL_PEERS[i % SKILL_PEERS.length];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[`skill-${i}`];

      if (cardEl) {
        const drawLabel = `draw-skill-${i}`;
        tl.addLabel(drawLabel, 0.38 + i * 0.08);

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
    SKILL_PEERS.forEach((peer) => {
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
  }, [categories]);

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
    <div ref={containerRef} className="skills-matrix-wrapper stitch-section-wrapper">
      {/* Simulated Fake SVG Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {SKILL_PEERS.map((peer) => (
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

      <div className="skills-matrix-grid">
        {categories.map((cat, index) => (
          <div
            key={cat.category}
            ref={(el) => (cardRefs.current[`skill-${index}`] = el)}
            className="skill-category-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="skill-inner-content">
              <div className="cat-header">
                <div className="cat-title-wrap">
                  <span className="cat-accent-dot" />
                  <h3 className="cat-title">{cat.category}</h3>
                </div>
                <span className="cat-count">{cat.skills.length} Skills</span>
              </div>

              <div className="skills-tag-wrap">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
