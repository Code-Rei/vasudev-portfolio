<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cursorDot = ref(null);
const cursorRing = ref(null);
const isHovering = ref(false);
const isClicking = ref(false);
const isVisible = ref(false);

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let rafId = null;

const onMouseMove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!isVisible.value) isVisible.value = true;

  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }
};

const onMouseDown = () => {
  isClicking.value = true;
};

const onMouseUp = () => {
  isClicking.value = false;
};

const onMouseLeaveWindow = () => {
  isVisible.value = false;
};

const onMouseEnterWindow = () => {
  isVisible.value = true;
};

// Smooth lerp loop for the trailing ring
const render = () => {
  // Lerp equation: ringX += (mouseX - ringX) * factor
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;

  if (cursorRing.value) {
    cursorRing.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
  }

  rafId = requestAnimationFrame(render);
};

// Setup hover detection on interactive elements
const setupHoverListeners = () => {
  const interactiveTargets = document.querySelectorAll(
    'a, button, .bento-card, .project-card, .contact-card, .filter-tab, .skill-pill'
  );

  interactiveTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => { isHovering.value = true; });
    el.addEventListener('mouseleave', () => { isHovering.value = false; });
  });
};

onMounted(() => {
  // Only activate on devices with fine pointer (mouse/trackpad), not touchscreens
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    rafId = requestAnimationFrame(render);

    // Initial and periodic hover element binding (to catch dynamically rendered items)
    setupHoverListeners();
    setTimeout(setupHoverListeners, 1000);
    setTimeout(setupHoverListeners, 2500);
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('mouseleave', onMouseLeaveWindow);
  document.removeEventListener('mouseenter', onMouseEnterWindow);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="custom-cursor-container" aria-hidden="true">
    <!-- Center Sharp Pointer Dot -->
    <div
      ref="cursorDot"
      class="cursor-dot"
      :class="{
        'is-active': isHovering,
        'is-hidden': !isVisible
      }"
    ></div>

    <!-- Smooth Trailing Magnetic Ring -->
    <div
      ref="cursorRing"
      class="cursor-ring"
      :class="{
        'is-hovering': isHovering,
        'is-clicking': isClicking,
        'is-hidden': !isVisible
      }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

/* Central Dot */
.cursor-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: #FFFFFF;
  border-radius: 50%;
  margin-top: -3px;
  margin-left: -3px;
  pointer-events: none;
  transition: transform 0.05s ease-out, opacity 0.2s ease, width 0.2s ease, height 0.2s ease;
  will-change: transform;
}

.cursor-dot.is-active {
  width: 4px;
  height: 4px;
  margin-top: -2px;
  margin-left: -2px;
  background-color: #FFFFFF;
}

/* Trailing Ring */
.cursor-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  margin-top: -16px;
  margin-left: -16px;
  pointer-events: none;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              margin 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease,
              background-color 0.25s ease,
              opacity 0.2s ease;
  will-change: transform;
}

.cursor-ring.is-hovering {
  width: 56px;
  height: 56px;
  margin-top: -28px;
  margin-left: -28px;
  border-color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(2px);
}

.cursor-ring.is-clicking {
  transform: scale(0.85);
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.18);
}

.cursor-dot.is-hidden,
.cursor-ring.is-hidden {
  opacity: 0;
}

@media (pointer: coarse) {
  .custom-cursor-container {
    display: none !important;
  }
}
</style>
