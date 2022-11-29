<template>
  <div v-bind="$attrs" :class="inputClasses">
    <UIInput
      id="searchField"
      v-model="searchString"
      name="searchField"
      :placeholder="placeholder"
      :class="inputClasses">
      <template #suffix>
        <UIButton gradient="gradient1" :class="buttonClasses" square pill @click="search">
          <UIIcon icon="icon-search" :class="iconClasses" />
        </UIButton>
      </template>
    </UIInput>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, toRefs, onMounted } from 'vue';
import { useEventListener, useVModel } from '@vueuse/core';
import { useForm } from 'vee-validate';
import type { size } from './types';
import { useSearchClasses } from '~/components/UI/Search/composables/useSearchClasses';

import { useAuthModuleStore } from '~/store/authModule';
import { navigateTo, useRouter } from '#app';
import test from 'node:test';
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
  redirect: {
    type: Boolean,
    default: true
  },
  searchString: {
    type: String,
    default: ''
  }
});
const { inputClasses, buttonClasses, iconClasses } = useSearchClasses(toRefs(props));

const email = ref('');
const { handleSubmit, errors } = useForm({
  validationSchema: {
    searchField: props.rules,
  },
});
const emit = defineEmits(['search', 'update:searchString']);

const searchString = useVModel(props, 'searchString', emit);

// Search function
const search = handleSubmit(async (): Promise<void> => {
  const query = {};
  query[props.queryKey] = searchString.value;

  if (props.redirect) {
    await navigateTo({
      path: props.redirectAddress,
      query,
    });
  } else {
    const router = useRouter();
    await router.push({
      path: props.redirectAddress,
      query
    })
    emit('search', searchString.value);
  }
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
