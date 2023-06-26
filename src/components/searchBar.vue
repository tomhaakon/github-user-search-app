<template>
  <div class="flex">
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

let alertNotFound = ref(false);
//funksjoner

const search = (query) => {
  console.log("searched clicked");
  console.log("userStore.users:", userStore.users);
  if (query && userStore.users) {
    userStore.searchAllUsers(query);
    console.log("this is the query:", query);
    let userFound = false;
    userStore.users.forEach((user) => {
      // console.log("asdsa", user);
      if (query.toLowerCase() == user.login.toLowerCase()) {
        console.log("true");
        console.log("this is tha usar", user);
        userStore.selectedUser = user.login;
        userStore.selectSingleUser(user.login);
        userStore.$patch({ selectedUser: user.login });
        userFound = true;
      }
      if (!userFound) {
        console.log("false");
        userNotFound();
      }
    });
  }
};
const userNotFound = () => {
  alertNotFound.value = true;
  searchQuery.value = "";
  setTimeout(() => {
    alertNotFound.value = false;
  }, 2000);
};

// const selectUser = (user) => {
//   console.log("selectuser triggered");
//   searchQuery.value = "";

//   userStore.$patch({ selectedUser: user });
//   userStore.$patch({ showUser: true });

//   // userStore.selectSingleUser(user);
// };
</script>
