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
  <footer class="app-footer-wrapper">
    <div class="erc-footer">
       <div class="content">
          <div class="footer-copyright">
            <div class="copyright">{{version}} - Kamyroll</div>
          </div>
       </div>
    </div>
    
  </footer>
</template>

<script>
export default {
  data() {
    return {
      version : '',
    }
  },
  methods: {
    generateNewToken(){
      localStorage.clear();
    }
  },
  mounted : function (){
    this.version = 'v'+process.env.APP_VERSION.replaceAll('"','') + ' - ' + process.env.CHANNEL.replaceAll('"','');
    document.addEventListener('keydown', (event) => {
      // ctrl + t  || cmd + t => generate new token
      if (event.ctrlKey && event.key === 't' || event.metaKey && event.key === 't') {
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
