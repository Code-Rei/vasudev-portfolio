<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import {
  MapPin,
  Building2,
  Zap,
  Layers,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-vue-next';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

defineEmits(['contact']);

const containerRef = ref(null);
const hasInteracted = ref(false);

// Localized hover spotlight: Only the particular card hovered gets the flashlight coordinates
const onCardMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  card.style.setProperty('--card-x', `${x}px`);
  card.style.setProperty('--card-y', `${y}px`);

  if (!hasInteracted.value) {
    hasInteracted.value = true;
    assembleComponents();
  }
};

const onCardMouseLeave = (e) => {
  const card = e.currentTarget;
  card.style.setProperty('--card-x', `-500px`);
  card.style.setProperty('--card-y', `-500px`);
};

// General container movement fallback
const onContainerMouseMove = () => {
  if (!hasInteracted.value) {
    hasInteracted.value = true;
    assembleComponents();
  }
};

const assembleComponents = () => {
  gsap.to('.bento-item', {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.65,
    stagger: 0.12,
    ease: 'back.out(1.3)',
    overwrite: 'auto'
  });
};

onMounted(() => {
  // Set initial dormant wireframe state
  gsap.set('.bento-item', {
    opacity: 0,
    scale: 0.9,
    y: 14
  });

  // Touch screen fallback
  setTimeout(() => {
    if (!hasInteracted.value) {
      assembleComponents();
    }
  }, 1200);
});
</script>

<template>
  <section
    id="about"
    ref="containerRef"
    class="bento-hero-section container"
    @mousemove="onContainerMouseMove"
  >
    <!-- Wireframe Wake-up Hint (fades out on interaction) -->
    <div class="wake-up-hint" :class="{ 'is-dormant': hasInteracted }">
      <span class="pulse-beacon"></span>
      <span class="hint-text">Hover or move cursor across the workspace</span>
    </div>

    <!-- Bento Box CSS Grid -->
    <div class="bento-grid">
      <!-- Component 1: Primary Identity & User Portrait (Spans 2 columns) -->
      <div
        class="bento-item bento-card bento-card-main"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner main-card-layout">
          <!-- Left Text Details -->
          <div class="main-text-col">
            <div class="status-pill-row">
              <span class="mono-badge">PRODUCT OWNER & TECH BA</span>
              <span class="location-badge">
                <MapPin :size="13" class="icon-inline" /> Kota, RJ
              </span>
              <span class="live-status">
                <span class="live-dot"></span> Available for Roles
              </span>
            </div>

            <h1 class="main-title">{{ data.personalDetails.name }}</h1>
            <h2 class="sub-role">{{ data.personalDetails.title }}</h2>

            <p class="about-summary">
              Pairs front-line operational leadership (previously directed <strong>76 staff across 36 branches</strong> in microfinance lending) with hands-on product design in Figma, practical SQL, and developer sprint orchestration. Rapidly prototypes working microservices with AI.
            </p>

            <div class="pill-tag-group">
              <span class="zinc-pill">Figma Wireframing</span>
              <span class="zinc-pill">BRD / PRD</span>
              <span class="zinc-pill">Practical SQL</span>
              <span class="zinc-pill">AI-Native MVPs</span>
            </div>
          </div>

          <!-- Right User Portrait Image (Directly filling user requested red box) -->
          <div class="main-photo-col">
            <div class="profile-photo-frame">
              <img
                src="/profile.jpg"
                alt="Vasudev Yadav"
                class="profile-img"
              />
              <div class="profile-badge-overlay">
                <ShieldCheck :size="13" class="verified-icon" />
                <span>Vasudev Yadav</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Component 2: Field Scale Metric (Card 2) -->
      <div
        class="bento-item bento-card bento-card-stat"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner">
          <div class="stat-top">
            <Building2 :size="18" class="stat-icon" />
            <span class="stat-tag">GROUND OPERATIONS</span>
          </div>
          <div class="stat-number">76 Staff</div>
          <div class="stat-label">36 Branches Managed</div>
          <p class="stat-desc">
            Direct leadership over loan disbursements, delinquency (OD buckets), and YES Bank BC compliance.
          </p>
        </div>
      </div>

      <!-- Component 3: Product Velocity Metric (Card 3) -->
      <div
        class="bento-item bento-card bento-card-stat"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner">
          <div class="stat-top">
            <Zap :size="18" class="stat-icon" />
            <span class="stat-tag">PRODUCT VELOCITY</span>
          </div>
          <div class="stat-number">>40%</div>
          <div class="stat-label">Turnaround Reduction</div>
          <p class="stat-desc">
            Cut insurance claim and KYC processing times via automated pre-filled forms and single-file uploads.
          </p>
        </div>
      </div>

      <!-- Component 4: Flagship Platform Card (Spans 2 columns) -->
      <div
        class="bento-item bento-card bento-card-feature"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner">
          <div class="project-header">
            <div class="feature-tag-wrap">
              <Layers :size="15" class="icon-inline" />
              <span class="feature-tag">FLAGSHIP PLATFORM</span>
            </div>
            <span class="tech-tag-row">.NET Core • Angular • React Native</span>
          </div>

          <h3 class="feature-title">Fieldmate+</h3>
          <p class="feature-desc">
            White-label collection & field ops SaaS for NBFCs and MFIs. Features Android LO app with geo-tagged selfie attendance, real-time UPI QR collections, and floating cash-lock safeguards.
          </p>

          <div class="feature-meta">
            <span>Guided 4 Developers + 1 QA</span>
            <a href="#projects" class="feature-link">
              View Architectural Specs <ArrowRight :size="14" class="icon-inline" />
            </a>
          </div>
        </div>
      </div>

      <!-- Component 5: AI Microservice (Card 5) -->
      <div
        class="bento-item bento-card bento-card-ai"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner">
          <div class="ai-header">
            <div class="ai-tag-wrap">
              <Cpu :size="15" class="icon-inline" />
              <span class="feature-tag">AI-NATIVE PROTOTYPE</span>
            </div>
            <span class="go-badge">Go 1.22</span>
          </div>

          <h3 class="ai-title">GST Vision AI Solver</h3>
          <p class="ai-desc">
            Solves tax portal CAPTCHAs via Gemma Multimodal Vision AI with cookiejar session persistence.
          </p>

          <div class="ai-footer">
            <span class="docker-badge">Docker Sub-25MB</span>
          </div>
        </div>
      </div>

      <!-- Component 6: Contact & Interaction Hub (Card 6) -->
      <div
        class="bento-item bento-card bento-card-cta"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="card-inner cta-inner">
          <div class="cta-text">
            <span class="cta-pre">READY TO COLLABORATE?</span>
            <h3 class="cta-title">Let's Build Impact</h3>
          </div>
          <div class="cta-action-row">
            <button @click="$emit('contact')" class="btn-dark-primary">
              Get In Touch <ArrowRight :size="15" class="icon-inline" />
            </button>
            <a
              :href="data.personalDetails.linkedinUrl"
              target="_blank"
              rel="noopener"
              class="btn-dark-secondary"
            >
              LinkedIn <ArrowUpRight :size="15" class="icon-inline" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5.5rem;
  padding-bottom: 4rem;
  position: relative;
}

.wake-up-hint {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: monospace;
  transition: opacity 0.4s ease;
}

.wake-up-hint.is-dormant {
  opacity: 0.25;
}

.pulse-beacon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.icon-inline {
  display: inline-block;
  vertical-align: middle;
}

/* Bento CSS Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  position: relative;
  z-index: 2;
}

/* Bento Card Base */
.bento-card {
  background: #09090b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
  will-change: transform, opacity;
  --card-x: -500px;
  --card-y: -500px;
}

/* Individual Card Hover Spotlight (ONLY fires on the particular card hovered!) */
.bento-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: radial-gradient(
    380px circle at var(--card-x) var(--card-y),
    rgba(255, 255, 255, 0.16),
    transparent 60%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-2px);
}

.card-inner {
  position: relative;
  z-index: 3;
  padding: 26px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Component 1: Main About Card with User Photo Layout */
.bento-card-main {
  grid-column: span 2;
  background: linear-gradient(145deg, #0e0e12 0%, #09090b 100%);
}

.main-card-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.main-text-col {
  flex: 1;
  min-width: 0;
}

.main-photo-col {
  flex-shrink: 0;
}

/* Profile Photo Frame */
.profile-photo-frame {
  width: 140px;
  height: 180px;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  background: #18181b;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.profile-photo-frame:hover .profile-img {
  transform: scale(1.05);
}

.profile-badge-overlay {
  position: absolute;
  bottom: 6px;
  left: 6px;
  right: 6px;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.65rem;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.verified-icon {
  color: #FFFFFF;
}

/* Status row */
.status-pill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mono-badge {
  font-family: monospace;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.location-badge {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.live-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: #A1A1AA;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.main-title {
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 0.2rem;
}

.sub-role {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: var(--font-main);
  margin-bottom: 0.8rem;
}

.about-summary {
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.about-summary strong {
  color: #FFFFFF;
}

.pill-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.zinc-pill {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #D4D4D8;
  padding: 3px 9px;
  border-radius: 6px;
}

/* Component 2 & 3: Stat Cards */
.bento-card-stat {
  background: #09090b;
}

.stat-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.2rem;
}

.stat-icon {
  color: #FFFFFF;
}

.stat-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.8px;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2.6rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.stat-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #E4E4E7;
  margin-bottom: 0.6rem;
}

.stat-desc {
  font-size: 0.86rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* Component 4: Flagship Feature Card (Span 2) */
.bento-card-feature {
  grid-column: span 2;
  background: linear-gradient(145deg, #0e0e12 0%, #09090b 100%);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.feature-tag-wrap,
.ai-tag-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.feature-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #A1A1AA;
}

.tech-tag-row {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.feature-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.2rem;
  max-width: 680px;
}

.feature-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.8rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.feature-link {
  color: #FFFFFF;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s ease;
}

.feature-link:hover {
  transform: translateX(3px);
}

/* Component 5: AI Showcase */
.bento-card-ai {
  background: #09090b;
}

.ai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.go-badge {
  font-size: 0.72rem;
  font-family: monospace;
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
  padding: 1px 6px;
  border-radius: 4px;
}

.ai-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.4rem;
}

.ai-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

.ai-footer {
  margin-top: auto;
}

.docker-badge {
  font-size: 0.72rem;
  color: var(--text-muted);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Component 6: CTA Card */
.bento-card-cta {
  background: #111113;
  display: flex;
  align-items: center;
}

.cta-inner {
  justify-content: center;
  gap: 1.2rem;
  text-align: center;
  width: 100%;
}

.cta-pre {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.8px;
  display: block;
  margin-bottom: 0.2rem;
}

.cta-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #FFFFFF;
}

.cta-action-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-dark-primary {
  background: #FFFFFF;
  color: #000000;
  font-weight: 700;
  font-size: 0.88rem;
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-dark-primary:hover {
  background: #E4E4E7;
  transform: translateY(-2px);
}

.btn-dark-secondary {
  background: rgba(255, 255, 255, 0.06);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.88rem;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-dark-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

@media (max-width: 990px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-card-main,
  .bento-card-feature,
  .bento-card-cta {
    grid-column: span 2;
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-card-main,
  .bento-card-feature,
  .bento-card-cta {
    grid-column: span 1;
  }
  .main-card-layout {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .profile-photo-frame {
    width: 110px;
    height: 140px;
  }
  .main-title {
    font-size: 2.1rem;
  }
  .card-inner {
    padding: 20px 18px;
  }
}
</style>
