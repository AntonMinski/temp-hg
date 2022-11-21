const metaOptions = ['application-name', 'author', 'description', 'generator', 'keywords', 'viewport'];

export function getMetaObject(metaData) {
  const metaTags = Object.entries(metaData)
    .filter(([key, value]) => metaOptions.includes(key))
    .map((item) => {
      return {
        name: item[0] as string,
        content: item[1] as string,
      };
    });

  const openGraphTags = Object.entries(metaData)
    .filter(([key, value]) => key.startsWith('og:'))
    .map((item) => {
      return {
        property: item[0] as string,
        content: item[1] as string,
      };
    });

  return [...metaTags, ...openGraphTags];
}
