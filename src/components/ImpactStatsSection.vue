<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="impact-section-wrapper">
    <div class="stitch-section-badge">
      <span class="stitch-bracket">[</span>
      <span>Live Impact Matrix (36 Branches & Field Operations)</span>
      <span class="stitch-bracket">]</span>
    </div>

    <div class="impact-grid">
      <div
        v-for="(m, index) in metrics"
        :key="index"
        class="impact-card"
        :style="{ '--delay': `${index * 0.15}s` }"
      >
        <div class="card-stitch-corner top-left"></div>
        <div class="card-stitch-corner top-right"></div>
        <div class="card-stitch-corner bottom-left"></div>
        <div class="card-stitch-corner bottom-right"></div>

        <div class="impact-val">{{ m.value }}</div>
        <div class="impact-label">{{ m.label }}</div>
        <p class="impact-desc">{{ m.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.impact-section-wrapper {
  margin: 3rem 0;
  position: relative;
}

.stitch-section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-main);
  font-size: 0.8rem;
  color: var(--color-mint);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  background: rgba(34, 197, 94, 0.08);
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px dashed rgba(34, 197, 94, 0.3);
}

.stitch-bracket {
  color: #A3E635;
  font-weight: 800;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.impact-card {
  background: rgba(18, 32, 25, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 28px 24px;
  position: relative;
  transition: all 0.35s ease;
  overflow: hidden;
}

.impact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #22C55E, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.impact-card:hover {
  transform: translateY(-4px);
  border-color: rgba(34, 197, 94, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.1);
}

.impact-card:hover::before {
  opacity: 1;
}

/* Corner Handles */
.card-stitch-corner {
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.2);
}
.card-stitch-corner.top-left { top: 4px; left: 4px; }
.card-stitch-corner.top-right { top: 4px; right: 4px; }
.card-stitch-corner.bottom-left { bottom: 4px; left: 4px; }
.card-stitch-corner.bottom-right { bottom: 4px; right: 4px; }

.impact-card:hover .card-stitch-corner {
  background: #22C55E;
}

.impact-val {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #FFFFFF 0%, #A7F3D0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.impact-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-mint);
  margin-bottom: 0.6rem;
}

.impact-desc {
  font-size: 0.92rem;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 0;
}
</style>
