<script lang="ts" setup>

</script>

<template>
    <header>
        <nav class="bg-white py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
            <div class="container max-w-screen-xl px-4 flex flex-wrap justify-between items-center">
                <a href="https://flowbite.com/" class="flex items-center">
                    <img src="~/assets/svg/logo.svg" class="block dark:hidden mr-3 h-6 sm:h-9" alt="Haggadot Logo">
                    <img src="~/assets/svg/logo-light.svg" class="hidden dark:block mr-3 h-6 sm:h-9" alt="Haggadot Logo">
                </a>
                <div class="flex md:order-2">
                    <Button size="sm" color="link" class="mr-1">
                        <template #prefix>
                            <span class="icon-password font-normal text-base leading-none"></span>
                        </template>
                        Login
                    </Button>
                    <Button size="sm" color="secondary" class="mr-1">
                        Create Haggadah
                        <template #suffix>
                            <span class="icon-book-f text-base leading-none"></span>
                        </template>
                    </Button>
                    <Button size="sm" color="link">
                        <span class="icon-search text-lg leading-none"></span>
                    </Button>
                    <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <NavLink>Explore Haggadahs</NavLink>
                        <NavLink>Explore Clips</NavLink>
                        <NavLink>Events</NavLink>
                        <NavLink>Passover 101</NavLink>
                        <NavLink>
                            <span>Support us</span>
                            <img src="~/assets/svg/heart.svg" class="w-4 h-4">
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
