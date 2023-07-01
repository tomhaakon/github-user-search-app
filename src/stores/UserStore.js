import { defineStore } from "pinia";

const Token = import.meta.env.VITE_TOKEN;

export const useUserStore = defineStore("user", {
  state: () => ({
    profileViews: 0,
    firstProfile: true,
    showUser: false,
    searchResult: null,
    selectUser: null,
    userNotFound: false,
    emptySearchField: false,
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
      if (query) {
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

          if (query && users.length > 0) {
            let i = 0;
            for (let user of users) {
              if (i >= 5) break;
              this.users.push(user);
              i++;
            }
            this.searchResult = this.users;
          } else {
            this.userNotFound = true;
            setTimeout(() => {
              this.userNotFound = false;
            }, 2000);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        this.emptySearchField = true;
        setTimeout(() => {
          this.emptySearchField = false;
        }, 2000);
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

        this.selectUser = response;
        this.showUser = true;

        if (this.profileViews > 0) {
          if (this.profileViews >= 10) {
            this.profileViews = 1;
          }
          this.firstProfile = false;
        } else {
          this.firstProfile = true;
        }
        this.profileViews++;
     
      } catch (error) {
        console.error(error);
      }
    },
  },

  getters: {},
});
