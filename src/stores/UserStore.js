import { defineStore } from "pinia";
import axios from "axios";
import { TOKEN } from "./config.js";
import { useBreakpoints } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    selectedUser: null,
    showUser: false,
  }),

  actions: {
    // async fetchUsers() {
    //   try {
    //     const response = await axios.get("https://api.github.com/users");
    //     this.users = response.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async searchAllUsers() {
      try {
        let page = 1;
        const perPage = 2;
        let allUserLogins = [];

        while (true) {
          console.log(`Loading users - Page ${page}`);
          const response = await axios.get("https://api.github.com/users", {
            headers: {
              Authorization: TOKEN,
            },
            params: {
              per_page: perPage,
              page: page,
            },
          });

          const users = response.data;

          if (users.length === 0) {
            // No more users, break the loop
            console.log("All users loaded");
            break;
          }

          const userLogins = users.map((user) => user.login);
          allUserLogins = allUserLogins.concat(userLogins);
          this.users = allUserLogins;
          console.log(userLogins);
          break;
          page++;
        }
      } catch (error) {
        console.error(error);
      }
    },

    // user select
    selectUser(user) {
      this.selectedUser = user;
    },

    async fetchSingleUser() {
      try {
        // console.log("fetch single user:", this.selectedUser);
        const response = await axios.get(
          "https://api.github.com/users/" + this.selectedUser
        );
        this.selectedUser = response.data;

        // console.log("showUser?:", this.showUser);
        // console.log("SearchStore-selectedUser:", this.selectedUser);
      } catch (error) {
        console.error(error);
      }
    },
    // format date
    formatJoinedDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      return formattedDate.replace(/\//g, ".");
    },
  },
  getters: {
    getSelectedUser() {
      return this.selectedUser;
    },
  },
});
