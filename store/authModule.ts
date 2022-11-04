// this store created for @auth-alt/http module usage. For Authentication logic see auth module

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
