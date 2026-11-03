<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  cursors: {
    type: Array,
    required: true
  }
});

// Cursor elements refs
const cursorRefs = ref([]);
const activeAction = ref('Collaborative Canvas Initialized');

onMounted(() => {
  // Setup GSAP ScrollTrigger based cursor choreography across sections
  const cursor1 = cursorRefs.value[0]; // Vasudev (Product Owner) - Green
  const cursor2 = cursorRefs.value[1]; // AI Co-pilot - Violet
  const cursor3 = cursorRefs.value[2]; // Dev Lead - Blue
  const cursor4 = cursorRefs.value[3]; // UI/UX Designer - Amber

  if (!cursor1 || !cursor2 || !cursor3 || !cursor4) return;

  // Master timeline scrubbed with scroll speed
  const masterST = gsap.timeline({
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100);
        if (progress < 15) {
          activeAction.value = 'Vasudev is framing Hero Architecture in Figma';
        } else if (progress < 30) {
          activeAction.value = 'AI Co-pilot is validating 4 Impact Metrics';
        } else if (progress < 55) {
          activeAction.value = 'Dev Lead is inspecting Fieldmate+ & Stored Procedures';
        } else if (progress < 75) {
          activeAction.value = 'Vasudev & Team are sequencing Experience Timeline';
        } else if (progress < 90) {
          activeAction.value = 'UI/UX Designer is stamping 4-Pillar Skill Tokens';
        } else {
          activeAction.value = 'All 4 Collaborators are active in Contact Hub';
        }
      }
    }
  });

  // Stage 1: Hero area (0% - 15% scroll)
  masterST
    .to(cursor1, { x: '25vw', y: '28vh', ease: 'power2.inOut', duration: 1 })
    .to(cursor2, { x: '70vw', y: '32vh', ease: 'power2.inOut', duration: 1 }, 0)
    .to(cursor3, { x: '78vw', y: '68vh', ease: 'power2.inOut', duration: 1 }, 0)
    .to(cursor4, { x: '18vw', y: '72vh', ease: 'power2.inOut', duration: 1 }, 0);

  // Stage 2: Moving into Impact Stats (15% - 30% scroll)
  masterST
    .to(cursor1, { x: '20vw', y: '110vh', ease: 'power1.inOut', duration: 1.5 })
    .to(cursor2, { x: '45vw', y: '105vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.2')
    .to(cursor3, { x: '72vw', y: '115vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.5')
    .to(cursor4, { x: '85vw', y: '125vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.3');

  // Stage 3: Projects Showcase (30% - 60% scroll)
  masterST
    .to(cursor1, { x: '35vw', y: '210vh', ease: 'power2.inOut', duration: 2 })
    .to(cursor2, { x: '68vw', y: '235vh', ease: 'power2.inOut', duration: 2 }, '-=1.8')
    .to(cursor3, { x: '25vw', y: '265vh', ease: 'power2.inOut', duration: 2 }, '-=1.6')
    .to(cursor4, { x: '75vw', y: '290vh', ease: 'power2.inOut', duration: 2 }, '-=1.7');

  // Stage 4: Experience Timeline (60% - 78% scroll)
  masterST
    .to(cursor1, { x: '15vw', y: '370vh', ease: 'power2.inOut', duration: 1.8 })
    .to(cursor2, { x: '82vw', y: '390vh', ease: 'power2.inOut', duration: 1.8 }, '-=1.5')
    .to(cursor3, { x: '22vw', y: '420vh', ease: 'power2.inOut', duration: 1.8 }, '-=1.6')
    .to(cursor4, { x: '78vw', y: '440vh', ease: 'power2.inOut', duration: 1.8 }, '-=1.4');

  // Stage 5: Skills Grid (78% - 90% scroll)
  masterST
    .to(cursor1, { x: '28vw', y: '500vh', ease: 'power1.inOut', duration: 1.5 })
    .to(cursor2, { x: '62vw', y: '515vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.2')
    .to(cursor3, { x: '38vw', y: '540vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.4')
    .to(cursor4, { x: '75vw', y: '550vh', ease: 'power1.inOut', duration: 1.5 }, '-=1.3');

  // Stage 6: Contact & Footer Convergence (90% - 100% scroll)
  masterST
    .to(cursor1, { x: '38vw', y: '610vh', ease: 'power3.out', duration: 1.2 })
    .to(cursor2, { x: '45vw', y: '612vh', ease: 'power3.out', duration: 1.2 }, '-=1.0')
    .to(cursor3, { x: '52vw', y: '610vh', ease: 'power3.out', duration: 1.2 }, '-=1.0')
    .to(cursor4, { x: '60vw', y: '614vh', ease: 'power3.out', duration: 1.2 }, '-=1.0');

  // Add subtle idle floating bobbing to cursors so they always look alive
  props.cursors.forEach((_, idx) => {
    const el = cursorRefs.value[idx];
    if (el) {
      gsap.to(el.querySelector('.cursor-body'), {
        y: '+=6',
        x: '+=3',
        repeat: -1,
        yoyo: true,
        duration: 2 + idx * 0.4,
        ease: 'sine.inOut'
      });
    }
  });
});
</script>

<template>
  <div class="stitch-canvas-overlay" aria-hidden="true">
    <!-- Live Stitch Activity Status Pill -->
    <div class="stitch-live-status-pill">
      <span class="pulse-indicator"></span>
      <span class="status-action-text">{{ activeAction }}</span>
      <span class="status-badge">Google Stitch Active</span>
    </div>

    <!-- 4 Collaborative Virtual Cursors -->
    <div
      v-for="(c, index) in cursors"
      :key="c.id"
      :ref="el => cursorRefs[index] = el"
      class="stitch-cursor"
      :style="{
        left: `${c.initialX}vw`,
        top: `${c.initialY}vh`,
        '--cursor-color': c.color
      }"
    >
      <div class="cursor-body">
        <!-- SVG Mouse Pointer with selection ring -->
        <svg class="cursor-svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            :fill="c.color"
            stroke="#080E0A"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>

        <!-- Collaborator Name & Role Tag (Figma / Stitch style) -->
        <div class="cursor-tag" :style="{ backgroundColor: c.color }">
          <span class="cursor-name">{{ c.name }}</span>
          <span class="cursor-role">({{ c.role }})</span>
        </div>

        <!-- Dynamic Action Bubble -->
        <div class="cursor-action-bubble">
          {{ c.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stitch-canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
}

/* Fixed Live Status Pill */
.stitch-live-status-pill {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(13, 23, 18, 0.88);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  color: #fff;
  font-size: 0.82rem;
  font-family: var(--font-main);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 10px #22C55E;
  animation: pulse-glow 1.5s infinite;
}

.status-action-text {
  color: #E2E8F0;
  font-weight: 500;
}

.status-badge {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.72rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

@keyframes pulse-glow {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

/* Individual Virtual Cursor */
.stitch-cursor {
  position: absolute;
  will-change: transform, left, top;
  pointer-events: none;
  z-index: 99;
}

.cursor-body {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
}

.cursor-svg {
  width: 22px;
  height: 22px;
  transform: translate(-2px, -2px);
}

.cursor-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 4px;
  margin-top: 2px;
  margin-left: 14px;
  font-family: var(--font-main);
  font-size: 0.72rem;
  font-weight: 700;
  color: #080E0A;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.cursor-role {
  font-weight: 500;
  opacity: 0.85;
  font-size: 0.68rem;
}

.cursor-action-bubble {
  margin-left: 14px;
  margin-top: 3px;
  background: rgba(13, 23, 18, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.68rem;
  color: #A7F3D0;
  white-space: nowrap;
  backdrop-filter: blur(8px);
}

@media (max-width: 768px) {
  .stitch-cursor {
    display: none; /* Hide heavy virtual cursor trails on small mobile touchscreens */
  }
  .stitch-live-status-pill {
    bottom: 12px;
    right: 12px;
    left: 12px;
    justify-content: center;
    font-size: 0.75rem;
  }
}
</style>
