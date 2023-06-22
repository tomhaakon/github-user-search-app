<template>
  <main class="dark:bg-[#0D1117] bg-slate-200 h-screen w-screen">
    <headerBar class="" />
    <searchBar class="dark:bg-[#161B22] bg-white mx-5 rounded-lg p-2 mb-5" />
    <mainContent class="dark:bg-[#161B22] bg-white mx-5 mb-5 rounded-lg p-5 " />
  </main>
</template>
<script setup>
import "./spaghetti";
import headerBar from "./components/headerBar.vue";
import searchBar from "./components/searchBar.vue";
import mainContent from "./components/mainContent.vue";
</script>
