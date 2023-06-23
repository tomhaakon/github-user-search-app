import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    selectedUser: null,
    showUser: false,
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
    selectUser(user) {
      this.selectedUser = user;
    },
    async fetchSingleUser() {
      try {
        console.log("fetch single user:", this.selectedUser);
        const response = await axios.get(
          "https://api.github.com/users/" + this.selectedUser
        );
        this.selectedUser = response.data;

        console.log("showUser?:", this.showUser);
        console.log("SearchStore-selectedUser:", this.selectedUser);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getSelectedUser() {
      return this.selectedUser;
    },
  },
});
