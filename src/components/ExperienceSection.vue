<script setup>
defineProps({
  experience: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="timeline-wrapper">
    <div
      v-for="(job, index) in experience"
      :key="index"
      class="timeline-card"
    >
      <!-- Timeline Connector -->
      <div class="timeline-indicator">
        <div class="timeline-dot"></div>
        <div class="timeline-line" v-if="index !== experience.length - 1"></div>
      </div>

      <!-- Experience Body with Stitch Selection Box -->
      <div class="exp-box">
        <div class="exp-header">
          <div>
            <div class="badge-row">
              <span class="badge-type">{{ job.badge }}</span>
              <span class="badge-duration">{{ job.duration }}</span>
            </div>
            <h3 class="role-name">{{ job.role }}</h3>
            <div class="company-name">
              <strong>{{ job.company }}</strong> — {{ job.location }}
            </div>
          </div>
        </div>

        <ul class="exp-list">
          <li v-for="(hl, hIdx) in job.highlights" :key="hIdx">
            {{ hl }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
  position: relative;
}

.timeline-card {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

/* Timeline Indicator Line */
.timeline-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
}

.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #22C55E;
  border: 3px solid #080E0A;
  box-shadow: 0 0 12px #22C55E;
  flex-shrink: 0;
  margin-top: 24px;
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(180deg, #22C55E 0%, rgba(34, 197, 94, 0.1) 100%);
  margin-top: 8px;
}

/* Exp Box */
.exp-box {
  flex-grow: 1;
  background: rgba(13, 23, 18, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 26px;
  transition: all 0.3s ease;
  position: relative;
}

.exp-box:hover {
  border-color: rgba(34, 197, 94, 0.4);
  transform: translateX(4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}

.badge-type {
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: var(--color-mint);
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.badge-duration {
  font-size: 0.8rem;
  color: #94A3B8;
}

.role-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.3rem;
}

.company-name {
  font-size: 0.95rem;
  color: #38BDF8;
  margin-bottom: 1.2rem;
}

.company-name strong {
  color: #FFFFFF;
}

.exp-list {
  padding-left: 1.2rem;
  list-style-type: square;
}

.exp-list li {
  font-size: 0.92rem;
  color: #CBD5E1;
  line-height: 1.65;
  margin-bottom: 0.6rem;
}

.exp-list li::marker {
  color: var(--color-mint);
}

@media (max-width: 768px) {
  .timeline-card {
    gap: 0.8rem;
  }
  .exp-box {
    padding: 18px 14px;
  }
}
</style>
