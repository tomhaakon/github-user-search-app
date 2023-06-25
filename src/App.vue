<template>
  <main class="dark:bg-[#141D2F] bg-[#F6F8FF] h-screen w-screen">
    <headerBar class="mb-6" />
    <searchBar
      class="dark:bg-[#1E2A47] bg-[#FEFEFE] mx-7 rounded-2xl p-2 mb-5"
    />
    <mainContent
      class="dark:bg-[#1E2A47] bg-white mx-7 rounded-2xl px-5 pt-5"
    />
  </main>
</template>
<script setup>
import "./spaghetti";
import headerBar from "./components/headerBar.vue";
import searchBar from "./components/searchBar.vue";
import mainContent from "./components/mainContent.vue";
</script>
