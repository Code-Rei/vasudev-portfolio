<script setup>
defineProps({
  education: Array
});
</script>

<template>
  <div class="education-list">
    <div v-for="(edu, index) in education" :key="index" class="education-item">
      <div>
        <div class="edu-degree">{{ edu.degree }}</div>
        <div class="edu-inst">{{ edu.institution }}</div>
      </div>
      <div class="edu-year">{{ edu.year }}</div>
    </div>
  </div>
</template>
