<script setup>
import banner from './components/banner.vue'

</script>

<template>
  <v-app>
    <banner></banner>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style>

#app > div {
  background-color: #1b1a26;
}


</style>