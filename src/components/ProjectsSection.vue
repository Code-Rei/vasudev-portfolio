<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const activeCategory = ref('All');

const categories = ['All', 'Enterprise FinTech', 'AI Microservice', 'Spatial Logistics', 'Client System'];

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return props.projects;
  }
  return props.projects.filter(p => p.category === activeCategory.value);
});
</script>

<template>
  <div class="projects-wrapper">
    <!-- Category Filter Segmented Tabs -->
    <div class="filter-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-tab"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Project Cards Grid -->
    <div class="project-grid">
      <div
        v-for="proj in filteredProjects"
        :key="proj.id"
        class="project-card"
        :style="{ '--accent': proj.accent }"
      >
        <!-- Figma/Stitch Corner Handles -->
        <div class="stitch-node top-left"></div>
        <div class="stitch-node top-right"></div>
        <div class="stitch-node bottom-left"></div>
        <div class="stitch-node bottom-right"></div>
        <div class="stitch-selection-tag">Component: {{ proj.id }}</div>

        <!-- Card Header -->
        <div class="card-meta-row">
          <span class="cat-pill">{{ proj.type }}</span>
          <span class="badge-pill" v-if="proj.badge">{{ proj.badge }}</span>
        </div>

        <h3 class="proj-title">{{ proj.name }}</h3>
        <p class="proj-summary">{{ proj.summary }}</p>

        <!-- Role Pill -->
        <div class="role-tag-box">
          <span class="role-prefix">ROLE:</span>
          <span class="role-title">{{ proj.role }}</span>
        </div>

        <!-- Tech Stack Tags -->
        <div class="stack-wrap">
          <span
            v-for="tech in proj.techStack"
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Highlights -->
        <div class="highlights-box">
          <div class="highlights-title">KEY IMPACT & ARCHITECTURE</div>
          <ul class="highlights-list">
            <li v-for="(hl, hIdx) in proj.highlights" :key="hIdx">
              {{ hl }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-wrapper {
  margin-top: 1rem;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-tab {
  background: rgba(18, 32, 25, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  font-family: var(--font-main);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-tab:hover {
  color: #FFFFFF;
  border-color: rgba(34, 197, 94, 0.3);
}

.filter-tab.active {
  background: rgba(34, 197, 94, 0.18);
  border-color: #22C55E;
  color: #22C55E;
  box-shadow: 0 0 16px rgba(34, 197, 94, 0.2);
}

/* Projects Grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(13, 23, 18, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px 24px;
  position: relative;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 197, 94, 0.1);
}

/* Stitch Anchor Nodes */
.stitch-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #080E0A;
  transition: background 0.3s ease;
}
.stitch-node.top-left { top: -3px; left: -3px; }
.stitch-node.top-right { top: -3px; right: -3px; }
.stitch-node.bottom-left { bottom: -3px; left: -3px; }
.stitch-node.bottom-right { bottom: -3px; right: -3px; }

.stitch-selection-tag {
  position: absolute;
  top: -10px;
  right: 16px;
  background: rgba(18, 32, 25, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  font-size: 0.65rem;
  font-family: monospace;
  padding: 1px 6px;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .stitch-node {
  background: var(--accent);
}

.project-card:hover .stitch-selection-tag {
  opacity: 1;
  color: var(--accent);
  border-color: var(--accent);
}

/* Card Metadata */
.card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.cat-pill {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-pill {
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E2E8F0;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.proj-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.6rem;
  line-height: 1.25;
}

.proj-summary {
  font-size: 0.95rem;
  color: #CBD5E1;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Role Tag Box */
.role-tag-box {
  background: rgba(8, 14, 10, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 6px 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
}

.role-prefix {
  color: #64748B;
  font-weight: 800;
  font-size: 0.7rem;
}

.role-title {
  color: #A7F3D0;
  font-weight: 600;
}

/* Tech Stack */
.stack-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.2rem;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 4px;
}

/* Highlights Box */
.highlights-box {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1rem;
}

.highlights-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748B;
  letter-spacing: 0.8px;
  margin-bottom: 0.6rem;
}

.highlights-list {
  padding-left: 1.2rem;
  list-style-type: square;
}

.highlights-list li {
  font-size: 0.88rem;
  color: #CBD5E1;
  line-height: 1.55;
  margin-bottom: 0.5rem;
}

.highlights-list li::marker {
  color: var(--accent);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
