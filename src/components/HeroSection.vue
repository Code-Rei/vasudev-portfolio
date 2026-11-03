<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

defineEmits(['contact']);

const containerRef = ref(null);
const isAssembled = ref(false);
const hasInteracted = ref(false);

const handleMouseMove = (e) => {
  if (!containerRef.value) return;

  // Calculate mouse coordinates relative to container
  const rect = containerRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  containerRef.value.style.setProperty('--mouse-x', `${x}px`);
  containerRef.value.style.setProperty('--mouse-y', `${y}px`);

  // Trigger assembly chain reaction on first cursor wake-up
  if (!hasInteracted.value) {
    hasInteracted.value = true;
    assembleComponents();
  }
};

const assembleComponents = () => {
  isAssembled.value = true;
  
  // Staggered chain reaction assembly (0.15s stagger)
  gsap.to('.bento-item', {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.65,
    stagger: 0.15,
    ease: 'back.out(1.3)',
    overwrite: 'auto'
  });
};

onMounted(() => {
  // Set initial wireframe / hidden state
  gsap.set('.bento-item', {
    opacity: 0,
    scale: 0.9,
    y: 12
  });

  // Fallback timer: if user doesn't move mouse within 1.5s, assemble automatically so mobile / touch users see the UI
  setTimeout(() => {
    if (!hasInteracted.value) {
      assembleComponents();
    }
  }, 1500);
});
</script>

<template>
  <section
    id="about"
    ref="containerRef"
    class="bento-hero-section container"
    @mousemove="handleMouseMove"
  >
    <!-- Interactive Flashlight / Radial Spotlight Layer -->
    <div class="flashlight-overlay" aria-hidden="true"></div>

    <!-- Wireframe Wake-up Hint (fades out after first interaction) -->
    <div class="wake-up-indicator" :class="{ 'faded': hasInteracted }">
      <span class="pulse-beacon"></span>
      <span class="hint-text">Move cursor to wake up and assemble the workspace</span>
    </div>

    <!-- Bento Box Grid (5-6 Portfolio Components) -->
    <div class="bento-grid">
      <!-- Component 1: Primary Identity & About (Spans 2 columns) -->
      <div class="bento-item bento-card bento-card-main">
        <div class="card-glow-border"></div>
        <div class="card-inner">
          <div class="status-pill-row">
            <span class="mono-badge">PO & TECH BA</span>
            <span class="location-badge">Kota, RJ</span>
            <span class="live-status">
              <span class="live-dot"></span> Available for Product Roles
            </span>
          </div>

          <h1 class="main-title">{{ data.personalDetails.name }}</h1>
          <h2 class="sub-role">{{ data.personalDetails.title }}</h2>

          <p class="about-summary">
            Pairs front-line operational leadership (led <strong>76 staff across 36 branches</strong>) with hands-on product design in Figma, practical SQL, and developer sprint orchestration. Rapidly prototypes working microservices with AI.
          </p>

          <div class="pill-tag-group">
            <span class="zinc-pill">Figma Wireframing</span>
            <span class="zinc-pill">BRD / PRD</span>
            <span class="zinc-pill">Practical SQL</span>
            <span class="zinc-pill">AI-Native MVPs</span>
          </div>
        </div>
      </div>

      <!-- Component 2: Field Scale Metric (Card 2) -->
      <div class="bento-item bento-card bento-card-stat">
        <div class="card-glow-border"></div>
        <div class="card-inner">
          <div class="stat-top">
            <span class="stat-icon">🏢</span>
            <span class="stat-tag">GROUND OPERATIONS</span>
          </div>
          <div class="stat-number">76 Staff</div>
          <div class="stat-label">36 Branches Managed</div>
          <p class="stat-desc">
            Direct leadership over loan disbursements, delinquency (OD buckets), and YES Bank BC compliance.
          </p>
        </div>
      </div>

      <!-- Component 3: Product Speed Metric (Card 3) -->
      <div class="bento-item bento-card bento-card-stat">
        <div class="card-glow-border"></div>
        <div class="card-inner">
          <div class="stat-top">
            <span class="stat-icon">⚡</span>
            <span class="stat-tag">PRODUCT SPEED</span>
          </div>
          <div class="stat-number">>40%</div>
          <div class="stat-label">Turnaround Reduction</div>
          <p class="stat-desc">
            Cut insurance claim and KYC processing times via automated pre-filled forms and single-file uploads.
          </p>
        </div>
      </div>

      <!-- Component 4: Flagship Project Card (Card 4 - Spans 2 columns) -->
      <div class="bento-item bento-card bento-card-feature">
        <div class="card-glow-border"></div>
        <div class="card-inner">
          <div class="project-header">
            <span class="feature-tag">FLAGSHIP PLATFORM</span>
            <span class="tech-tag-row">.NET Core • Angular • React Native</span>
          </div>
          <h3 class="feature-title">Fieldmate+</h3>
          <p class="feature-desc">
            White-label collection & field ops SaaS for NBFCs and MFIs. Features Android LO app with geo-tagged selfie attendance, real-time UPI QR collections, and floating cash-lock rules.
          </p>
          <div class="feature-meta">
            <span>Guided 4 Developers + 1 QA</span>
            <a href="#projects" class="feature-link">View Specs ➔</a>
          </div>
        </div>
      </div>

      <!-- Component 5: AI Prototyping Showcase (Card 5) -->
      <div class="bento-item bento-card bento-card-ai">
        <div class="card-glow-border"></div>
        <div class="card-inner">
          <div class="ai-header">
            <span class="feature-tag">AI-NATIVE PROTOTYPE</span>
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
      <div class="bento-item bento-card bento-card-cta">
        <div class="card-glow-border"></div>
        <div class="card-inner cta-inner">
          <div class="cta-text">
            <span class="cta-pre">READY TO COLLABORATE?</span>
            <h3 class="cta-title">Let's Build Impact</h3>
          </div>
          <div class="cta-action-row">
            <button @click="$emit('contact')" class="btn-dark-primary">
              Get In Touch ➔
            </button>
            <a
              :href="data.personalDetails.linkedinUrl"
              target="_blank"
              rel="noopener"
              class="btn-dark-secondary"
            >
              LinkedIn ↗
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
  padding-top: 6rem;
  padding-bottom: 4rem;
  position: relative;
  --mouse-x: -500px;
  --mouse-y: -500px;
}

/* Flashlight / Radial Border Glow Spotlight */
.flashlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.06),
    transparent 45%
  );
  z-index: 1;
}

/* Wake-up Hint */
.wake-up-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-family: var(--font-main);
  transition: opacity 0.5s ease;
}

.wake-up-indicator.faded {
  opacity: 0.35;
}

.pulse-beacon {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: beacon-pulse 2s infinite;
}

@keyframes beacon-pulse {
  0% { transform: scale(0.9); opacity: 0.4; }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.4; }
}

/* Bento CSS Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  position: relative;
  z-index: 2;
}

/* Bento Card Base (Initial Wireframe State) */
.bento-card {
  background: #09090b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s ease, transform 0.25s ease;
  will-change: transform, opacity;
}

/* Dynamic Spotlight Border Highlight */
.bento-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.15),
    transparent 50%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.bento-hero-section:hover .bento-card::before {
  opacity: 1;
}

.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.22);
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

/* Component 1: Main About Card */
.bento-card-main {
  grid-column: span 2;
  background: linear-gradient(145deg, #0d0d10 0%, #09090b 100%);
}

.status-pill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;
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
}

.live-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: #A1A1AA;
  margin-left: auto;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.main-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 0.3rem;
}

.sub-role {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: var(--font-main);
  margin-bottom: 1rem;
}

.about-summary {
  font-size: 0.98rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 650px;
}

.about-summary strong {
  color: #FFFFFF;
}

.pill-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.zinc-pill {
  font-size: 0.78rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #D4D4D8;
  padding: 4px 10px;
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
  font-size: 1.1rem;
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
  font-size: 1rem;
  font-weight: 600;
  color: #E4E4E7;
  margin-bottom: 0.6rem;
}

.stat-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Component 4: Flagship Feature Card (Span 2) */
.bento-card-feature {
  grid-column: span 2;
  background: linear-gradient(145deg, #0d0d10 0%, #09090b 100%);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
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
  font-size: 0.95rem;
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
  .bento-card-main {
    grid-column: span 2;
  }
  .bento-card-feature {
    grid-column: span 2;
  }
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
  .main-title {
    font-size: 2.2rem;
  }
  .card-inner {
    padding: 20px 18px;
  }
}
</style>
