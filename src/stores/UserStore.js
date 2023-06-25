import { defineStore } from "pinia";
import { TOKEN } from "./config.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    selectedUser: null,
  }),

  actions: {
    async searchAllUsers(user) {
      try {
        const response = await fetch(
          "https://api.github.com/search/users?q=" +
            user +
            "&page,per_page,sort,order",
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );

        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async selectSingleUser(user) {
      return fetch("https://api.github.com/users/" + user, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("userstore,responsdata:", responseData);
          this.selectedUser = responseData;
        })
        .catch((error) => {
          console.error(error);
        });
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
  getters: {
    getSelectedUser() {
      return this.selectedUser;
    },
  },
});
