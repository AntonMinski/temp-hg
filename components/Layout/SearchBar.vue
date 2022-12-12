<template>
  <div class="fixed top-[4.74rem] z-20 w-full bg-tertiary-500 p-[11px]">
    <UIContainer>
      <div class="ml-auto flex max-w-5xl items-center">
        <UIInput
          id="field"
          v-model="searchField"
          name="field"
          placeholder="What are you looking for?"
          class="w-3/5 !border-0 bg-transparent text-xl font-semibold text-white placeholder-tertiary-400 focus:!border-transparent focus:!ring-transparent">
          <template #prefix>
            <UISpinner v-if="loading" />
            <UIIcon v-else icon="icon-search" class="z-10 text-base text-white" @click.stop="search" />
          </template>
          <template #suffix>
            <UIIcon v-if="searchField.length" class="mr-1" icon="icon-cancel-f" @click.stop="searchField = ''" />
          </template>
        </UIInput>
        <div class="ml-5 h-[30px] w-px bg-white" />
        <div class="flex w-2/5 justify-between">
          <div class="flex items-center justify-start">
            <UIDropdown text="Everything" class="bg-transparent">
              <template #trigger>
                <UIButton
                  class="w-full justify-between bg-transparent text-white"
                  prop-span-classes="truncate !block"
                  size="md">
                  <UISpinner v-if="loading" />
                  <template v-else>
                    {{ selectedOption.name }}
                  </template>
                  <template #suffix>
                    <UIIcon icon="icon-arrow-down" />
                  </template>
                </UIButton>
              </template>
              <UIListGroup>
                <UIListGroupItem
                  v-for="item in options"
                  :key="item.handle"
                  class="border-none"
                  @click="handleOptionChange(item)">
                  <span class="mt-0.5">{{ item.name }}</span>
                </UIListGroupItem>
              </UIListGroup>
            </UIDropdown>
            <UIButton gradient="gradient1" @click="search" size="sm" class="ml-4 px-4" :disabled="!!errors.field"
              >Search</UIButton
            >
          </div>

          <UIButton @click="searchStore.setIsSearchOpen(false)">
            <UIIcon icon="icon-close" class="text-base text-white"></UIIcon>
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';
import { useSearchStore } from '~/store/search';
import type { RouteQuery, Tag } from '~/components/Search/types';
import { navigateTo, useRouter } from '#app';
import { useEventListener } from '@vueuse/core';
import { useForm } from 'vee-validate';
const searchStore = useSearchStore();
const router = useRouter();

const loading = ref(true);
const options: Tag[] = searchStore.tags;
const selectedOption: ComputedRef<Tag> = computed(() => searchStore.selectedTag);
const handleOptionChange = (option: Tag) => {
  searchStore.setSelectedTag(option);
};
const searchField: Ref<string> = ref(searchStore.searchTerm);
onMounted(() => {
  loading.value = false;
});

// Initial values
const initialValue = {
  field: searchStore.searchTerm,
};

const { handleSubmit, errors, useFieldModel } = useForm({
  validationSchema: {
    field: 'required|min:3',
  },
  initialValues: initialValue,
});

const search = handleSubmit(async (): Promise<void> => {
  await router.push({
    name: 'search-results',
    query: {
      key: searchField.value,
      type: selectedOption.value.handle || null,
    } as RouteQuery,
  });
  searchStore.emitSearch(searchField.value, selectedOption.value);
});

onMounted(async () => {
  const element = document.getElementById('field') as HTMLDivElement;
  useEventListener(element, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  });
});
</script>
