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
            <router-link to="/">
              <img class="lg:block h-8 w-auto " src="/src/assets/kamyroll_logo.svg" alt="Kamyroll">
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
             <router-link to="/search" id="search-button-disclosed" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Recherche
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="inRightPlace">
          <Channel></Channel>
        </div>
        <div v-else>
          <v-btn id="back-button" @click="this.$router.go(-1)">Back</v-btn>
        </div>
        
      </div>
      
    </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link to="/search"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Recherche</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      inRightPlace: false,
    }
  },
  mounted: async function () {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
  },
  beforeRouteEnter : function (to, from, next) {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
    next();
  },
  beforeRouteUpdate : function (to, from, next) {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
    next();
  },
}
</script>

<style scoped>
#navbar{
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px;
}

</style>