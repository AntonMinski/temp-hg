import { useAuthModuleStore } from '~/store/authModule';
import { navigateTo, useNuxtApp } from '#app';

export function loginModal(): boolean | void {
  const { $pinia } = useNuxtApp();
  const { loggedIn } = useAuthModuleStore($pinia);
  if (!loggedIn) {
    // show modal logic
    return true;
  }
}
