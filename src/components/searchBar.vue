<template>
  <div class="flex">
    <img src="../assets/icon-search.svg" class="ml-3 h-5 p-0 mt-4" />
    <div class="flex-1">
      <input
        type="text"
        placeholder="Search GitHub username..."
        class="dark:text-white w-full input-ghost input border-0 focus:outline-none"
        v-model="searchQuery"
      />
    </div>
    <button
      class="dark:bg-[#00ABFF] dark:text-white bg-[#1F6FEB] text-white border-0 btn btn-sm mt-2 hover:border-0 focus:outline-none"
      onclick="my_modal_1.showModal()"
      @click="search()"
    >
      Search
    </button>
    <!-- dialog for search user list -->
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box dark:bg-[#161B22]">
        <div class="flex">
          <div class="flex-1 dark:bg-slate-600 p-5 rounded-lg">
            <div class="modal-open">
              <p class="dark:text-slate-200"></p>
              <!-- if searchfield is empty -->
              <div v-if="searchQuery === ''">
                <p class="dark:text-slate-200">Your searchfield is empty.</p>
              </div>
              <div v-else-if="users">
                <!-- show users found -->
                <div
                  class="grid grid-cols-7 gap-4 dark:text-white"
                  v-for="user in users"
                >
                  <!-- avatar -->
                  <div class="w-10">
                    <img :src="user.avatar_url" class="h-10 rounded-full" />
                  </div>
                  <!-- username -->
                  <div class="col-span-4">
                    <p class="text-lg font-bold">@{{ user.login }}</p>
                  </div>
                  <!-- select button -->
                  <div class="w-20">
                    <button
                      class="btn btn-sm border-0 hover:border-0"
                      @click="selectUser(user)"
                    >
                      select
                    </button>
                  </div>
                </div>
              </div>
              <div v-else>
                <!-- no user found -->
                <p class="dark:text-slate-200">
                  No users found with name "{{ searchQuery }}"
                </p>
              </div>
              <!-- {{ users ? users.login : "User not found" }} -->
            </div>
          </div>
        </div>
        <div class="">
          <button
            class="btn border-0 btn-sm dark:text-slate-500 float-right hover:border-0 pt-5"
            @click="closeDialog()"
          >
            <p class="text-sm">Close</p>
          </button>
        </div>
      </form>
    </dialog>

    <!-- <pre>{{ searchStore.selectedUser }}</pre> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();
const users = ref([]);
//refs
const searchQuery = ref("");
const loading = ref(true);

//funksjoner

const search = async () => {
  if (searchQuery.value !== "") {
    const response = await userStore.searchAllUsers(searchQuery.value);
    const responseData = await response.json(); // Extract the JSON data from the response
    const result = responseData.items; // Extract the user data from the response JSON
    users.value = result;
  } else {
    console.log("Empty search field");
  }
};

const closeDialog = () => {
  // console.log("close");
};
const selectUser = (user) => {
  // console.log("selected user:", user.login);
  userStore.$patch({ selectedUser: user });
  userStore.$patch({ showUser: true });
  userStore.selectSingleUser(user.login);
};
</script>
