import type { Ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const userEmail: Ref<string> = ref('');

  function setUserEmail(email: string): void {
    userEmail.value = email;
  }

  return {
    userEmail,
    setUserEmail,
  };
});
