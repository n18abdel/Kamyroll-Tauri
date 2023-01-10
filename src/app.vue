<script setup>
import banner from './components/banner.vue'
</script>

<template>
  <v-app>
    
    <v-main>
      <banner></banner>
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
       emits : ['toast','error'],
       version: 'v' + process.env.APP_VERSION.replaceAll('"', '') + ' - ' + process.env.CHANNEL.replaceAll('"', ''),
       snackbar: false,
       text: '',
       timeout: 2000,
     }
   },
   methods: {
      log(message){
        console.log(message);
      },
      toast(message){
        this.snackbar = false;
        this.text = message;
        console.log(message);
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, this.timeout);
      },
     async ctrlt() {
       let status = await generateNewToken();
       if (status == true) {
         this.toast('Token is generated, reloading the page');
         window.location.reload();
       } else {
         this.toast('Token is not generated, please try again. (' + status + ')');
       }
     },
     async sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
     }
   },
   mounted: async function () {
     setInterval(async ()=>{
       await invoke('close_splashscreen')
       await appWindow.show();
     },15000)
     
     let token_expire = localStorage.getItem('token_expire');
     let token_valid = Number(localStorage.getItem('token_valid'));
     let currentDate = Math.floor(new Date().getTime() / 1000);

     if (localStorage.getItem('miniProgressBar') == null) {
       localStorage.setItem('miniProgressBar', 'false');
     } else if (localStorage.getItem('autoplay') == null){
       localStorage.setItem('autoplay', 'false');
     }

     if (token_expire != null) {
        if (currentDate > token_expire) {
          await generateNewToken();
          this.toast('Token is expired, generating new token')
          window.location.reload();
        } else if (currentDate > token_valid) {
          let test = await testToken(localStorage.getItem('token'));
          if (test == false) {
            await generateNewToken();
            this.toast('Token is not working anymore, generating new token');
            window.location.reload();
          } else {
            localStorage.setItem('token_valid', currentDate + 21600);
            this.toast('Token is valid, but will be tested again in 6 hours')
          }
        }
     } else {
       await generateNewToken();
     }

     if(localStorage.getItem('discord_rpc') == null) {
       localStorage.setItem('discord_rpc', 'true');
     } else if (localStorage.getItem('discord_rpc') == 'false') {
       await invoke('disable_rpc');
     }

     document.addEventListener('keydown', (event) => {
       // ctrl + t  || cmd + t => generate new token
       if (event.ctrlKey && event.key === 't' || event.metaKey && event.key === 't') {
         this.toast('A new token is being generated')
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
