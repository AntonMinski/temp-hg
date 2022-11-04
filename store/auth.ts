import { ref } from 'vue';
import { useNuxtApp } from '#app';
import type { loginResponse, registerResponse, logoutResponse, errorResponse } from '~/store/types/response';

export const useAuthStore = defineStore('auth', () => {
    const { $auth } = useNuxtApp();

    // State
    // const token = ref([]);

    // Actions
    async function login(email: String, password: String): Promise<loginResponse | errorResponse> {
        // login logic
        try {
            const response: loginResponse = await $auth.loginWith('local', { body: { email, password } });
            if (response.success) return response;
            else throw new Error(response.message);
        } catch (err) {
            return err;
        }
    }

    async function register(
        email: String,
        password: String,
        password_confirmation: String
    ): Promise<registerResponse | errorResponse> {
        try {
            const response: registerResponse = await $http.post('/register', {
                body: {
                    email,
                    password,
                    password_confirmation,
                },
            });
            if (response.success) return response;
            else throw new Error(response.message);
        } catch (err) {
            return err;
        }
    }

    async function logout(): Promise<logoutResponse | errorResponse> {
        try {
            const response = await $http.post('/logout');
            return response;
        } catch (err) {
            return err;
        }
    }

    async function getDashboard<T>(slug: String): Promise<T> {
        try {
            const { data } = await $http.get(`/dashboard/${slug}`);
            return data;
        } catch (err) {
            return err;
        }
    }

    async function getProfile<T>(slug: String): Promise<T> {
        try {
            const { data } = await $http.get(`/profile/${slug}`);
            return data;
        } catch (err) {
            return err;
        }
    }

    async function editProfile<T>(slug: String, profileData): Promise<T> {
        try {
            const { data } = await $http.patch(`/profile/${slug}`, { body: profileData });
            return data;
        } catch (err) {
            return err;
        }
    }

    return {
        login,
        register,
        logout,
        getDashboard,
        getProfile,
        editProfile,
    };
});
