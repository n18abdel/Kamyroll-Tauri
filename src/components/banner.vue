<script setup>
import Channel from './channelid.vue';
</script>
<template>
  <nav>
    <div class="erc-header">
    <div class="max-w-8xl">
      <div class="relative flex items-center justify-between h-16">
        <div id="navbar" class="flex-1 flex">
          <div class="flex-none flex items-center">
            <a href='#'>
              <img class="lg:block h-8 w-auto " src="/src/assets/kamyroll_logo.svg" alt="Kamyroll">
            </a>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a href="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
              <a href="/search"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Recherche</a>
            </div>
          </div>
        </div>
        <Channel></Channel>
      </div>
      
    </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
        <a href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Recherche</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#navbar{
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px;
}
</style>