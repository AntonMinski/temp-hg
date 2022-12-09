<template>
  <div class="h-screen bg-secondary-500">
    <AuthRegister type="redirect" />
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';

definePageMeta({ layout: 'auth' });
</script>
