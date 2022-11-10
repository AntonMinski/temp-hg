import { useAuthModuleStore } from '~/store/authModule';
import { navigateTo, useNuxtApp } from '#app';

export async function redirectLogin(): Promise<boolean | void> {
  const { $pinia } = useNuxtApp();
  const { loggedIn } = useAuthModuleStore($pinia);
  if (!loggedIn) {
    await navigateTo('/login');
    return true;
  }
}
