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
      :style="{ '--c-accent': cat.color }"
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
  gap: 1.8rem;
  margin-top: 1rem;
}

.skill-category-card {
  background: rgba(13, 23, 18, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
}

.skill-category-card:hover {
  transform: translateY(-4px);
  border-color: var(--c-accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.08);
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-accent);
  box-shadow: 0 0 10px var(--c-accent);
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
  color: #64748B;
  background: rgba(255, 255, 255, 0.04);
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
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #CBD5E1;
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.25s ease;
}

.skill-pill:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--c-accent);
  color: #FFFFFF;
  transform: translateY(-1px);
}
</style>
