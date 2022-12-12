// this store created for @auth-alt/http module usage. For Authentication logic see auth module
import { defineStore } from 'pinia';

export const useAuthModuleStore = defineStore('authModule', {
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    user(state) {
      return state.user;
    },
  },
});
