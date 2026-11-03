<script setup>
defineProps({
  education: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="education-grid">
    <div
      v-for="(edu, index) in education"
      :key="index"
      class="edu-card"
    >
      <div class="edu-top-row">
        <span class="edu-badge">{{ edu.badge }}</span>
        <span class="edu-year">{{ edu.year }}</span>
      </div>
      <h3 class="edu-degree">{{ edu.degree }}</h3>
      <div class="edu-inst">{{ edu.institution }}</div>
      <div class="edu-loc" v-if="edu.location">📍 {{ edu.location }}</div>
    </div>
  </div>
</template>

<style scoped>
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.edu-card {
  background: rgba(13, 23, 18, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.edu-card:hover {
  transform: translateY(-3px);
  border-color: #38BDF8;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.edu-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.edu-badge {
  font-size: 0.72rem;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38BDF8;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
}

.edu-year {
  font-size: 0.85rem;
  color: #94A3B8;
  font-weight: 600;
}

.edu-degree {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.4rem;
}

.edu-inst {
  font-size: 0.95rem;
  color: #CBD5E1;
  margin-bottom: 0.3rem;
}

.edu-loc {
  font-size: 0.82rem;
  color: #64748B;
}
</style>
