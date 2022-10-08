<script setup>
import banner from './components/banner.vue'

</script>

<template>
  <banner></banner>
  <v-app>
    <v-main>
       <router-view/>
    </v-main>
  </v-app>
</template>


<style>

#app > div {
  background-color: #1b1a26;
}


</style>
