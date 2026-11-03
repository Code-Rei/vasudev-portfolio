<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data.js';

// Components
import CollaborativeCursors from './components/CollaborativeCursors.vue';
import HeroSection from './components/HeroSection.vue';
import ImpactStatsSection from './components/ImpactStatsSection.vue';
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
  // Section entrance animations with Stitch selection appearance
  const sections = document.querySelectorAll('.stitch-section');
  
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 40,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
});
</script>

<template>
  <div class="stitch-app-wrapper">
    <!-- Background Canvas Grid with Stitch Rulers -->
    <div class="stitch-bg-grid" aria-hidden="true"></div>

    <!-- Collaborative Cursors Engine -->
    <CollaborativeCursors :cursors="portfolioData.collaboratorCursors" />

    <!-- Top Fixed Navigation Header -->
    <header class="header">
      <div class="container header-inner">
        <!-- Logo with Live Status -->
        <a href="#about" class="nav-brand">
          <span class="brand-avatar">VY</span>
          <div class="brand-text">
            <span class="brand-name">Vasudev Yadav</span>
            <span class="brand-role">Product Owner & Tech BA</span>
          </div>
          <span class="online-indicator" title="Collaborative Workspace Active"></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <ul class="nav-links">
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#impact" class="nav-link">Impact</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#experience" class="nav-link">Experience</a></li>
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Right Quick Action -->
        <div class="header-action-group">
          <button @click="scrollToSection('contact')" class="nav-cta-btn">
            Connect ➔
          </button>

          <!-- Mobile Menu Toggle Button -->
          <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Toggle Menu">
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
          </button>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div class="mobile-nav" :class="{ 'open': isMenuOpen }">
          <div class="mobile-nav-header">
            <span>Navigation Workspace</span>
            <button @click="toggleMenu" class="close-drawer">✕</button>
          </div>
          <ul class="mobile-nav-links">
            <li><a href="#about" class="nav-link" @click="toggleMenu">About</a></li>
            <li><a href="#impact" class="nav-link" @click="toggleMenu">Impact</a></li>
            <li><a href="#projects" class="nav-link" @click="toggleMenu">Projects</a></li>
            <li><a href="#experience" class="nav-link" @click="toggleMenu">Experience</a></li>
            <li><a href="#skills" class="nav-link" @click="toggleMenu">Skills</a></li>
            <li><a href="#contact" class="nav-link" @click="toggleMenu">Contact</a></li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content Stream -->
    <main>
      <!-- Hero Section -->
      <HeroSection :data="portfolioData" @contact="scrollToSection('contact')" />

      <!-- Impact Metrics Section -->
      <section id="impact" class="stitch-section container">
        <div class="section-tag-header">
          <span class="tag-number">01</span>
          <span class="tag-title">Scale & Real-World Operations</span>
        </div>
        <h2 class="section-heading">Operational Scale & Measured Impact</h2>
        <p class="section-subheading">
          Real numbers from the front lines of microfinance banking and software delivery.
        </p>
        <ImpactStatsSection :metrics="portfolioData.impactMetrics" />
      </section>

      <!-- Projects Section -->
      <section id="projects" class="stitch-section container">
        <div class="section-tag-header">
          <span class="tag-number">02</span>
          <span class="tag-title">Systems & Architecture</span>
        </div>
        <h2 class="section-heading">Featured Platforms & AI Prototypes</h2>
        <p class="section-subheading">
          Enterprise FinTech SaaS platforms guided with developers, alongside autonomous AI tools & microservices prototyped rapidly using AI.
        </p>
        <ProjectsSection :projects="portfolioData.projects" />
      </section>

      <!-- Experience Section -->
      <section id="experience" class="stitch-section container">
        <div class="section-tag-header">
          <span class="tag-number">03</span>
          <span class="tag-title">Professional Trajectory</span>
        </div>
        <h2 class="section-heading">Career Experience & Leadership</h2>
        <p class="section-subheading">
          From ground-level branch operations managing 76 staff to guiding cross-platform engineering sprints.
        </p>
        <ExperienceSection :experience="portfolioData.experience" />
      </section>

      <!-- Skills Section -->
      <section id="skills" class="stitch-section container">
        <div class="section-tag-header">
          <span class="tag-number">04</span>
          <span class="tag-title">4-Pillar Competencies</span>
        </div>
        <h2 class="section-heading">Techno-Functional Skill Matrix</h2>
        <p class="section-subheading">
          Bridging UX wireframing, banking domain knowledge, practical SQL, and modern AI acceleration.
        </p>
        <SkillsSection :categories="portfolioData.skillCategories" />
      </section>

      <!-- Education Section -->
      <section id="education" class="stitch-section container">
        <div class="section-tag-header">
          <span class="tag-number">05</span>
          <span class="tag-title">Academic Foundation</span>
        </div>
        <h2 class="section-heading">Education & Credentials</h2>
        <EducationSection :education="portfolioData.education" />
      </section>
    </main>

    <!-- Footer / Contact Section -->
    <footer id="contact" class="stitch-section footer">
      <div class="container">
        <div class="section-tag-header center">
          <span class="tag-number">06</span>
          <span class="tag-title">Initiate Collaboration</span>
        </div>
        <h2 class="section-heading center">Get In Touch</h2>
        <ContactSection :details="portfolioData.personalDetails" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.stitch-app-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 0;
  background: rgba(8, 14, 10, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  gap: 12px;
  text-decoration: none;
}

.brand-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #A3E635, #22C55E);
  color: #080E0A;
  font-weight: 800;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 0.95rem;
  color: #FFFFFF;
}

.brand-role {
  font-size: 0.72rem;
  color: var(--color-mint);
  font-weight: 500;
}

.online-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 8px #22C55E;
}

.desktop-nav {
  display: flex;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
}

.nav-link {
  font-size: 0.88rem;
  color: #94A3B8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #22C55E;
}

.header-action-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-cta-btn {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #22C55E;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-cta-btn:hover {
  background: #22C55E;
  color: #080E0A;
}

/* Sections */
.stitch-section {
  padding: 5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.section-tag-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.section-tag-header.center {
  justify-content: center;
}

.tag-number {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-mint);
  background: rgba(34, 197, 94, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.tag-title {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #64748B;
  font-weight: 600;
}

.section-heading {
  font-size: 2.6rem;
  font-weight: 800;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
}

.section-heading.center {
  text-align: center;
}

.section-subheading {
  font-size: 1.1rem;
  color: #94A3B8;
  max-width: 700px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

/* Mobile Nav */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
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
  background: rgba(8, 14, 10, 0.98);
  backdrop-filter: blur(25px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: #94A3B8;
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
  font-size: 1.15rem;
  color: #E2E8F0;
}

@media (max-width: 860px) {
  .desktop-nav {
    display: none;
  }
  .mobile-menu-btn {
    display: flex;
  }
  .section-heading {
    font-size: 2rem;
  }
}
</style>
