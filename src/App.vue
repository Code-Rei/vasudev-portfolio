<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data.js';

// Components
import CustomCursor from './components/CustomCursor.vue';
import HeroSection from './components/HeroSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ContactSection from './components/ContactSection.vue';

gsap.registerPlugin(ScrollTrigger);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const scrollToSection = (id) => {
  if (isMenuOpen.value) {
    toggleMenu();
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  const sections = document.querySelectorAll('.page-section');
  
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 35
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
});
</script>

<template>
  <div class="portfolio-app-root">
    <!-- Interactive Custom Cursor Engine -->
    <CustomCursor />

    <!-- Subtle Background Dot Grid -->
    <div class="stitch-bg-grid" aria-hidden="true"></div>

    <!-- Minimalist Sticky Header -->
    <header class="header">
      <div class="container header-inner">
        <!-- Logo (Clean text brand without the boxy "VY" logo) -->
        <a href="#about" class="nav-brand">
          <div class="brand-meta">
            <span class="brand-name">{{ portfolioData.personalDetails.name }}</span>
            <span class="brand-role">Product Owner & Tech BA</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <ul class="nav-links">
            <li><a href="#about" class="nav-link">Overview</a></li>
            <li><a href="#projects" class="nav-link">Platforms</a></li>
            <li><a href="#experience" class="nav-link">Experience</a></li>
            <li><a href="#skills" class="nav-link">Competencies</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right CTA Button -->
        <div class="header-action-group">
          <button @click="scrollToSection('contact')" class="nav-cta-btn">
            Connect ➔
          </button>

          <!-- Mobile Hamburger -->
          <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Toggle Menu">
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
          </button>
        </div>

        <!-- Mobile Drawer -->
        <div class="mobile-nav" :class="{ 'open': isMenuOpen }">
          <div class="mobile-nav-header">
            <span>Navigation</span>
            <button @click="toggleMenu" class="close-drawer">✕</button>
          </div>
          <ul class="mobile-nav-links">
            <li><a href="#about" class="nav-link" @click="toggleMenu">Overview</a></li>
            <li><a href="#projects" class="nav-link" @click="toggleMenu">Platforms</a></li>
            <li><a href="#experience" class="nav-link" @click="toggleMenu">Experience</a></li>
            <li><a href="#skills" class="nav-link" @click="toggleMenu">Competencies</a></li>
            <li><a href="#contact" class="nav-link" @click="toggleMenu">Contact</a></li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section (Bento Box Component Assembly) -->
      <HeroSection :data="portfolioData" @contact="scrollToSection('contact')" />

      <!-- Projects Section -->
      <section id="projects" class="page-section container">
        <div class="section-badge">
          <span class="badge-num">01</span>
          <span class="badge-label">SYSTEMS & ARCHITECTURE</span>
        </div>
        <h2 class="section-title">Enterprise SaaS Platforms & AI Prototypes</h2>
        <p class="section-lead">
          Core financial platforms delivered with engineering teams, alongside autonomous AI microservices prototyped using AI.
        </p>
        <ProjectsSection :projects="portfolioData.projects" />
      </section>

      <!-- Experience Section -->
      <section id="experience" class="page-section container">
        <div class="section-badge">
          <span class="badge-num">02</span>
          <span class="badge-label">OPERATIONS & LEADERSHIP</span>
        </div>
        <h2 class="section-title">Career Experience</h2>
        <p class="section-lead">
          From ground-level branch operations directing 76 staff across 36 branches to guiding cross-platform engineering sprints.
        </p>
        <ExperienceSection :experience="portfolioData.experience" />
      </section>

      <!-- Skills Section -->
      <section id="skills" class="page-section container">
        <div class="section-badge">
          <span class="badge-num">03</span>
          <span class="badge-label">SKILL MATRIX</span>
        </div>
        <h2 class="section-title">Core Competencies</h2>
        <p class="section-lead">
          Bridging UX wireframing, lending operations, practical SQL, and modern AI acceleration.
        </p>
        <SkillsSection :categories="portfolioData.skillCategories" />
      </section>

      <!-- Education Section -->
      <section id="education" class="page-section container">
        <div class="section-badge">
          <span class="badge-num">04</span>
          <span class="badge-label">CREDENTIALS</span>
        </div>
        <h2 class="section-title">Education & Certifications</h2>
        <EducationSection :education="portfolioData.education" />
      </section>
    </main>

    <!-- Footer / Contact -->
    <footer id="contact" class="page-section footer">
      <div class="container">
        <div class="section-badge center">
          <span class="badge-num">05</span>
          <span class="badge-label">INITIATE COLLABORATION</span>
        </div>
        <h2 class="section-title center">Get In Touch</h2>
        <ContactSection :details="portfolioData.personalDetails" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.portfolio-app-root {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-primary);
  position: relative;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 16px 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-meta {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-weight: 800;
  font-size: 1.05rem;
  color: #FFFFFF;
  letter-spacing: -0.3px;
}

.brand-role {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.desktop-nav {
  display: flex;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.88rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #FFFFFF;
}

.header-action-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-cta-btn {
  background: #FFFFFF;
  color: #000000;
  font-weight: 600;
  font-size: 0.82rem;
  padding: 7px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-cta-btn:hover {
  background: #E4E4E7;
  transform: translateY(-1px);
}

/* Sections */
.page-section {
  padding: 6rem 0;
  border-bottom: 1px solid var(--border-subtle);
  position: relative;
}

.section-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.6rem;
}

.section-badge.center {
  justify-content: center;
}

.badge-num {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
}

.badge-label {
  font-size: 0.78rem;
  letter-spacing: 1px;
  color: var(--text-muted);
  font-weight: 700;
}

.section-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.6rem;
  letter-spacing: -0.5px;
}

.section-title.center {
  text-align: center;
}

.section-lead {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 680px;
  margin-bottom: 2.8rem;
  line-height: 1.6;
}

/* Mobile Nav */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.mobile-menu-btn span {
  width: 100%;
  height: 2px;
  background-color: #FFFFFF;
  transition: all 0.3s ease;
}

.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: #09090b;
  border-left: 1px solid var(--border-subtle);
  padding: 24px;
  transition: right 0.3s ease;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.close-drawer {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.2rem;
  cursor: pointer;
}

.mobile-nav-links {
  list-style: none;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-links .nav-link {
  font-size: 1.1rem;
  color: #E2E8F0;
}

@media (max-width: 860px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .section-title {
    font-size: 1.9rem;
  }
}
</style>
