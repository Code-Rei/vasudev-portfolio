import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { RiCheckLine } from '@remixicon/react';
import TypewriterText from './TypewriterText.jsx';

const SKILL_PEERS = [
  {
    id: 's-elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981',
    action: 'Mapping UX Pillars',
    startPos: { x: -70, y: -60 },
  },
  {
    id: 's-dev',
    name: 'Dev',
    role: 'FinTech Lead',
    color: '#3B82F6',
    action: 'Syncing Lending Engine',
    startPos: { x: '105%', y: -70 },
  },
  {
    id: 's-marcus',
    name: 'Marcus',
    role: 'SQL Data',
    color: '#F59E0B',
    action: 'Linking Stored Procs',
    startPos: { x: -70, y: '105%' },
  },
  {
    id: 's-alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6',
    action: 'Deploying AI Toolchain',
    startPos: { x: '105%', y: '105%' },
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

    // Fast, snappy timeline (~1.0s)
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAssembled(true);
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

    gsap.set('.skill-inner-content', { opacity: 0, y: 10 });
    gsap.set('.skill-pill', { scale: 0.7, opacity: 0 });

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
            duration: 0.45,
            ease: 'power3.out',
          },
          0.05 * i
        );
      }
    });

    // Step 2: Cursors drag open the 4 category cards fast
    categories.forEach((_, i) => {
      const peer = SKILL_PEERS[i % SKILL_PEERS.length];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[`skill-${i}`];

      if (cardEl) {
        const drawLabel = `draw-skill-${i}`;
        tl.addLabel(drawLabel, 0.45 + i * 0.08);

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
              duration: 0.5,
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
            duration: 0.5,
            ease: 'power2.inOut',
          },
          drawLabel
        );
      }
    });

    // Step 3: Card headers fade in
    tl.to(
      '.skill-inner-content',
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.25,
        ease: 'power2.out',
      },
      '+=0.05'
    );

    // Step 4: Skill pills pop into place fast
    tl.to(
      '.skill-pill',
      {
        scale: 1,
        opacity: 1,
        stagger: 0.015,
        duration: 0.25,
        ease: 'back.out(1.8)',
      },
      '-=0.1'
    );

    // Step 5: Cursors fly off
    SKILL_PEERS.forEach((peer) => {
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
  }, [categories]);

  return (
    <div ref={containerRef} className="skills-categories-grid stitch-section-wrapper">
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
                    <RiCheckLine size={11} className="inline-icon mr-1" /> Mapped
                  </>
                ) : (
                  peer.action
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {categories.map((cat, index) => (
        <div
          key={cat.category}
          ref={(el) => (cardRefs.current[`skill-${index}`] = el)}
          className="skill-category-card"
        >
          <div className="skill-inner-content">
            <div className="cat-header">
              <span className="cat-accent-dot" />
              <h3 className="cat-title">
                {isAssembled ? (
                  <TypewriterText
                    text={cat.category}
                    speed={16}
                    delay={index * 80}
                    isTriggered={isAssembled}
                  />
                ) : (
                  cat.category
                )}
              </h3>
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
  );
}
