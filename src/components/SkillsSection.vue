<script setup>
defineProps({
  skills: Array
});
</script>

<template>
  <div class="skills-grid">
    <span v-for="(skill, index) in skills" :key="index" class="skill-tag">
      {{ skill }}
    </span>
  </div>
</template>
