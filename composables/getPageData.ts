import { createError, useAsyncData, useNuxtApp } from '#app';
import { usePageStore } from '~/store/page';

export async function getPageDataComposable(route: string) {
  const { $pinia } = useNuxtApp();
  const { getPageData } = usePageStore($pinia);

  const { data, error } = await useAsyncData('page', () => getPageData(route));
  // case wrong slug, 404 error
  if (error.value?.status === 404) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }
}
