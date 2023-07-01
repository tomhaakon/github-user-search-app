<template>
  <div class="navbar pb-10 sm:pb-6">
    <div class="flex-1 mt-5">
      <a
        class="font-mono btn border-0 normal-case tracking-wide text-2xl dark:text-white dark:hover:text-slate-500 hover:text-slate-500"
        href="/github-user-search-app/"
        onclick="redirectToHome(event)"
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

const redirectToHome = (event) => {
  event.preventDefault();
  window.location.href = "/github-user-search-app/";
};
</script>
