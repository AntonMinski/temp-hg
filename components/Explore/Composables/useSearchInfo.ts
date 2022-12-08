import { computed } from 'vue';

export function useSearchInfo(state) {
  let headingParts = [];

  if (state?.contributorName) {
    headingParts.push({ key: 'By Contributor: ', value: state?.contributorName });
  }

  if (state?.searchKeywordDisplay) {
    headingParts.push({ key: 'For search keyword ', value: state?.searchKeywordDisplay });
  }
  if (state?.selectedHaggadahSections?.length) {
    headingParts.push({ key: 'Haggadah section: ', value: state?.selectedHaggadahSections?.join(', ') });
  }
  if (state?.selectedCategories?.length) {
    headingParts.push({ key: 'Categories: ', value: state?.selectedCategories?.join(', ') });
  }
  if (state?.selectedChildCategories?.length) {
    headingParts.push({ key: 'Subcategories: ', value: state?.selectedChildCategories?.join(', ') });
  }
  if (state?.selectedMediaTypes?.length) {
    headingParts.push({ key: 'Media Types: ', value: state?.selectedMediaTypes?.join(', ') });
  }

  headingParts = headingParts
    .map((part, index) => {
      if (index !== 0) {
        part.key = ` / ${part.key}`;
      }
      return part;
    })
    .filter((part) => part.value);

  const totalHeadingLength = computed(() => {
    return headingParts?.reduce((acc, part) => acc + part.key?.length + part.value?.length, 0);
  });

  const headingLevel = (() => {
    if (totalHeadingLength.value > 100) {
      return 6;
    } else if (totalHeadingLength.value > 70) {
      return 5;
    } else if (totalHeadingLength.value > 60) {
      return 4;
    } else if (totalHeadingLength.value > 40) {
      return 3;
    } else return 2;
  })();

  return { headingParts, headingLevel };
}
