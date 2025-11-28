<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { portfolioData } from './data.js';

// Components
import HeroSection from './components/HeroSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ContactSection from './components/ContactSection.vue';

onMounted(() => {
  // Initial Hero Animation
  const tl = gsap.timeline();
  
  tl.from('.nav-logo', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('h1', { y: 30, opacity: 0, duration: 1 }, '-=0.6')
    .from('.hero-description', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');

  // Scroll Animations (Simple Intersection Observer approach for simplicity without ScrollTrigger plugin overhead if not requested, 
  // but let's use a simple loop for sections to fade them in as they scroll into view)
  
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    gsap.set(section, { opacity: 0, y: 50 }); // Initial state
    observer.observe(section);
  });
});

const scrollToContact = () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <div>
    <header class="header">
      <div class="container flex-between">
        <div class="nav-logo"></div>
        <nav>
          <ul class="nav-links">
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#skills" class="nav-link">Skills</a></li>
            <li><a href="#experience" class="nav-link">Experience</a></li>
            <li><a href="#projects" class="nav-link">Projects</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <HeroSection :data="portfolioData" @contact="scrollToContact" />
      
      <div id="skills" class="section container">
        <h2>Skills</h2>
        <SkillsSection :skills="portfolioData.skills" />
      </div>

      <div id="experience" class="section container">
        <h2>Experience</h2>
        <ExperienceSection :experience="portfolioData.experience" />
      </div>

      <div id="projects" class="section container">
        <h2>Projects</h2>
        <ProjectsSection :projects="portfolioData.projects" />
      </div>

      <div id="education" class="section container">
        <h2>Education</h2>
        <EducationSection :education="portfolioData.education" />
      </div>
    </main>

    <footer id="contact" class="footer">
      <div class="container">
        <h2>Get In Touch</h2>
        <ContactSection :details="portfolioData.personalDetails" />
      </div>
    </footer>
  </div>
</template>
