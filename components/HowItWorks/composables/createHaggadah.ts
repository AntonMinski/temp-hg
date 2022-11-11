import { useAuthModuleStore } from '~/store/authModule';
import { navigateTo, useNuxtApp } from '#app';

export async function createHaggadah(): Promise<void> {
  const { $pinia } = useNuxtApp();
  const { loggedIn } = useAuthModuleStore($pinia);
  if (loggedIn) {
    await navigateTo('/account/my-haggadahs/create');
  } else {
    await navigateTo('/login');
  }
}
