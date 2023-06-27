import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const Token = import.meta.env.VITE_TOKEN;

export const useUserStore = defineStore("user", {
  state: () => ({
    showUser: false,
    searchResult: [],
    selectUser: [],
    userNotFound: false,
    users: [],
  }),

  actions: {
    async searchAllUsers(query) {
      try {
        const apiCall = await fetch(
          "https://api.github.com/search/users?q=" +
            query +
            "&page,per_page,sort,order",
          {
            headers: {
              Authorization: `${Token}`,
            },
          }
        );
        const response = await apiCall.json();
        const users = response.items;
        this.showUser = false;
        this.users = [];
        console.log("1.query:", query);
        console.log("2.users:", users);
        // if something is searched
        if (query) {
          console.log("3.searching ");
          // look for users close to query
          let i = 0;
          for (let user of users) {
            if (i >= 5) break;
            this.users.push(user);
            i++;
          }
          // filter to 5 first users found
          this.searchResult = this.users;
          console.log("found", i, "users: ", this.users);
        }
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
        localStorage.setItem("userprofile", JSON.stringify(response));

        this.selectUser = response;
        console.log("heihehei", response);

        this.showUser = true;
      } catch (error) {
        console.log("piss");
        console.error(error);
      }
    },
  },
  getters: {
    piss() {
      return this.selectUser;
    },
  },
});
