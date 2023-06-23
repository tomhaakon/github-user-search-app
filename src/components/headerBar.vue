<template>
  <div class="navbar">
    <div class="flex-1">
      <a
        class="btn border-0 normal-case text-xl dark:text-white"
        href="http://localhost:5173/"
        >devFinder</a
      >
    </div>
    <div class="flex-none">
      <toggleDarkLight />
    </div>
  </div>
</template>
<script setup>
import toggleDarkLight from "./toggleDarkLight.vue";
</script>
