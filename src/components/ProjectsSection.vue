<script setup>
defineProps({
  projects: Array
});
</script>

<template>
  <div class="card-grid">
    <div v-for="(project, index) in projects" :key="index" class="card">
      <div class="card-header">
        <div>
          <h3 class="card-role">{{ project.name }}</h3>
          <div v-if="project.type" class="card-company">{{ project.type }}</div>
        </div>
      </div>
      <ul class="card-list">
        <li v-for="(highlight, hIndex) in project.highlights" :key="hIndex">
          {{ highlight }}
        </li>
      </ul>
    </div>
  </div>
</template>
