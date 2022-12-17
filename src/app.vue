<script setup>
import banner from './components/banner.vue'

</script>

<template>
  <banner></banner>
  <v-app>
    <v-main>
       <router-view/>
    </v-main>
    <v-snackbar v-model="snackbar" :timeout="timeout" :bottom="true" :right="true">
      {{ text }}
    </v-snackbar>
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
 import { testToken, generateNewToken } from './scripts/token';
export default {
  data() {
    return {
      version: '',
      snackbar: false,
      text: '',
      timeout: 2000,
    }
  },
  methods: {
    generateNewToken() {
      localStorage.clear();
    }
  },
  mounted: async function () {
    let token_valid = localStorage.getItem('token_valid');
    let currentDate = Math.floor(new Date().getTime() / 1000);

    if (localStorage.getItem('miniProgressBar') == null) {
      localStorage.setItem('miniProgressBar', 'false');
    }
    if (Number(token_valid) < currentDate) {
      console.log('Testing the token validity');
      let result = await testToken(localStorage.getItem('token'));
      if (result == false) {
        console.log('Token is invalid, generating new token');
        this.text = 'Token is invalid, generating new token';
        if (this.snackbar = true) {
          this.snackbar = false;
        }
        this.snackbar = true;
        await generateNewToken();
        window.location.reload();
      } else {
        console.log('token is still valid, adding 6 hours to the token_valid date');
        this.text = 'token is still valid, adding 6 hours to the token_valid date';
        if (this.snackbar = true) {
          this.snackbar = false;
        }
        this.snackbar = true;
        let curDatePlusSix = new Date();
        curDatePlusSix.setHours(curDatePlusSix.getHours() + 6);
        curDatePlusSix = Math.floor(curDatePlusSix.getTime() / 1000);
        localStorage.setItem('token_valid', curDatePlusSix);
      }
    }
    this.version = 'v' + process.env.APP_VERSION.replaceAll('"', '') + ' - ' + process.env.CHANNEL.replaceAll('"', '');
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
