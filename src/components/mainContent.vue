<template>
  <!-- section for search -->
  <section v-if="!userStore.showUser">
    <!-- search result -->
    <div v-if="userStore.searchResult" class="dark:text-white">
      <div
        v-for="userSearch in userStore.searchResult"
        @click="userStore.selectSingleUser(userSearch.login)"
        class="dark:text-white font-mono flex dark:bg-[#1E2A47] bg-white mx-7 rounded-xl pr-5 mb-2 cursor-pointer"
      >
        <div class="w-14">
          <img :src="userSearch.avatar_url" class="rounded-full h-10" />
        </div>
        <div class="text-left pt-2">{{ userSearch.login }}</div>
      </div>
    </div>

    <!-- if nothing is searched for -->
  </section>

  <!-- section for showing profile  -->
  <section v-if="userStore.showUser">
    <div
      class="dark:bg-[#1E2A47] bg-white mx-7 rounded-2xl px-5 shadow-lg dark:shadow-none sm:px-12 sm:pt-4"
    >
      <!-- back button -->
      <div class="h-6 text-right font-mono">
        <button
          v-if="!userStore.firstProfile"
          class="text-slate-600 text-xs tracking-widest mt-3 sm:mt-0"
          @click="userStore.showUser = !userStore.showUser"
        >
          back
        </button>
      </div>

      <div class="flex">
        <div class="w-1/4">
          <!-- logo -->
          <img
            :src="userStore.selectUser.avatar_url"
            class="w-20 sm:w-28 rounded-full"
          />
        </div>
        <div class="w-full flex">
          <div class="sm:flex sm:flex-wrap w-full pl-5 sm:pb-10">
            <div class="flex w-full">
              <div class="sm:w-3/5 w-full sm:pb-2">
                <p
                  class="dark:text-slate-200 text-lg tracking-5 font-mono sm:text- sm:font-extrabold sm:w-full"
                >
                  {{
                    userStore.selectUser.name
                      ? userStore.selectUser.name
                      : userStore.selectUser.login
                  }}
                </p>

                <a
                  :href="'https://github.com/' + userStore.selectUser.login"
                  target="_blank"
                  class="text-[#0079FF] text-xs sm:text-lg font-mono tracking-widest xs:font-extralight"
                >
                  @{{ userStore.selectUser.login }}</a
                >
              </div>
              <div class="w-2/5 hidden sm:block">
                <p
                  class="dark:text-slate-300 text-xs font-thin font-mono text-slate-400 mt-2"
                >
                  joined {{ formatJoinedDate(userStore.selectUser.created_at) }}
                </p>
              </div>
            </div>

            <p class="hidden sm:block font-mono dark:text-white">
              {{
                userStore.selectUser.bio
                  ? userStore.selectUser.bio
                  : "This profile has no bio."
              }}
            </p>

            <!-- joined date for mobile -->
            <div class="">
              <p
                class="sm:hidden dark:text-white text-xs font-thin font-mono text-slate-400 text-left pt-2"
              >
                joined {{ formatJoinedDate(userStore.selectUser.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="font-mono dark:text-white font-thin sm:hidden py-8">
          {{
            userStore.selectUser.bio
              ? userStore.selectUser.bio
              : "This profile has no bio."
          }}
        </p>
      </div>
      <div class="flex">
        <div class="w-1/5 hidden sm:block"></div>
        <div class="w-full sm:w-4/5 sm:block">
          <div
            class="dark:text-slate-400 font-mono text-sm tracking-wide dark:bg-[#141D2F] rounded-xl pt-5 pb-5 grid grid-cols-3 gap-2 text-center bg-[#F6F8FF] col-span-4 sm:col-start-2"
          >
            <!-- headers -->
            <div class="text-xs">Repos</div>
            <div class="text-xs">Followers</div>
            <div class="text-xs">Following</div>
            <!-- stat -->
            <div class="text-xl tracking-wider dark:text-white font-bold">
              {{ userStore.selectUser.public_repos }}
            </div>
            <div class="text-xl tracking-wider dark:text-white font-bold">
              {{ userStore.selectUser.followers }}
            </div>
            <div class="text-xl tracking-wider dark:text-white font-bold">
              {{ userStore.selectUser.following }}
            </div>
          </div>
          <div
            class="dark:text-white font-mono mt-5 sm:mt-10 grid grid-cols-1 gap-2 pl-3 sm:flex sm:flex-wrap col-span-4 sm:col-start-2 sm:pb-8"
          >
            <div class="inline-flex">
              <div class="w-3">
                <svg
                  height="20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{
                    ' fill-[#697C9A] dark:fill-white':
                      userStore.selectUser.location,
                    'fill-gray-300  dark:fill-slate-500':
                      !userStore.selectUser.location,
                  }"
                >
                  <path
                    d="M12.797 3.425C11.584 1.33 9.427.05 7.03.002a7.483 7.483 0 00-.308 0C4.325.05 2.17 1.33.955 3.425a6.963 6.963 0 00-.09 6.88l4.959 9.077.007.012c.218.38.609.606 1.045.606.437 0 .828-.226 1.046-.606l.007-.012 4.96-9.077a6.963 6.963 0 00-.092-6.88zm-5.92 5.638c-1.552 0-2.813-1.262-2.813-2.813s1.261-2.812 2.812-2.812S9.69 4.699 9.69 6.25 8.427 9.063 6.876 9.063z"
                  />
                </svg>
              </div>
              <div class="px-5 pb-2 text-sm">
                <!-- location -->
                <p v-if="userStore.selectUser.location">
                  {{ userStore.selectUser.location }}
                </p>
                <p v-else class="text-gray-300 dark:text-slate-500">
                  Not Available.
                </p>
              </div>
            </div>
            <div class="inline-flex">
              <div class="w-3">
                <svg
                  height="18"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{
                    ' fill-[#697C9A] dark:fill-white':
                      userStore.selectUser.twitter_username,
                    'fill-gray-300 dark:fill-slate-500':
                      !userStore.selectUser.twitter_username,
                  }"
                >
                  <path
                    d="M20 2.799a8.549 8.549 0 01-2.363.647 4.077 4.077 0 001.804-2.266 8.194 8.194 0 01-2.6.993A4.099 4.099 0 009.75 4.977c0 .324.027.637.095.934-3.409-.166-6.425-1.8-8.452-4.288a4.128 4.128 0 00-.56 2.072c0 1.42.73 2.679 1.82 3.408A4.05 4.05 0 01.8 6.598v.045a4.119 4.119 0 003.285 4.028 4.092 4.092 0 01-1.075.135c-.263 0-.528-.015-.776-.07.531 1.624 2.038 2.818 3.831 2.857A8.239 8.239 0 01.981 15.34 7.68 7.68 0 010 15.285a11.543 11.543 0 006.29 1.84c7.545 0 11.67-6.25 11.67-11.667 0-.182-.006-.357-.015-.53A8.18 8.18 0 0020 2.798z"
                  />
                </svg>
              </div>
              <div class="px-5 text-sm pb-2">
                <!-- twitter url-->
                <a
                  v-if="userStore.selectUser.twitter_username"
                  target="_blank"
                  :href="
                    'https://twitter.com/' +
                    userStore.selectUser.twitter_username
                  "
                  class="hover:underline"
                >
                  {{ userStore.selectUser.twitter_username }}
                </a>
                <p
                  v-if="!userStore.selectUser.twitter_username"
                  class="text-gray-300 dark:text-slate-500"
                >
                  Not Available.
                </p>
              </div>
            </div>
            <!-- homepage -->
            <div class="inline-flex">
              <div class="w-3 pb-2">
                <svg
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{
                    ' fill-[#697C9A] dark:fill-white':
                      userStore.selectUser.blog,
                    'fill-gray-300 dark:fill-slate-500':
                      !userStore.selectUser.blog,
                  }"
                >
                  <path
                    d="M7.404 5.012c-2.355 2.437-1.841 6.482.857 8.273.089.06.207.048.283-.027.568-.555 1.049-1.093 1.47-1.776a.213.213 0 00-.084-.3A2.743 2.743 0 018.878 10.1a2.64 2.64 0 01-.223-1.803c.168-.815 1.043-1.573 1.711-2.274l-.004-.002 2.504-2.555a2.568 2.568 0 013.648-.019 2.6 2.6 0 01.037 3.666l-1.517 1.56a.266.266 0 00-.06.273c.35 1.012.435 2.44.201 3.519-.006.03.031.05.053.028l3.228-3.295c2.062-2.105 2.044-5.531-.04-7.615a5.416 5.416 0 00-7.691.04L7.417 4.998l-.013.014z"
                  />
                  <path
                    d="M13.439 13.75a.401.401 0 00.006-.003c.659-1.204.788-2.586.48-3.933l-.002.002-.001-.001a5.434 5.434 0 00-2.19-3.124.3.3 0 00-.333.015c-.553.448-1.095 1.021-1.452 1.754a.243.243 0 00.096.317c.415.24.79.593 1.04 1.061h.001c.196.33.388.958.263 1.632-.116.894-1.019 1.714-1.736 2.453-.546.559-1.935 1.974-2.49 2.542a2.6 2.6 0 01-3.666.037 2.6 2.6 0 01-.038-3.666l1.521-1.564A.266.266 0 005 11.004c-.338-1.036-.43-2.432-.217-3.51.006-.03-.031-.049-.053-.027l-3.179 3.245c-2.083 2.126-2.066 5.588.04 7.693 2.125 2.083 5.57 2.048 7.653-.078.723-.81 3.821-3.678 4.195-4.577z"
                  />
                </svg>
              </div>
              <div class="px-5 text-sm overflow-hidden">
                <a
                  v-if="userStore.selectUser"
                  :href="userStore.selectUser.blog"
                  class="hover:underline"
                  target="_blank"
                  >{{ userStore.selectUser.blog }}</a
                >
                <p
                  v-if="!userStore.selectUser.blog"
                  class="text-gray-300 dark:text-slate-500"
                >
                  Not Available.
                </p>
              </div>
            </div>
            <!-- company icon -->
            <div class="inline-flex">
              <div class="w-3 h-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4"
                  :class="{
                    ' fill-[#697C9A] dark:fill-white':
                      userStore.selectUser.company,
                    'fill-gray-300 dark:fill-slate-500':
                      !userStore.selectUser.company,
                  }"
                >
                  <path
                    d="M10.858 1.558L1.7.167A1.477 1.477 0 00.517.492 1.49 1.49 0 000 1.608v17.559c0 .458.375.833.833.833h2.709v-4.375c0-.808.65-1.458 1.458-1.458h2.083c.809 0 1.459.65 1.459 1.458V20h3.541V3a1.46 1.46 0 00-1.225-1.442zM4.583 12.292h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm4.167 7.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zM18.85 9.035l-5.933-1.242V20h5.625A1.46 1.46 0 0020 18.542V10.46c0-.688-.47-1.274-1.15-1.425zM16.875 17.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25z"
                  />
                </svg>
              </div>
              <div class="pb-2 px-5 text-sm overflow-hidden">
                <!-- company -->
                <p v-if="userStore.selectUser.company" class="">
                  <a
                    v-for="link in convertToLink(userStore.selectUser.company)"
                    :href="'https://github.com/' + link"
                    class="hover:underline"
                  >
                    @{{ link }}
                  </a>
                </p>
                <p
                  v-if="!userStore.selectUser.company"
                  class="text-gray-300 dark:text-slate-500"
                >
                  Not Available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- del2: bio -->
      <div
        class="dark:text-white text-sm tracking-wide font-mono dark:bg-inherit pb-5 rounded-lg sm:grid sm:grid-cols-4 sm:py-0"
      >
  
      </div>
    </div>
  </section>
</template>
<script setup>
//import
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();

// setting for firstprofile
if (userStore.firstProfile) {
  userStore.selectSingleUser("Octocat");
}

// convert link
const convertToLink = (string) => {
  const linkTags = string.split(", ").map((tag) => tag.replace("@", ""));
  linkTags.forEach((entry) => {});
  return linkTags;
};
// format date
const formatJoinedDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en", { day: "2-digit" });
  const month = date.toLocaleDateString("en", { month: "short" });
  const year = date.toLocaleDateString("en", { year: "numeric" });
  return `${day} ${month} ${year}`;
};
</script>
