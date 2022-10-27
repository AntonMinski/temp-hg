<template>
    <div class="flex flex-col min-h-screen text-gray-700 dark:text-white bg-white dark:bg-gray-800 pt-[4.5rem]">
        <Header />

        <main class="flex-1">
            <slot />
        </main>

    </div>
</template>

<script>

export default {
    name: 'DefaultLayout',

}
</script>
