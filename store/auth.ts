import type { Ref } from 'vue';

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
