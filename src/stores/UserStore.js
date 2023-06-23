import { defineStore } from "pinia";
import axios from "axios";

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
        let allUsers = [];

        while (true) {
          const response = await axios.get(
            "https://api.github.com/users?per_page=100&page=${page}",
            {
              headers: {
                Authorization:
                  "Bearer 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",
              },
            }
          );
          const users = response.data;
          allUsers = allUsers.concat(users);

          if (users.length < 100) {
            // Reached the last page
            break;
          }

          page++;
        }

        this.users = allUsers;
      } catch (error) {
        console.error(error);
      }
    },

    // user select
    selectUser(user) {
      this.selectedUser = user;
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
  },
  getters: {
    getSelectedUser() {
      return this.selectedUser;
    },
  },
});
