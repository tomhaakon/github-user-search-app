<template>
  <div class="flex shadow-md dark:shadow-none">
    <img src="../assets/icon-search.svg" class="ml-2 h-5 p-0 mt-4" />
    <div class="flex-1">
      <input
        type="text"
        placeholder="github username..."
        class="font-mono dark:text-white tracking-tighter md:text-lg pr-0 text-sm w-full input-ghost input border-0 focus:outline-none"
        v-model="searchQuery"
      />
    </div>
    <div v-if="userStore.userNotFound" class="mt-3 font-bold text-red-600 mr-2">
      <p>No result!</p>
    </div>
    <div
      v-if="userStore.emptySearchField"
      class="mt-3 font-bold text-red-600 mr-2"
    >
      <p>Empty searchfield!</p>
    </div>
    <div>
      <button
        class="font-mono btn normal-case bg-[#0079FF] text-white border-0 hover:bg-[#5ba7ff]"
        @click="triggerSearch(searchQuery)"
      >
        Search
      </button>
    </div>
  </div>
</template>
<script setup>
//import
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
//refs
const searchQuery = ref("");

//functions
const triggerSearch = (searchQuery) => {
  userStore.searchAllUsers(searchQuery);
};
</script>
