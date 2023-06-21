<template>
  <div class="navbar">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl dark:text-white">devFinder</a>
    </div>
    <div class="flex-none">
      <toggleDarkLight />
    </div>
  </div>
</template>
<script setup>
import toggleDarkLight from "./toggleDarkLight.vue";
</script>
