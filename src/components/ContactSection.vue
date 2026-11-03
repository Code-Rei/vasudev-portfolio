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
        Looking for an <strong>AI-Native Product Owner</strong> or a <strong>Techno-Functional Business Analyst</strong> with deep microfinance and lending operations experience? Let’s connect.
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
          <span class="c-label">LinkedIn</span>
          <span class="c-value">{{ details.linkedin }}</span>
        </div>
        <span class="c-arrow">↗</span>
      </a>

      <!-- GitHub Card -->
      <a :href="details.githubUrl" target="_blank" rel="noopener" class="contact-card">
        <div class="contact-icon">💻</div>
        <div class="contact-info">
          <span class="c-label">GitHub</span>
          <span class="c-value">{{ details.github }}</span>
        </div>
        <span class="c-arrow">↗</span>
      </a>
    </div>

    <!-- Clean Minimalist Footer Signature -->
    <div class="minimal-footer">
      <span class="footer-meta">
        © 2026 Vasudev Yadav • Designed with Minimalist Black & Grey Aesthetics
      </span>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  margin-top: 1.5rem;
}

.contact-intro {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.contact-subtext {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.contact-subtext strong {
  color: #FFFFFF;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  color: inherit;
}

.contact-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.25);
  background: #121215;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.contact-icon {
  font-size: 1.4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.c-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
}

.c-value {
  font-size: 0.92rem;
  color: #FFFFFF;
  font-weight: 600;
}

.c-arrow {
  color: var(--text-muted);
  font-size: 1rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.contact-card:hover .c-arrow {
  transform: translateX(3px);
  color: #FFFFFF;
}

.minimal-footer {
  margin-top: 4.5rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
