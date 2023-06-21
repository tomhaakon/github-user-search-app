<template>
  <div v-if="!isDark" class="flex">
    <button @click="toggleDark()" class="btn btn-ghost">
      <p class="text-black">dark</p>
      <img src="../assets/icon-moon.svg" />
    </button>
  </div>
  <div v-if="isDark" class="flex">
    <button @click="toggleDark()" class="btn btn-ghost">
      <p class="text-white">light</p>
        <div class="flex-1">  <img src="../assets/icon-sun.svg" /></div>
    </button>
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
