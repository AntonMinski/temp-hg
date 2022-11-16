import { capitalizeFirstLetter } from '~/composables/capitalize';

export async function handleAddToBookmark(
  add: boolean,
  slug: string,
  vueApp,
  apiRoute: apiRoute
): Promise<void | Error> {
  // TODO: if !loggedIn, show login modal

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
  } catch (error) {
    console.error(error);
  }
}

type apiRoute = 'book' | 'clip';
