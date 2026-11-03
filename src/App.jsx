import React, { useState } from 'react';
import { portfolioData } from './data.js';
import { RiCloseLine, RiArrowRightLine } from '@remixicon/react';

// Components
import CustomCursor from './components/CustomCursor.jsx';
import HeroBentoSection from './components/HeroBentoSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import EducationSection from './components/EducationSection.jsx';
import ContactSection from './components/ContactSection.jsx';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToSection = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Interactive Custom Cursor Engine */}
      <CustomCursor />

      {/* Subtle Background Dot Canvas */}
      <div className="stitch-bg-grid" aria-hidden="true" />

      {/* Minimalist Sticky Header (No boxy "VY" logo) */}
      <header className="header">
        <div className="container header-inner">
          {/* Clean Text Branding without boxy "VY" badge */}
          <a href="#about" className="nav-brand">
            <div className="brand-meta">
              <span className="brand-name">{portfolioData.personalDetails.name}</span>
              <span className="brand-role">Product Owner & Tech BA</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><a href="#about" className="nav-link">Overview</a></li>
              <li><a href="#projects" className="nav-link">Platforms</a></li>
              <li><a href="#experience" className="nav-link">Experience</a></li>
              <li><a href="#skills" className="nav-link">Competencies</a></li>
              <li><a href="#education" className="nav-link">Credentials</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          {/* Right Action Group */}
          <div className="header-action-group">
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-cta-btn"
            >
              Connect <RiArrowRightLine size={14} className="inline-icon" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle Navigation Menu"
            >
              <span className={isMenuOpen ? 'open' : ''} />
              <span className={isMenuOpen ? 'open' : ''} />
              <span className={isMenuOpen ? 'open' : ''} />
            </button>
          </div>

          {/* Mobile Drawer */}
          <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-header">
              <span>Navigation</span>
              <button onClick={closeMenu} className="close-drawer" aria-label="Close Navigation">
                <RiCloseLine size={20} />
              </button>
            </div>
            <ul className="mobile-nav-links">
              <li><a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>Overview</a></li>
              <li><a href="#projects" className="nav-link" onClick={() => scrollToSection('projects')}>Platforms</a></li>
              <li><a href="#experience" className="nav-link" onClick={() => scrollToSection('experience')}>Experience</a></li>
              <li><a href="#skills" className="nav-link" onClick={() => scrollToSection('skills')}>Competencies</a></li>
              <li><a href="#education" className="nav-link" onClick={() => scrollToSection('education')}>Credentials</a></li>
              <li><a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Bento Hero Section (100% Viewport, Zero Scroll On Desktop, Framer Motion Component Assembly) */}
        <HeroBentoSection
          data={portfolioData}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Projects Section */}
        <section id="projects" className="page-section container">
          <div className="section-badge">
            <span className="badge-num">01</span>
            <span className="badge-label">SYSTEMS & ARCHITECTURE</span>
          </div>
          <h2 className="section-title">Enterprise SaaS Platforms & AI Prototypes</h2>
          <p className="section-lead">
            Core financial platforms delivered with engineering teams, alongside autonomous AI microservices prototyped using AI.
          </p>
          <ProjectsSection projects={portfolioData.projects} />
        </section>

        {/* Experience Section */}
        <section id="experience" className="page-section container">
          <div className="section-badge">
            <span className="badge-num">02</span>
            <span className="badge-label">TRACK RECORD</span>
          </div>
          <h2 className="section-title">Professional Experience & Leadership</h2>
          <p className="section-lead">
            Demonstrated operational stewardship across 36 branches leading 76 staff, combined with technical business analysis.
          </p>
          <ExperienceSection experience={portfolioData.experience} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="page-section container">
          <div className="section-badge">
            <span className="badge-num">03</span>
            <span className="badge-label">SKILL MATRIX</span>
          </div>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-lead">
            Bridging UX wireframing, lending operations, practical SQL, and modern AI acceleration.
          </p>
          <SkillsSection categories={portfolioData.skillCategories} />
        </section>

        {/* Education Section */}
        <section id="education" className="page-section container">
          <div className="section-badge">
            <span className="badge-num">04</span>
            <span className="badge-label">CREDENTIALS</span>
          </div>
          <h2 className="section-title">Education & Certifications</h2>
          <EducationSection education={portfolioData.education} />
        </section>
      </main>

      {/* Footer / Contact Section */}
      <footer id="contact" className="page-section footer">
        <div className="container">
          <div className="section-badge center">
            <span className="badge-num">05</span>
            <span className="badge-label">INITIATE COLLABORATION</span>
          </div>
          <h2 className="section-title center">Get In Touch</h2>
          <ContactSection details={portfolioData.personalDetails} />
        </div>
      </footer>
    </div>
  );
}
