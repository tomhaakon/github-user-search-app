<template>
  <div class="flex ">
    <img src="../assets/icon-search.svg" class="ml-2 h-5 p-0 mt-4" />
    <div class="flex-1">
      <input
        type="text"
        placeholder="Search GitHub username"
        class="font-mono dark:text-white tracking-tighter md:text-lg pr-0 text-sm w-full input-ghost input border-0 focus:outline-none"
        v-model="searchQuery"
      />
    </div>
    <div v-if="alertNotFound" class="mt-3 font-bold text-red-600 mr-2">
      <p>No result</p>
    </div>
    <div>
      <button
        class="font-mono btn normal-casen bg-[#0079FF] text-white border-0"
        @click="search(searchQuery)"
      >
        Search
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();

//refs
const searchQuery = ref("");
let usr = ref();
let alertNotFound = ref(false);
//funksjoner

const search = async (query) => {
  console.log("searched clicked");

  if (query !== "") {
    console.log("query:", query);
    console.log("søker..");
    const response = await userStore.searchAllUsers(query);
    const responseData = await response.json(); // Extract the JSON data from the response
    const result = responseData.items; // Extract the user data from the response JSON

    let count = 0;
    result.forEach((usr) => {
      let selectedUser = "";

      const usrToLower = usr.login.toLowerCase();
      const queryToLower = query.toLowerCase();

      if (usrToLower === queryToLower) {
        selectedUser = usr.login;
        selectUser(selectedUser);
        count--;
      }
      count++;
    });
    console.log("resuklt", result.length);
    if (count === result.length) {
      userNotFound();
    }
    console.log(count);
  } else {
    console.log("searchfield empty");
  }
};
const userNotFound = () => {
  alertNotFound.value = true;
  searchQuery.value = "";
  setTimeout(() => {
    alertNotFound.value = false;
  }, 2000);
};

const selectUser = (user) => {
  console.log("selectuser triggered");
  searchQuery.value = "";

  userStore.$patch({ selectedUser: user });
  userStore.$patch({ showUser: true });

  userStore.selectSingleUser(user);
};
</script>
