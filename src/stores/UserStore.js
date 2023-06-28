import { defineStore } from "pinia";

const Token = import.meta.env.VITE_TOKEN;

export const useUserStore = defineStore("user", {
  state: () => ({
    showUser: false,
    searchResult: [],
    selectUser: [],
    userNotFound: false,
    users: [],
    gitHubData: [
      {
        login: "octocat",
        id: 583231,
        node_id: "MDQ6VXNlcjU4MzIzMQ==",
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url:
          "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: false,
        name: "The Octocat",
        company: "@github",
        blog: "https://github.blog",
        location: "San Francisco",
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 8,
        public_gists: 8,
        followers: 9636,
        following: 9,
        created_at: "2011-01-25T18:44:36Z",
        updated_at: "2023-06-22T11:15:59Z",
      },
    ],
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

        if (query) {
          let i = 0;
          for (let user of users) {
            if (i >= 5) break;
            this.users.push(user);
            i++;
          }
          this.searchResult = this.users;
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
        //const response = await apiCall.json();

        // let data = JSON.parse(response);
        //  this.selectUser = data;
        this.showUser = true;
      } catch (error) {
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
