import { capitalizeFirstLetter } from '~/composables/capitalize';
import { loginModal } from '~/composables/loginModal';
import { useNuxtApp } from '#app';


export async function handleAddToBookmark(add: boolean, slug: string, apiRoute: apiRoute) {
  const { vueApp } = useNuxtApp();
  if (loginModal()) {
    return false;
  }

  const capApiRoute = capitalizeFirstLetter(apiRoute);

  try {
    if (add) {
      // add
      const { _data } = await vueApp.$api[`${apiRoute}`][`bookmark${capApiRoute}`](slug);
      if (_data?.status) {
        vueApp.$toast.success(`${capApiRoute} added to bookmarks`);
      }
    } else {
      // remove
      const { _data } = await vueApp.$api[`${apiRoute}`][`unBookmark${capApiRoute}`](slug);
      if (_data?.status) {
        vueApp.$toast.success(`${capApiRoute} removed from bookmarks`);
      }
    }
    return true;
  } catch (error) {
    throw error;
  }
}

type apiRoute = 'book' | 'clip';
