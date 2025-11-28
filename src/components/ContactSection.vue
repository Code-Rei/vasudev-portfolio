<script setup>
defineProps({
  details: Object
});
</script>

<template>
  <div class="contact-grid">
    <div class="contact-item">
      <span class="contact-label">Email</span>
      <a :href="'mailto:' + details.email" class="contact-value">{{ details.email }}</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">Phone</span>
      <a :href="'tel:' + details.phone" class="contact-value">{{ details.phone }}</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">LinkedIn</span>
      <a :href="'https://' + details.linkedin" target="_blank" class="contact-value">View Profile</a>
    </div>
    <div class="contact-item">
      <span class="contact-label">Location</span>
      <span class="contact-value">{{ details.location }}</span>
    </div>
  </div>
</template>
