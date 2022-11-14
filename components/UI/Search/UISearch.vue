<template>
  <div v-bind="$attrs" class='pl-5.5'>
    <UIInput
      v-model="searchString"
      name="searchField"
      id="searchField"
      :placeholder="placeholder"
      :class="inputClasses" >
      <template #suffix>
        <UIButton gradient="gradient1" :class="buttonClasses" square pill @click="search">
          <UIIcon icon="icon-search" :class="iconClasses" />
        </UIButton>
      </template>
    </UIInput>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useForm } from 'vee-validate';
import type { size } from './types'
import { useSearchClasses } from '~/components/UI/Search/composables/useSearchClasses';


import { useAuthModuleStore } from '~/store/authModule';
const { loggedIn } = useAuthModuleStore();
const props = defineProps({
  redirectAddress: {
    type: String,
    default: '',
  },
  queryKey: {
    type: String,
    required: true,
  },
    rules: {
    type: String,
    default: 'required',
  },
  placeholder: {
    type: String,
    default: 'Search',
  },
  size: {
    type: String as PropType<size>,
    default: 'default',
  },
});
const { inputClasses, buttonClasses, iconClasses } = useSearchClasses(toRefs(props));

const email = ref('');
const { handleSubmit, errors } = useForm({
  validationSchema: {
    searchField: props.rules,
  },
});

const searchString = ref('');

// Search function
const search = handleSubmit(async (): Promise<void> => {
  const query = {};
  query[props.queryKey] = searchString.value;

  await navigateTo({
    path: props.redirectAddress,
    query,
  });
});

// Enter key press
const element = ref<HTMLDivElement>();

onMounted(async () => {
  element.value = document.getElementById('searchField') as HTMLDivElement;
});
useEventListener(element, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    search();
  }
});
</script>
<style scoped></style>
