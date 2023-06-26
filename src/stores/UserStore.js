import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const Token = import.meta.env.VITE_TOKEN;

export const useUserStore = defineStore("user", {
  state: () => ({
    users: useStorage("git-users", []),
    selectedUser: useStorage("selected-user", null),
    selectingUser: useStorage("selecting-user", null),
  }),

  actions: {
    async searchAllUsers(user) {
      try {
        const apiCall = await fetch(
          "https://api.github.com/search/users?q=" +
            user +
            "&page,per_page,sort,order",
          {
            headers: {
              Authorization: `${Token}`,
            },
          }
        );
        this.users = await apiCall.json();
        console.log(" found users", this.users);
      } catch (error) {
        console.error(error);
      }
    },
    async selectSingleUser(user) {
      try {
        const apiCall = await fetch("https://api.github.com/users/" + user, {
          headers: {
            Authorization: `${Token}`,
          },
        });
        const response = await apiCall.json();
        this.selectingUser = response.login;
        console.log("velger", this.selectingUser);
      } catch (error) {
        console.error(error);
      }
    },
    // format date
    formatJoinedDate(dateString) {
      const date = new Date(dateString);
      const day = date.toLocaleDateString("en", { day: "2-digit" });
      const month = date.toLocaleDateString("en", { month: "short" });
      const year = date.toLocaleDateString("en", { year: "numeric" });
      return `${day} ${month} ${year}`;
    },
  },
  getters: {},
});
