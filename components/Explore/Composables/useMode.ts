import { useRoute } from '#app';
import { Mode } from '~/components/Explore/types';

export function useMode(): Mode {
  const route = useRoute();

  if (route.query.key) {
    return 'keyword';
  } else if (
    route.query['media_type[]'] ||
    route.query['parent_category[]'] ||
    route.query['children_category[]'] ||
    route.query['haggadah_section[]'] ||
    route.query.topic
  ) {
    return 'topics';
  } else if (route.query.contributor) {
    return 'contributor';
  } else {
    return 'main';
  }
}
