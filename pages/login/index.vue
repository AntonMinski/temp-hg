<template>
  <div class="h-screen bg-tertiary-500">
    <AuthLogin type="redirect" />
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';

definePageMeta({ layout: 'auth' });
</script>
