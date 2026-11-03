<script setup>
defineProps({
  data: Object
});
defineEmits(['contact']);
</script>

<template>
  <section id="about" class="hero container">
    <!-- Google Stitch Workspace Canvas Frame -->
    <div class="stitch-bounding-frame">
      <!-- Stitch Header Bar -->
      <div class="stitch-canvas-header">
        <div class="stitch-pill-left">
          <span class="stitch-dot-grid">⠿</span>
          <span class="stitch-canvas-title">Workspace: Vasudev_Yadav_Portfolio.stitch</span>
          <span class="stitch-badge-mode">EDIT MODE</span>
        </div>
        <div class="stitch-collaborators-bar">
          <span class="collab-count">4 Collaborators Active</span>
          <div class="collab-avatars">
            <span class="collab-avatar" style="--c-color: #22C55E" title="Vasudev (Product Owner)">VY</span>
            <span class="collab-avatar" style="--c-color: #8B5CF6" title="AI Co-pilot (Vision/Code)">AI</span>
            <span class="collab-avatar" style="--c-color: #38BDF8" title="Lead Dev (.NET/SQL)">DL</span>
            <span class="collab-avatar" style="--c-color: #F59E0B" title="UI/UX Designer (Figma)">UX</span>
          </div>
        </div>
      </div>

      <!-- Selection Bounding Box with Figma-like anchor handles -->
      <div class="stitch-selection-box">
        <div class="stitch-handle top-left"></div>
        <div class="stitch-handle top-right"></div>
        <div class="stitch-handle bottom-left"></div>
        <div class="stitch-handle bottom-right"></div>
        <div class="stitch-tag-label">Frame 01: Master_Identity (Auto-Layout)</div>

        <div class="hero-content">
          <div class="role-pill-group">
            <span class="role-pill-primary">
              <span class="sparkle">✦</span> {{ data.personalDetails.title }}
            </span>
            <span class="role-pill-secondary">
              📍 {{ data.personalDetails.location }}
            </span>
          </div>

          <h1 class="hero-title">{{ data.personalDetails.name }}</h1>
          <h2 class="hero-tagline">{{ data.personalDetails.tagline }}</h2>

          <p class="hero-description">{{ data.summary }}</p>

          <!-- Core Value Proof Strip -->
          <div class="proof-strip">
            <div class="proof-item">
              <span class="proof-icon">🏢</span>
              <span><strong>36 Branches Led</strong> in Field MFI Operations</span>
            </div>
            <div class="proof-item">
              <span class="proof-icon">🚀</span>
              <span><strong>4–6 Devs Guided</strong> on White-Label SaaS</span>
            </div>
            <div class="proof-item">
              <span class="proof-icon">⚡</span>
              <span><strong>AI Prototyper</strong> (Go, n8n, Spatial Routing)</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="hero-cta-group">
            <a href="#projects" class="btn btn-primary">
              Explore Enterprise SaaS & Prototypes ➔
            </a>
            <button @click="$emit('contact')" class="btn btn-secondary">
              Direct Contact
            </button>
            <a :href="data.personalDetails.linkedinUrl" target="_blank" rel="noopener" class="btn btn-ghost">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 3rem;
  position: relative;
}

/* Google Stitch Master Canvas Frame */
.stitch-bounding-frame {
  width: 100%;
  max-width: 1200px;
  background: rgba(13, 23, 18, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(34, 197, 94, 0.05);
  overflow: hidden;
  position: relative;
}

/* Canvas Header Bar */
.stitch-canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(8, 14, 10, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-main);
}

.stitch-pill-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stitch-dot-grid {
  color: var(--color-mint);
  font-size: 1.1rem;
}

.stitch-canvas-title {
  color: #94A3B8;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.stitch-badge-mode {
  background: rgba(34, 197, 94, 0.15);
  color: var(--color-mint);
  border: 1px solid rgba(34, 197, 94, 0.3);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.stitch-collaborators-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.collab-count {
  font-size: 0.75rem;
  color: #64748B;
}

.collab-avatars {
  display: flex;
  align-items: center;
}

.collab-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--c-color);
  color: #080E0A;
  font-weight: 800;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -6px;
  border: 2px solid #0D1712;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

/* Stitch Selection Box with Figma Handles */
.stitch-selection-box {
  padding: 40px;
  position: relative;
  border: 1.5px dashed rgba(34, 197, 94, 0.35);
  border-radius: 12px;
  margin: 16px;
  background: rgba(18, 32, 25, 0.45);
}

.stitch-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #22C55E;
  border: 1px solid #080E0A;
}

.stitch-handle.top-left { top: -4px; left: -4px; }
.stitch-handle.top-right { top: -4px; right: -4px; }
.stitch-handle.bottom-left { bottom: -4px; left: -4px; }
.stitch-handle.bottom-right { bottom: -4px; right: -4px; }

.stitch-tag-label {
  position: absolute;
  top: -12px;
  left: 20px;
  background: #22C55E;
  color: #080E0A;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 3px;
  letter-spacing: 0.5px;
  font-family: var(--font-main);
}

.hero-content {
  max-width: 900px;
}

.role-pill-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.role-pill-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, rgba(163, 230, 53, 0.15), rgba(34, 197, 94, 0.15));
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: var(--color-mint);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 100px;
  letter-spacing: 0.5px;
}

.sparkle {
  color: #A3E635;
}

.role-pill-secondary {
  color: #94A3B8;
  font-size: 0.85rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #FFFFFF 0%, #A7F3D0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1.5px;
}

.hero-tagline {
  font-size: 1.6rem;
  font-family: var(--font-main);
  font-weight: 600;
  color: #38BDF8;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.hero-description {
  font-size: 1.15rem;
  color: #CBD5E1;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 820px;
}

/* Proof Strip */
.proof-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 16px;
  background: rgba(8, 14, 10, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin-bottom: 2.5rem;
}

.proof-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #E2E8F0;
}

.proof-icon {
  font-size: 1.2rem;
}

.proof-item strong {
  color: var(--color-mint);
}

/* Hero CTAs */
.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #A3E635 0%, #22C55E 100%);
  color: #080E0A;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 26px rgba(34, 197, 94, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

.btn-ghost {
  background: transparent;
  color: #94A3B8;
  border-color: rgba(255, 255, 255, 0.1);
}

.btn-ghost:hover {
  color: #38BDF8;
  border-color: #38BDF8;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }
  .hero-tagline {
    font-size: 1.2rem;
  }
  .stitch-selection-box {
    padding: 20px 14px;
    margin: 8px;
  }
  .proof-strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  .hero-cta-group {
    flex-direction: column;
    width: 100%;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
