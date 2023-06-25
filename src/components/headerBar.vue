<template>
  <div class="navbar">
    <div class="flex-1 mt-5">
      <a
        class="font-mono btn border-0 normal-case tracking-wide text-3xl dark:text-white"
        href="http://localhost:5173/"
        >devfinder</a
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
