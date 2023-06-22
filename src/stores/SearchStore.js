import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("search", {
  state: () => ({
    users: [],
    selectedUser: [],
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get("https://api.github.com/users");
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    userCount(state) {
      return state.users.length;
    },
  },
});
