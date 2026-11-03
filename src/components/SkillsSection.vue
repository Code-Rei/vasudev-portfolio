<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="skills-categories-grid">
    <div
      v-for="cat in categories"
      :key="cat.category"
      class="skill-category-card"
    >
      <div class="cat-header">
        <span class="cat-accent-dot"></span>
        <h3 class="cat-title">{{ cat.category }}</h3>
        <span class="cat-count">{{ cat.skills.length }} Skills</span>
      </div>

      <div class="skills-tag-wrap">
        <span
          v-for="skill in cat.skills"
          :key="skill"
          class="skill-pill"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.skill-category-card {
  background: #0d0d10;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.25s ease;
  position: relative;
}

.skill-category-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
  background: #121215;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 0.8rem;
}

.cat-accent-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}

.cat-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0;
  flex-grow: 1;
}

.cat-count {
  font-size: 0.72rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
}

.skills-tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pill {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-size: 0.82rem;
  padding: 5px 11px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.skill-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
  transform: translateY(-1px);
}
</style>
