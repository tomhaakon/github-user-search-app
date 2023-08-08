<template>
  <main class="dark:bg-[#141D2F] bg-[#F6F8FF] h-screen">
    <div class="dark:bg-[#141D2F] lg:px-48 xd:px-62 md:px-20 sm:pt-10 pb-5">
      <headerBar class="" />
      <searchBar
        class="dark:bg-[#1E2A47] bg-[#FEFEFE] mx-7 rounded-2xl p-2 mb-5"
      />
      <mainContent />
    </div>
  </main>
</template>
<script setup>
import headerBar from "./components/headerBar.vue";
import searchBar from "./components/searchBar.vue";
import mainContent from "./components/mainContent.vue";
</script>
