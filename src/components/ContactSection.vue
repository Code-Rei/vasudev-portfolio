<script setup>
defineProps({
  details: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="contact-wrapper">
    <div class="contact-intro">
      <p class="contact-subtext">
        Whether you are looking for an <strong>AI-Native Product Owner</strong> to lead your next FinTech SaaS platform, or a <strong>Techno-Functional Business Analyst</strong> who understands field lending operations inside and out — let’s connect.
      </p>
    </div>

    <!-- Contact Grid -->
    <div class="contact-grid">
      <!-- Email Card -->
      <a :href="'mailto:' + details.email" class="contact-card">
        <div class="contact-icon">✉️</div>
        <div class="contact-info">
          <span class="c-label">Direct Email</span>
          <span class="c-value">{{ details.email }}</span>
        </div>
        <span class="c-arrow">➔</span>
      </a>

      <!-- Phone Card -->
      <a :href="'tel:' + details.phone" class="contact-card">
        <div class="contact-icon">📞</div>
        <div class="contact-info">
          <span class="c-label">Phone / WhatsApp</span>
          <span class="c-value">{{ details.phone }}</span>
        </div>
        <span class="c-arrow">➔</span>
      </a>

      <!-- LinkedIn Card -->
      <a :href="details.linkedinUrl" target="_blank" rel="noopener" class="contact-card">
        <div class="contact-icon">🔗</div>
        <div class="contact-info">
          <span class="c-label">LinkedIn Profile</span>
          <span class="c-value">{{ details.linkedin }}</span>
        </div>
        <span class="c-arrow">↗</span>
      </a>

      <!-- GitHub Card -->
      <a :href="details.githubUrl" target="_blank" rel="noopener" class="contact-card">
        <div class="contact-icon">💻</div>
        <div class="contact-info">
          <span class="c-label">GitHub Repositories</span>
          <span class="c-value">{{ details.github }}</span>
        </div>
        <span class="c-arrow">↗</span>
      </a>
    </div>

    <!-- Google Stitch Signature Footer -->
    <div class="stitch-footer-sig">
      <div class="sig-dots">
        <span class="dot" style="background: #22C55E"></span>
        <span class="dot" style="background: #8B5CF6"></span>
        <span class="dot" style="background: #38BDF8"></span>
        <span class="dot" style="background: #F59E0B"></span>
      </div>
      <span class="sig-text">
        Engineered with Google Stitch Collaborative Aesthetics • Built with Vue 3 & GSAP ScrollTrigger
      </span>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  margin-top: 1.5rem;
}

.contact-intro {
  max-width: 780px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.contact-subtext {
  font-size: 1.15rem;
  color: #CBD5E1;
  line-height: 1.8;
}

.contact-subtext strong {
  color: var(--color-mint);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  background: rgba(13, 23, 18, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: inherit;
}

.contact-card:hover {
  transform: translateY(-3px);
  border-color: #22C55E;
  background: rgba(18, 32, 25, 0.9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(34, 197, 94, 0.15);
}

.contact-icon {
  font-size: 1.6rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.c-label {
  font-size: 0.75rem;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
}

.c-value {
  font-size: 0.95rem;
  color: #FFFFFF;
  font-weight: 600;
}

.c-arrow {
  color: var(--color-mint);
  font-size: 1.1rem;
  transition: transform 0.25s ease;
}

.contact-card:hover .c-arrow {
  transform: translateX(4px);
}

/* Stitch Signature */
.stitch-footer-sig {
  margin-top: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.sig-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.sig-text {
  font-size: 0.8rem;
  color: #64748B;
}
</style>
