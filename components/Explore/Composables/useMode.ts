import { useRoute } from '#app';

export function useMode() {
  const route = useRoute();

  if (route.query.key) {
    return 'keyword';
  } else if (
    route.query['parent_category[]'] ||
    route.query['children_category[]'] ||
    route.query['haggadah_section[]']
  ) {
    return 'topics';
  } else {
    return 'main';
  }

  return route;
}






