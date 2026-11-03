'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorBentoHeroAssembly
 * 
 * An interactive "Cursor-Triggered Component Assembly" Hero Section inspired by Google Stitch.
 * 
 * Tech Stack: React (Next.js), Tailwind CSS, Framer Motion
 * 
 * How it works:
 * 1. Initial State: The Bento Box cards start dormant (opacity: 0, scale: 0.9, slight y offset).
 * 2. First Cursor Wake-up: A mousemove listener on the parent container triggers `isAssembled = true`.
 * 3. Staggered Chain Reaction: Framer Motion orchestrates a rapid 0.15s stagger across children,
 *    spring-scaling each card into place as if the cursor "woke up" the UI.
 * 4. Radial Flashlight Effect: Smoothly tracks clientX and clientY relative to container bounds,
 *    casting a dynamic spotlight across card borders.
 */

// Framer Motion Parent Container Variants
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 0.15s chain reaction delay per component
      delayChildren: 0.05,
    },
  },
};

// Framer Motion Child Card Variants
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
      stiffness: 180,
      damping: 18,
      mass: 0.8,
    },
  },
};

export default function CursorBentoHeroAssembly() {
  const containerRef = useRef(null);
  const [hasWokenUp, setHasWokenUp] = useState(false);

  // Motion values for smooth radial flashlight mouse tracking
  const rawMouseX = useMotionValue(-1000);
  const rawMouseY = useMotionValue(-1000);

  // Apply spring smoothing to flashlight coords for fluid glide
  const mouseX = useSpring(rawMouseX, { stiffness: 450, damping: 35 });
  const mouseY = useSpring(rawMouseY, { stiffness: 450, damping: 35 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    // Calculate mouse position relative to container bounds
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rawMouseX.set(x);
    rawMouseY.set(y);

    // Trigger the staggered assembly once on the very first cursor movement
    if (!hasWokenUp) {
      setHasWokenUp(true);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] w-full max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center bg-black text-white overflow-hidden select-none"
    >
      {/* Background Subtle Dot Canvas */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Dynamic Radial Flashlight Overlay (Borders Highlighter) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hasWokenUp ? 1 : 0,
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), transparent 45%)`,
        }}
        aria-hidden="true"
      />

      {/* Wake-up Hint Pill */}
      <div className={`flex items-center gap-2 mb-6 text-xs text-zinc-500 font-mono transition-opacity duration-700 ${hasWokenUp ? 'opacity-30' : 'opacity-100'}`}>
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <span>[MOVE CURSOR TO ASSEMBLE WORKSPACE]</span>
      </div>

      {/* Bento Box CSS Grid (Framer Motion Staggered Parent) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={hasWokenUp ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-20"
      >
        {/* Component 1: Master Identity / About Me (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 group relative rounded-2xl bg-zinc-950/80 border border-white/10 p-8 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-white border border-white/10">
                PRODUCT OWNER & TECH BA
              </span>
              <span className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available for New Roles
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              Vasudev Yadav
            </h1>
            <p className="text-lg text-zinc-400 font-medium mb-4">
              Bridging Grassroots Financial Operations with AI-Accelerated Systems
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mb-6">
              Pairs front-line operational leadership (previously led <strong className="text-white">76 staff across 36 branches</strong> in microfinance lending) with hands-on product design in Figma, practical SQL, and developer sprint orchestration.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {['Figma Wireframing', 'BRD / PRD', 'Practical SQL', 'Agile / Scrum', 'AI-Native Prototyping'].map((skill) => (
              <span key={skill} className="px-2.5 py-1 text-xs rounded-md bg-zinc-900 text-zinc-300 border border-white/5">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Component 2: Field Scale Metric */}
        <motion.div
          variants={itemVariants}
          className="group relative rounded-2xl bg-zinc-950/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-colors"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
            <span>SCALE & OPS</span>
            <span className="text-base">🏢</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white tracking-tight mb-1">
              76 Staff
            </div>
            <div className="text-sm font-semibold text-zinc-300 mb-2">
              36 Branches Managed
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Led field lending operations, delinquency (OD buckets), and YES Bank Banking Correspondent compliance.
            </p>
          </div>
        </motion.div>

        {/* Component 3: Product Speed Metric */}
        <motion.div
          variants={itemVariants}
          className="group relative rounded-2xl bg-zinc-950/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-colors"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
            <span>VELOCITY</span>
            <span className="text-base">⚡</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-white tracking-tight mb-1">
              &gt;40%
            </div>
            <div className="text-sm font-semibold text-zinc-300 mb-2">
              Turnaround Reduction
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cut insurance claims & field KYC cycles via automated forms and single-document re-upload logic.
            </p>
          </div>
        </motion.div>

        {/* Component 4: Flagship Platform (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 group relative rounded-2xl bg-zinc-950/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
              <span className="font-mono text-white font-semibold">FLAGSHIP PLATFORM</span>
              <span>.NET Core • Angular • React Native</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Fieldmate+</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              White-label field collection & operations SaaS for NBFCs. Features Android Loan Officer app with selfie geo-tagged attendance, dynamic UPI QR collections, and floating cash-lock safeguards.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-zinc-500">
            <span>Guided 4 Developers + 1 QA</span>
            <span className="text-white font-medium group-hover:translate-x-1 transition-transform">
              View Architectural Spec ➔
            </span>
          </div>
        </motion.div>

        {/* Component 5: AI Microservice */}
        <motion.div
          variants={itemVariants}
          className="group relative rounded-2xl bg-zinc-950/80 border border-white/10 p-7 flex flex-col justify-between hover:border-white/20 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
              <span>AI PROTOTYPE</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Go 1.22</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">GST Vision AI Solver</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Decodes official GST portal CAPTCHAs via Gemma Multimodal Vision AI with cookiejar session persistence.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-500">
            Sub-25MB Multi-Stage Alpine Docker
          </div>
        </motion.div>

        {/* Component 6: Contact & Interaction Hub */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 group relative rounded-2xl bg-zinc-900/60 border border-white/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-white/20 transition-colors"
        >
          <div>
            <span className="text-xs font-mono text-zinc-500 block mb-1">CONNECT & COLLABORATE</span>
            <h3 className="text-2xl font-bold text-white">Let&apos;s Build Exceptional Software</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Open to Product Owner, Technical BA, and FinTech Solutions roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:vasuy035@gmail.com"
              className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
            >
              Email Directly
            </a>
            <a
              href="https://linkedin.com/in/vasu-dev-yadav"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-zinc-800 text-white font-medium text-sm border border-white/10 hover:bg-zinc-700 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
