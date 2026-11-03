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
      >
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
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-tab {
  background: #111113;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  color: #FFFFFF;
  border-color: rgba(255, 255, 255, 0.2);
}

.filter-tab.active {
  background: #FFFFFF;
  border-color: #FFFFFF;
  color: #000000;
  font-weight: 600;
}

/* Projects Grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 26px 24px;
  position: relative;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.2);
  background: #121215;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
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
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.badge-pill {
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E4E4E7;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.proj-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.proj-summary {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Role Tag Box */
.role-tag-box {
  background: rgba(255, 255, 255, 0.03);
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
  color: var(--text-muted);
  font-weight: 800;
  font-size: 0.7rem;
}

.role-title {
  color: #E4E4E7;
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
  color: var(--text-secondary);
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
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 0.8px;
  margin-bottom: 0.6rem;
}

.highlights-list {
  padding-left: 1.2rem;
  list-style-type: square;
}

.highlights-list li {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 0.5rem;
}

.highlights-list li::marker {
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
