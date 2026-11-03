import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  RiMapPin2Line,
  RiBuilding4Line,
  RiBarChartBoxLine,
  RiStackLine,
  RiCpuLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCheckLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
  RiRestartLine,
} from '@remixicon/react';
import { swarmSound } from '../utils/swarmSound.js';

// Authentic Figma Cursor Path (from DhvanilPatel/swarm-cursors & Joel Califa)
const FIGMA_ARROW_D =
  'M4.6 3.9 C4.2 3.1 4.9 2.4 5.7 2.8 L20.6 9.4 C21.5 9.8 21.4 11.1 20.4 11.3 L13.9 12.9 C13.4 13 13 13.4 12.9 13.9 L11.3 20.4 C11.1 21.4 9.8 21.5 9.4 20.6 Z';

// Multiplayer Peer Cursor Profiles
const SWARM_PEERS = [
  {
    id: 'elena',
    name: 'Elena',
    role: 'Lead UX',
    color: '#10B981', // Emerald
    idleAction: 'Inspecting Layout',
    startPos: { x: -60, y: -40 },
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Operations & SQL',
    color: '#F59E0B', // Amber
    idleAction: 'Auditing 36 Branches',
    startPos: { x: '105%', y: -40 },
  },
  {
    id: 'dev',
    name: 'Dev',
    role: 'FinTech Lead',
    color: '#3B82F6', // Blue
    idleAction: 'Syncing Architecture',
    startPos: { x: -60, y: '105%' },
  },
  {
    id: 'alex',
    name: 'Alex',
    role: 'AI Systems',
    color: '#8B5CF6', // Purple
    idleAction: 'Validating Vision AI',
    startPos: { x: '105%', y: '105%' },
  },
  {
    id: 'linus',
    name: 'Linus',
    role: 'Core Architect',
    color: '#EC4899', // Pink
    idleAction: 'Reviewing Specs',
    startPos: { x: '50%', y: -70 },
  },
  {
    id: 'ada',
    name: 'Ada',
    role: 'Systems Logic',
    color: '#06B6D4', // Cyan
    idleAction: 'Monitoring Metrics',
    startPos: { x: '50%', y: '105%' },
  },
];

// Cursor SVG with Figma Tool Modes: arrow | cross | dup | pen
function SwarmCursorIcon({ shape = 'arrow', color }) {
  const strokeStyle = { stroke: '#FFFFFF', strokeWidth: 1.5, strokeLinejoin: 'round' };

  switch (shape) {
    case 'dup':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="swarm-svg-icon">
          <path
            d={FIGMA_ARROW_D}
            transform="translate(4 3.5)"
            fill="#FFFFFF"
            stroke={color}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d={FIGMA_ARROW_D} fill={color} {...strokeStyle} />
        </svg>
      );
    case 'cross':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="swarm-svg-icon">
          <g strokeLinecap="round">
            <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#FFFFFF" strokeWidth="3.6" />
            <path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke={color} strokeWidth="1.5" />
          </g>
        </svg>
      );
    case 'pen':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="swarm-svg-icon">
          <path d="M17.4 10.6 L20.6 13.8 L13.8 20.6 L10.6 17.4 Z" fill={color} {...strokeStyle} />
          <path d="M3 3 L13.1 6.3 L17.4 10.6 L10.6 17.4 L6.3 13.1 Z" fill={color} {...strokeStyle} />
          <path d="M3.6 3.6 L8.9 8.9" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="10.2" cy="10.2" r="1.75" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
        </svg>
      );
    case 'arrow':
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="swarm-svg-icon">
          <path d={FIGMA_ARROW_D} fill={color} {...strokeStyle} />
        </svg>
      );
  }
}

export default function HeroBentoSection({ data, onContactClick }) {
  const [isAssembled, setIsAssembled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [statusMessage, setStatusMessage] = useState('SYS // INITIALIZING SWARM ENGINE...');

  // Live blueprint overlay states
  const [activeBoxes, setActiveBoxes] = useState([]);
  const [spacingBadge, setSpacingBadge] = useState(null);
  const [cursorStates, setCursorStates] = useState(() =>
    SWARM_PEERS.reduce((acc, peer) => {
      acc[peer.id] = {
        shape: 'arrow',
        action: peer.idleAction,
        visible: false,
      };
      return acc;
    }, {})
  );

  const sectionRef = useRef(null);
  const cursorRefs = useRef({});
  const cardRefs = useRef({});
  const tlRef = useRef(null);
  const flockRafRef = useRef(null);
  const mousePosRef = useRef({ x: -999, y: -999, inSection: false });
  const hasAnimatedRef = useRef(false);

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = swarmSound.toggleSound();
    setIsSoundOn(next);
  };

  // Safe fallback to guarantee cards are visible under all circumstances
  const ensureCardsVisible = useCallback(() => {
    setIsAssembled(true);
    setStatusMessage('SYS // WORKSPACE ONLINE • 6 MODULES ASSEMBLED');
    setActiveBoxes([]);
    setSpacingBadge(null);
    Object.values(cardRefs.current).forEach((card) => {
      if (card) {
        card.style.clipPath = 'none';
        card.style.opacity = '1';
      }
    });
  }, []);

  // Main Swarm Cursors Build Orchestration
  const runSwarmAssembly = useCallback(() => {
    const container = sectionRef.current;
    if (!container) return;

    // Reset timeline if replaying
    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (flockRafRef.current) {
      cancelAnimationFrame(flockRafRef.current);
    }

    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
      ensureCardsVisible();
      return;
    }

    setIsAssembled(false);
    setStatusMessage('SYS // SWARM ORCHESTRATION IN PROGRESS • DRAFTING BLUEPRINTS...');
    setActiveBoxes([]);
    setSpacingBadge(null);

    // Initial state: collapse cards
    Object.values(cardRefs.current).forEach((card) => {
      if (card) {
        card.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
        card.style.opacity = '0.2';
      }
    });

    const cRect = container.getBoundingClientRect();
    const getCardBounds = (key) => {
      const el = cardRefs.current[key];
      if (!el) return { x: 40, y: 40, w: 200, h: 100 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - cRect.left,
        y: r.top - cRect.top,
        w: r.width,
        h: r.height,
      };
    };

    // Initialize cursor states
    setCursorStates({
      elena: { shape: 'arrow', action: 'Framing Identity & Wireframe', visible: true },
      marcus: { shape: 'arrow', action: 'Drafting Ground Operations', visible: true },
      dev: { shape: 'arrow', action: 'Assembling Fieldmate+ Architecture', visible: true },
      alex: { shape: 'arrow', action: 'Deploying Gemma Vision AI Container', visible: true },
      linus: { shape: 'arrow', action: 'Aligning Grid Structure', visible: true },
      ada: { shape: 'arrow', action: 'Synthesizing Audio & Signals', visible: true },
    });

    // Reset cursor positions offscreen
    SWARM_PEERS.forEach((peer) => {
      const el = cursorRefs.current[peer.id];
      if (el) {
        gsap.set(el, {
          x: peer.startPos.x,
          y: peer.startPos.y,
          opacity: 0,
          scale: 0.9,
        });
      }
    });

    const tl = gsap.timeline({
      delay: 0.08,
      onComplete: () => {
        ensureCardsVisible();
        startFlockingPhysics();
      },
    });
    tlRef.current = tl;

    // Phase 1: Swarm enters workspace rapidly (0.35s)
    SWARM_PEERS.forEach((peer, i) => {
      const el = cursorRefs.current[peer.id];
      if (el) {
        tl.to(
          el,
          {
            x: () => {
              const bounds = getCardBounds(`card-${(i % 6) + 1}`);
              return bounds.x + 20;
            },
            y: () => {
              const bounds = getCardBounds(`card-${(i % 6) + 1}`);
              return bounds.y + 20;
            },
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          },
          0.04 * i
        );
      }
    });

    // Phase 2: Authentic Figma Construction Sequences
    // -------------------------------------------------------------
    // Task 1: Elena draws Card 1 (Identity & Profile)
    // -------------------------------------------------------------
    const b1 = getCardBounds('card-1');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        elena: { shape: 'cross', action: 'Dragging Identity Frame', visible: true },
      }));
      swarmSound.playSnapClick(-0.4);
    }, '+=0.02');

    const card1Obj = { progress: 0 };
    tl.to(
      card1Obj,
      {
        progress: 1,
        duration: 0.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card1Obj.progress;
          const currentW = Math.max(20, b1.w * p);
          const currentH = Math.max(20, b1.h * p);
          const elenaEl = cursorRefs.current['elena'];
          if (elenaEl) {
            gsap.set(elenaEl, { x: b1.x + currentW, y: b1.y + currentH });
          }
          const card1El = cardRefs.current['card-1'];
          if (card1El) {
            card1El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card1El.style.opacity = '1';
          }
          setActiveBoxes([
            {
              id: 'box-1',
              x: b1.x,
              y: b1.y,
              w: currentW,
              h: currentH,
              color: '#0D99FF',
              badge: `${Math.round(currentW)} × ${Math.round(currentH)}`,
            },
          ]);
        },
        onComplete: () => {
          swarmSound.playGlassChime(0, -0.4);
          swarmSound.playSnapClick(-0.4);
          const card1El = cardRefs.current['card-1'];
          if (card1El) card1El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setActiveBoxes([]);
        },
      },
      'draw-1'
    );

    // -------------------------------------------------------------
    // Task 2: Marcus draws Card 2 (Ground Operations: 76 Staff)
    // -------------------------------------------------------------
    const b2 = getCardBounds('card-2');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        marcus: { shape: 'cross', action: 'Drafting 36 Branches Frame', visible: true },
      }));
      swarmSound.playSnapClick(0.4);
    }, '-=0.15');

    const card2Obj = { progress: 0 };
    tl.to(
      card2Obj,
      {
        progress: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card2Obj.progress;
          const currentW = Math.max(20, b2.w * p);
          const currentH = Math.max(20, b2.h * p);
          const marcusEl = cursorRefs.current['marcus'];
          if (marcusEl) {
            gsap.set(marcusEl, { x: b2.x + currentW, y: b2.y + currentH });
          }
          const card2El = cardRefs.current['card-2'];
          if (card2El) {
            card2El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card2El.style.opacity = '1';
          }
          setActiveBoxes([
            {
              id: 'box-2',
              x: b2.x,
              y: b2.y,
              w: currentW,
              h: currentH,
              color: '#0D99FF',
              badge: `${Math.round(currentW)} × ${Math.round(currentH)}`,
            },
          ]);
        },
        onComplete: () => {
          swarmSound.playGlassChime(1, 0.4);
          swarmSound.playSnapClick(0.4);
          const card2El = cardRefs.current['card-2'];
          if (card2El) card2El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setActiveBoxes([]);
        },
      },
      'draw-2'
    );

    // -------------------------------------------------------------
    // Task 3: Marcus duplicates Card 2 -> Card 3 (OD & MIS Delinquency)
    // Authentic ⌥-drag duplicate with Red Spacing Badge (14px)
    // -------------------------------------------------------------
    const b3 = getCardBounds('card-3');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        marcus: { shape: 'dup', action: '⌥-Duplicate OD & MIS Module', visible: true },
      }));
      setSpacingBadge({
        x1: b2.x + b2.w / 2,
        y1: b2.y + b2.h,
        x2: b3.x + b3.w / 2,
        y2: b3.y,
        badgeX: b2.x + b2.w / 2,
        badgeY: (b2.y + b2.h + b3.y) / 2,
        label: '14px',
      });
      swarmSound.playSnapClick(0.4);
    }, '+=0.02');

    const card3Obj = { progress: 0 };
    tl.to(
      card3Obj,
      {
        progress: 1,
        duration: 0.38,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card3Obj.progress;
          const currentW = Math.max(20, b3.w * p);
          const currentH = Math.max(20, b3.h * p);
          const marcusEl = cursorRefs.current['marcus'];
          if (marcusEl) {
            gsap.set(marcusEl, { x: b3.x + currentW, y: b3.y + currentH });
          }
          const card3El = cardRefs.current['card-3'];
          if (card3El) {
            card3El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card3El.style.opacity = '1';
          }
        },
        onComplete: () => {
          swarmSound.playGlassChime(2, -0.3);
          swarmSound.playSnapClick(-0.3);
          const card3El = cardRefs.current['card-3'];
          if (card3El) card3El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setSpacingBadge(null);
        },
      },
      'draw-3'
    );

    // -------------------------------------------------------------
    // Task 4: Dev draws Card 4 (Fieldmate+ Flagship Platform)
    // -------------------------------------------------------------
    const b4 = getCardBounds('card-4');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        dev: { shape: 'cross', action: 'Framing Fieldmate+ Architecture', visible: true },
      }));
      swarmSound.playSnapClick(0.2);
    }, '-=0.15');

    const card4Obj = { progress: 0 };
    tl.to(
      card4Obj,
      {
        progress: 1,
        duration: 0.42,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card4Obj.progress;
          const currentW = Math.max(20, b4.w * p);
          const currentH = Math.max(20, b4.h * p);
          const devEl = cursorRefs.current['dev'];
          if (devEl) {
            gsap.set(devEl, { x: b4.x + currentW, y: b4.y + currentH });
          }
          const card4El = cardRefs.current['card-4'];
          if (card4El) {
            card4El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card4El.style.opacity = '1';
          }
          setActiveBoxes([
            {
              id: 'box-4',
              x: b4.x,
              y: b4.y,
              w: currentW,
              h: currentH,
              color: '#0D99FF',
              badge: `${Math.round(currentW)} × ${Math.round(currentH)}`,
            },
          ]);
        },
        onComplete: () => {
          swarmSound.playGlassChime(3, 0.2);
          swarmSound.playSnapClick(0.2);
          const card4El = cardRefs.current['card-4'];
          if (card4El) card4El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setActiveBoxes([]);
        },
      },
      'draw-4'
    );

    // -------------------------------------------------------------
    // Task 5: Alex draws Card 5 (GST Vision AI Solver)
    // -------------------------------------------------------------
    const b5 = getCardBounds('card-5');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        alex: { shape: 'cross', action: 'Deploying Gemma Vision AI', visible: true },
      }));
      swarmSound.playSnapClick(-0.35);
    }, '-=0.12');

    const card5Obj = { progress: 0 };
    tl.to(
      card5Obj,
      {
        progress: 1,
        duration: 0.38,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card5Obj.progress;
          const currentW = Math.max(20, b5.w * p);
          const currentH = Math.max(20, b5.h * p);
          const alexEl = cursorRefs.current['alex'];
          if (alexEl) {
            gsap.set(alexEl, { x: b5.x + currentW, y: b5.y + currentH });
          }
          const card5El = cardRefs.current['card-5'];
          if (card5El) {
            card5El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card5El.style.opacity = '1';
          }
          setActiveBoxes([
            {
              id: 'box-5',
              x: b5.x,
              y: b5.y,
              w: currentW,
              h: currentH,
              color: '#0D99FF',
              badge: `${Math.round(currentW)} × ${Math.round(currentH)}`,
            },
          ]);
        },
        onComplete: () => {
          swarmSound.playGlassChime(4, -0.35);
          swarmSound.playSnapClick(-0.35);
          const card5El = cardRefs.current['card-5'];
          if (card5El) card5El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setActiveBoxes([]);
        },
      },
      'draw-5'
    );

    // -------------------------------------------------------------
    // Task 6: Linus & Ada draw Card 6 (Let's Build Impact CTA)
    // -------------------------------------------------------------
    const b6 = getCardBounds('card-6');
    tl.add(() => {
      setCursorStates((prev) => ({
        ...prev,
        linus: { shape: 'pen', action: 'Drawing CTA Path', visible: true },
        ada: { shape: 'cross', action: 'Finalizing Interaction Hub', visible: true },
      }));
      swarmSound.playSnapClick(0.3);
    }, '-=0.15');

    const card6Obj = { progress: 0 };
    tl.to(
      card6Obj,
      {
        progress: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = card6Obj.progress;
          const currentW = Math.max(20, b6.w * p);
          const currentH = Math.max(20, b6.h * p);
          const linusEl = cursorRefs.current['linus'];
          if (linusEl) {
            gsap.set(linusEl, { x: b6.x + currentW, y: b6.y + currentH });
          }
          const card6El = cardRefs.current['card-6'];
          if (card6El) {
            card6El.style.clipPath = `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% ${p * 100}%, 0% ${p * 100}%)`;
            card6El.style.opacity = '1';
          }
          setActiveBoxes([
            {
              id: 'box-6',
              x: b6.x,
              y: b6.y,
              w: currentW,
              h: currentH,
              color: '#0D99FF',
              badge: `${Math.round(currentW)} × ${Math.round(currentH)}`,
            },
          ]);
        },
        onComplete: () => {
          swarmSound.playGlassChime(5, 0.3);
          swarmSound.playSnapClick(0.3);
          const card6El = cardRefs.current['card-6'];
          if (card6El) card6El.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          setActiveBoxes([]);
        },
      },
      'draw-6'
    );

    // Final Chord & Transition to Flocking
    tl.add(() => {
      swarmSound.playGlassChime(7, 0);
      setCursorStates((prev) => {
        const next = { ...prev };
        SWARM_PEERS.forEach((peer) => {
          next[peer.id] = {
            shape: 'arrow',
            action: peer.idleAction,
            visible: true,
          };
        });
        return next;
      });
    });

    // Safety fallback timeout to ensure no cards ever stay hidden
    const fallbackTimer = setTimeout(() => {
      ensureCardsVisible();
    }, 2400);

    return () => clearTimeout(fallbackTimer);
  }, [ensureCardsVisible]);

  // Post-Assembly Flocking Physics Engine (Swarm follows mouse seamlessly)
  const startFlockingPhysics = useCallback(() => {
    const peersToFlock = ['elena', 'marcus', 'dev'];
    const currentPositions = {
      elena: { x: 120, y: 150 },
      marcus: { x: 500, y: 180 },
      dev: { x: 300, y: 350 },
    };

    // Fade out background cursors smoothly
    ['alex', 'linus', 'ada'].forEach((id) => {
      const el = cursorRefs.current[id];
      if (el) {
        gsap.to(el, { opacity: 0, duration: 0.5 });
      }
    });

    let angle = 0;
    const updatePhysics = () => {
      angle += 0.02;
      const container = sectionRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      const mouse = mousePosRef.current;

      peersToFlock.forEach((id, index) => {
        const el = cursorRefs.current[id];
        if (!el) return;

        let targetX;
        let targetY;

        if (mouse.inSection) {
          // Flock gently around user's mouse with dynamic orbital offsets
          const orbitRadius = 45 + index * 25;
          const offsetAngle = angle + (index * (Math.PI * 2)) / 3;
          targetX = mouse.x + Math.cos(offsetAngle) * orbitRadius;
          targetY = mouse.y + Math.sin(offsetAngle) * orbitRadius;
        } else {
          // Ambient gentle breathing drift across the cards
          const baseCard = cardRefs.current[`card-${index + 1}`];
          if (baseCard) {
            const b = baseCard.getBoundingClientRect();
            targetX = b.left - cRect.left + b.width / 2 + Math.cos(angle + index) * 35;
            targetY = b.top - cRect.top + b.height / 2 + Math.sin(angle + index) * 25;
          } else {
            targetX = 200 + index * 150;
            targetY = 150 + index * 40;
          }
        }

        // Lerp position with spring damping
        const pos = currentPositions[id];
        pos.x += (targetX - pos.x) * (0.06 - index * 0.01);
        pos.y += (targetY - pos.y) * (0.06 - index * 0.01);

        gsap.set(el, {
          x: pos.x,
          y: pos.y,
          opacity: 0.92,
        });
      });

      flockRafRef.current = requestAnimationFrame(updatePhysics);
    };

    flockRafRef.current = requestAnimationFrame(updatePhysics);
  }, []);

  // Track user mouse over the hero section for flocking
  const handleSectionMouseMove = (e) => {
    const container = sectionRef.current;
    if (!container) return;
    const r = container.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      inSection: true,
    };
  };

  const handleSectionMouseLeave = () => {
    mousePosRef.current.inSection = false;
  };

  // Card-specific isolated flashlight spotlight
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

  // Run on mount once
  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    runSwarmAssembly();

    return () => {
      if (tlRef.current) tlRef.current.kill();
      if (flockRafRef.current) cancelAnimationFrame(flockRafRef.current);
    };
  }, [runSwarmAssembly]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bento-hero-section container"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      {/* Swarm Interactive HUD Bar (Inspired by DhvanilPatel/swarm-cursors) */}
      <div className="swarm-hud">
        <div className="swarm-hud-left">
          <span className="pulse-beacon" />
          <span className="swarm-hud-status">{statusMessage}</span>
        </div>
        <div className="swarm-hud-right">
          <button
            onClick={runSwarmAssembly}
            className="swarm-hud-btn"
            title="Replay Swarm Assembly"
          >
            <RiRestartLine size={13} className="inline-icon" /> Replay Swarm
          </button>
          <button
            onClick={handleToggleSound}
            className={`swarm-hud-btn ${isSoundOn ? 'is-active' : ''}`}
            title="Toggle Web Audio Synthesizer"
          >
            {isSoundOn ? (
              <>
                <RiVolumeUpLine size={13} className="inline-icon" /> Sound On
              </>
            ) : (
              <>
                <RiVolumeMuteLine size={13} className="inline-icon" /> Mute
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Canvas for Blueprint Outlines, Corner Handles & Ruler Guides */}
      <svg className="swarm-overlay-canvas" aria-hidden="true">
        {/* Active Blue Selection Outlines & Dashed Ruler Projection Lines */}
        {activeBoxes.map((b) => (
          <g key={b.id}>
            {/* Dashed projection lines to canvas origin */}
            <line
              x1="0"
              y1={b.y}
              x2={b.x}
              y2={b.y}
              stroke="#0D99FF"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.65"
            />
            <line
              x1={b.x}
              y1="0"
              x2={b.x}
              y2={b.y}
              stroke="#0D99FF"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.65"
            />
            {/* Active Drawn Rectangle */}
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill="rgba(13, 153, 255, 0.04)"
              stroke={b.color || '#0D99FF'}
              strokeWidth="1.5"
            />
            {/* 4 Corner Handles (7×7 white squares with blue border) */}
            <rect
              x={b.x - 3.5}
              y={b.y - 3.5}
              width="7"
              height="7"
              fill="#FFFFFF"
              stroke={b.color || '#0D99FF'}
              strokeWidth="1"
            />
            <rect
              x={b.x + b.w - 3.5}
              y={b.y - 3.5}
              width="7"
              height="7"
              fill="#FFFFFF"
              stroke={b.color || '#0D99FF'}
              strokeWidth="1"
            />
            <rect
              x={b.x - 3.5}
              y={b.y + b.h - 3.5}
              width="7"
              height="7"
              fill="#FFFFFF"
              stroke={b.color || '#0D99FF'}
              strokeWidth="1"
            />
            <rect
              x={b.x + b.w - 3.5}
              y={b.y + b.h - 3.5}
              width="7"
              height="7"
              fill="#FFFFFF"
              stroke={b.color || '#0D99FF'}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Red Duplicate Spacing Guide Line */}
        {spacingBadge && (
          <line
            x1={spacingBadge.x1}
            y1={spacingBadge.y1}
            x2={spacingBadge.x2}
            y2={spacingBadge.y2}
            stroke="#F24822"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        )}
      </svg>

      {/* Dynamic Floating Badges (Dimensions & Spacing) */}
      <div className="swarm-badges-layer" aria-hidden="true">
        {activeBoxes.map(
          (b) =>
            b.badge && (
              <div
                key={`badge-${b.id}`}
                className="swarm-dim-badge"
                style={{
                  left: `${b.x + b.w / 2}px`,
                  top: `${b.y + b.h + 8}px`,
                }}
              >
                {b.badge}
              </div>
            )
        )}
        {spacingBadge && (
          <div
            className="swarm-spacing-badge"
            style={{
              left: `${spacingBadge.badgeX}px`,
              top: `${spacingBadge.badgeY}px`,
            }}
          >
            {spacingBadge.label}
          </div>
        )}
      </div>

      {/* Multiplayer Cursors Layer */}
      <div className="fake-cursors-layer" aria-hidden="true">
        {SWARM_PEERS.map((peer) => {
          const state = cursorStates[peer.id] || {};
          return (
            <div
              key={peer.id}
              ref={(el) => (cursorRefs.current[peer.id] = el)}
              className="fake-svg-cursor"
            >
              <SwarmCursorIcon shape={state.shape || 'arrow'} color={peer.color} />
              <div className="cursor-name-badge" style={{ backgroundColor: peer.color }}>
                <span className="cursor-user-name">{peer.name}</span>
                <span className="cursor-user-action">
                  {isAssembled ? (
                    <>
                      <RiCheckLine size={11} className="inline-icon mr-1" />
                      {state.action || peer.idleAction}
                    </>
                  ) : (
                    state.action || peer.idleAction
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento Grid (Desktop 100% Viewport, Zero Scroll) */}
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
                <span className="sys-badge">SYS // #VY-01</span>
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
