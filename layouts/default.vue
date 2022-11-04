<template>
  <div class="flex min-h-screen flex-col bg-white pt-[4.5rem] text-gray-700 dark:bg-gray-800 dark:text-white">
    <Header />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
