<script setup>
defineProps({
  experience: Array
});
</script>

<template>
  <div class="card-grid">
    <div v-for="(job, index) in experience" :key="index" class="card">
      <div class="card-header">
        <div>
          <h3 class="card-role">{{ job.role }}</h3>
          <div class="card-company">{{ job.company }} | {{ job.location }}</div>
        </div>
        <div class="card-date">{{ job.duration }}</div>
      </div>
      <ul class="card-list">
        <li v-for="(resp, rIndex) in job.responsibilities" :key="rIndex">
          {{ resp }}
        </li>
      </ul>
    </div>
  </div>
</template>
