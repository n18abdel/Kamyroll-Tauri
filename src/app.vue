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

<script>
export default {
  methods: {
    generateNewToken(){
      localStorage.clear();
    }
  },
  mounted : function (){
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 't') {
        this.generateNewToken();
      }
    });
  }
}
</script>


<style>

#app > div {
  background-color: #1b1a26;
}


</style>
