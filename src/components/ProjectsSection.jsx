import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RiCheckLine } from '@remixicon/react';
import TypewriterText from './TypewriterText.jsx';

const PROJECT_PEERS = [
  {
    id: 'p-dev',
    name: 'Dev',
    role: 'FinTech Lead',
    color: '#3B82F6',
    action: 'Mapping Architecture',
    startPos: { x: -80, y: -40 },
  },
  {
    id: 'p-elena',
    name: 'Elena',
    role: 'Lead PO',
    color: '#10B981',
    action: 'Validating Specs',
    startPos: { x: '105%', y: -60 },
  },
  {
    id: 'p-alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6',
    action: 'Deploying Container',
    startPos: { x: '50%', y: '105%' },
  },
  {
    id: 'p-marcus',
    name: 'Marcus',
    role: 'Data Architect',
    color: '#F59E0B',
    action: 'Syncing Schemas',
    startPos: { x: -60, y: '105%' },
  },
];

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAssembled, setIsAssembled] = useState(false);
  const containerRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const hasAnimatedRef = useRef(false);

  const categories = ['All', 'Enterprise FinTech', 'AI Microservice', 'Spatial Logistics'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimatedRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAssembled(true);
      },
    });

    // 1. Initial State: Cursors off-screen
    PROJECT_PEERS.forEach((peer) => {
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

    // ALL cards start collapsed
    Object.values(cardRefs.current).forEach((card) => {
      if (card) {
        gsap.set(card, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)',
          opacity: 0.1,
        });
      }
    });

    gsap.set('.proj-inner-content', { opacity: 0, y: 10 });

    // Step 1: Cursors fly in fast (0.35s)
    PROJECT_PEERS.forEach((peer, i) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            x: () => {
              const card = cardRefs.current[`proj-${i % filteredProjects.length}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.left - pr.left + 15;
            },
            y: () => {
              const card = cardRefs.current[`proj-${i % filteredProjects.length}`] || container;
              const r = card.getBoundingClientRect();
              const pr = container.getBoundingClientRect();
              return r.top - pr.top + 15;
            },
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power3.out',
          },
          0.06 * i
        );
      }
    });

    // Step 2: Cursors sweep across ALL cards to draw every single one
    filteredProjects.forEach((_, i) => {
      const peer = PROJECT_PEERS[i % PROJECT_PEERS.length];
      const cursorEl = cursorRefs.current[peer.id];
      const cardEl = cardRefs.current[`proj-${i}`];

      if (cardEl) {
        const drawLabel = `draw-proj-${i}`;
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

        // EVERY card is unmasked
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

    // Step 3: Card contents spring in snappily
    tl.to(
      '.proj-inner-content',
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.35,
        ease: 'back.out(1.4)',
      },
      '+=0.05'
    );

    // Step 4: Cursors fly off
    PROJECT_PEERS.forEach((peer) => {
      const cursorEl = cursorRefs.current[peer.id];
      if (cursorEl) {
        tl.to(
          cursorEl,
          {
            y: '-=100',
            x: '+=80',
            opacity: 0,
            scale: 0.7,
            duration: 0.45,
            ease: 'power3.in',
          },
          '-=0.15'
        );
      }
    });

    // Trigger on scroll via IntersectionObserver
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
  }, [filteredProjects.length]);

  // When changing categories, make sure all newly shown cards are unmasked
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
      Object.values(cardRefs.current).forEach((card) => {
        if (card) {
          card.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          card.style.opacity = '1';
        }
      });
      document.querySelectorAll('.proj-inner-content').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 50);
  };

  return (
    <div ref={containerRef} className="projects-wrapper stitch-section-wrapper">
      {/* Simulated Fake SVG Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {PROJECT_PEERS.map((peer) => (
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
                    <RiCheckLine size={11} className="inline-icon mr-1" /> Deployed
                  </>
                ) : (
                  peer.action
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Filter Segmented Tabs */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid (Rendering ALL projects) */}
      <div className="project-grid">
        {filteredProjects.map((proj, idx) => (
          <div
            key={proj.id}
            ref={(el) => (cardRefs.current[`proj-${idx}`] = el)}
            className="project-card"
          >
            <div className="proj-inner-content">
              {/* Card Header */}
              <div className="card-meta-row">
                <span className="cat-pill">{proj.type}</span>
                {proj.badge && <span className="badge-pill">{proj.badge}</span>}
              </div>

              {/* Title with Snappy Typewriter Effect */}
              <h3 className="proj-title">
                {isAssembled ? (
                  <TypewriterText
                    text={proj.name}
                    speed={15}
                    delay={idx * 60}
                    isTriggered={isAssembled}
                  />
                ) : (
                  proj.name
                )}
              </h3>

              {/* Summary with Fast Typewriter Streaming */}
              <p className="proj-summary">
                {isAssembled ? (
                  <TypewriterText
                    text={proj.summary}
                    speed={7}
                    delay={180 + idx * 60}
                    isTriggered={isAssembled}
                  />
                ) : (
                  proj.summary
                )}
              </p>

              {/* Role Pill */}
              <div className="role-tag-box">
                <span className="role-prefix">ROLE:</span>
                <span className="role-title">{proj.role}</span>
              </div>

              {/* Tech Stack Tags */}
              <div className="stack-wrap">
                {proj.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="highlights-box">
                <div className="highlights-title">KEY IMPACT & ARCHITECTURE</div>
                <ul className="highlights-list">
                  {proj.highlights.map((hl, hIdx) => (
                    <li key={hIdx}>{hl}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
