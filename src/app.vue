<script setup>
import banner from './components/banner.vue'

</script>

<template>
  <banner></banner>
  <v-app>
    <v-main>
       <router-view/>
    </v-main>
    
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :bottom="true"
      :right="true"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
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
 import {
   testToken,
   generateNewToken
 } from './scripts/token';
 import {
   invoke
 } from '@tauri-apps/api/tauri';
 import {appWindow} from '@tauri-apps/api/window';
 export default {
   data() {
     return {
       version: 'v' + process.env.APP_VERSION.replaceAll('"', '') + ' - ' + process.env.CHANNEL.replaceAll('"', ''),
       snackbar: false,
       text: '',
       timeout: 2000,
     }
   },
   methods: {
     async ctrlt() {
       let status = await generateNewToken();
       if (status == true) {
         this.text = 'Token is generated, reloading the page';
         this.snackbar = true;
         window.location.reload();
       } else {
         this.text = `Token is not generated, please try again. (${status})`;
         this.snackbar = true;
       }
     }
   },
   mounted: async function () {
     let token_expire = localStorage.getItem('token_expire');
     let token_valid = localStorage.getItem('token_valid');
     let currentDate = Math.floor(new Date().getTime() / 1000);

     if (localStorage.getItem('miniProgressBar') == null) {
       localStorage.setItem('miniProgressBar', 'false');
     } else if (localStorage.getItem('autoplay') == null){
       localStorage.setItem('autoplay', 'false');
     }
     if (token_expire != null) {
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
       if (localStorage.getItem('token') == undefined || Number(token_expire) < currentDate) {
         console.log('token is undefined or expired');
         this.text = 'Token is expired, generating new token';
         if (this.snackbar = true) {
           this.snackbar = false;
         }
         this.snackbar = true;
         let generate = await generateNewToken();
         if (generate == true) {
           if (this.snackbar = true) {
             this.snackbar = false;
           }
           this.text = 'Token is generated, reloading the page';
           this.snackbar = true;
           window.location.reload();
         } else {
           if (this.snackbar = true) {
             this.snackbar = false;
           }
           this.text = `Token is not generated, please try again. (${generate})`;
           this.snackbar = true;
         }
       }
     } else {
       await generateNewToken();
     }

     await invoke('close_splashscreen');
     await appWindow.show();
     document.addEventListener('keydown', (event) => {
       // ctrl + t  || cmd + t => generate new token
       if (event.ctrlKey && event.key === 't' || event.metaKey && event.key === 't') {
         if (this.snackbar = true) {
           this.snackbar = false;
         }
         this.text = 'A new token is being generated';
         this.snackbar = true;
         this.ctrlt();
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
