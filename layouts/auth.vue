<template>
  <div class="flex min-h-screen flex-col pt-[4.5rem] text-gray-700 dark:bg-gray-800 dark:text-white">
    <LayoutHeader />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
