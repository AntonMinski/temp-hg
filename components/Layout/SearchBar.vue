<template>
  <div class="fixed top-[4.74rem] z-20 w-full bg-tertiary-500 p-[11px]">
    <UIContainer>
      <div class="ml-auto flex max-w-5xl items-center">
        <UIInput
          id="searchField"
          v-model="searchField"
          name="searchField"
          placeholder="What are you looking for?"
          class="w-full !border-0 bg-transparent text-xl font-semibold text-white placeholder-tertiary-400 focus:!border-transparent focus:!ring-transparent">
          <template #prefix>
            <UIIcon icon="icon-search" class="text-base text-white" />
          </template>
          <template #suffix>
            <UIIcon v-if="searchField.length" class="mr-1" icon="icon-cancel-f" @click.stop="searchField = ''" />
          </template>
        </UIInput>
        <div class="ml-5 h-[30px] w-px bg-white" />
        <div class="flex w-[400px] justify-between">
          <UIDropdown text="Everything" class="bg-transparent">
            <template #trigger>
              <UIButton
                class="w-full justify-between bg-transparent text-white"
                prop-span-classes="truncate !block"
                size="md">
                {{ selectedOption }}
                <template #suffix>
                  <UIIcon icon="icon-arrow-down" />
                </template>
              </UIButton>
            </template>
            <UIListGroup>
              <UIListGroupItem
                v-for="(item, key) in options"
                :key="key"
                class="border-none"
                @click="handleOptionChange(item.label)">
                <span class="mt-0.5">{{ item.label }}</span>
              </UIListGroupItem>
            </UIListGroup>
          </UIDropdown>

          <UIButton @click="searchStore.setIsSearchOpen(false)">
            <UIIcon icon="icon-close" class="text-base text-white"></UIIcon>
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useSearchStore } from '~/store/search';
const searchStore = useSearchStore();
const options = [
  {
    label: 'Everything',
  },
  {
    label: 'Haggadahs',
  },
  {
    label: 'Clips',
  },
  {
    label: 'Events',
  },
  {
    label: 'Helpcenter',
  },
  {
    label: 'Other',
  },
];
const searchField: Ref<string> = ref('');
const selectedOption: Ref<string> = ref('Everything');

const handleOptionChange = (option: string) => {
  selectedOption.value = option;
};
</script>
