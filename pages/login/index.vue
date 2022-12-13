<template>
  <UIModal :open="true" size="sm" content-classes="!px-0 !py-0" @close="onCloseModal">
    <FormsLogin />
  </UIModal>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';

const router = useRouter();
const onCloseModal = () => {
  router.push('/');
};
</script>
