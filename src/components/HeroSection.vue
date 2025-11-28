<script setup>
defineProps({
  data: Object
});
defineEmits(['contact']);
</script>

<template>
  <section id="about" class="hero container">
    <div class="hero-content">
      <span class="hero-subtitle">{{ data.personalDetails.title }}</span>
      <h1>{{ data.personalDetails.name }}</h1>
      <p class="hero-description">{{ data.summary }}</p>
      <div class="hero-cta">
        <button @click="$emit('contact')" class="btn">Contact Me</button>
      </div>
    </div>
  </section>
</template>
