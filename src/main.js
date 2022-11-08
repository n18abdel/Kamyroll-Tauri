import { createApp } from 'vue';

import vuetify from './plugins/vuetify';
import routes from './routes';
import App from './app.vue';
import './assets/main.css';
// import './../splashscreen.html';

import 'vue-global-api/ref';
import 'vue-global-api/reactive';
import 'vue-global-api/computed';
import 'vue-global-api/watch';
import 'vue-global-api/watchEffect';
import { testToken, generateNewToken } from './scripts/token';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';

let token_valid = localStorage.getItem('token_valid');
let currentDate = Math.floor(new Date().getTime() / 1000);

if(localStorage.getItem('miniProgressBar') == null){
    localStorage.setItem('miniProgressBar', 'false');
}


if(Number(token_valid) < currentDate){
    let result = await testToken(localStorage.getItem('token'));
    if(result == false){
        await generateNewToken();
    } else {
        console.log('token is still valid');
    }
}

if(appWindow.isFullscreen() && !window.location.href.includes('watch')){
    await appWindow.setFullscreen(false);
    console.log('no more fullscreen');
}

const app = createApp(App);
app.config.errorHandler = function(err, vm, info) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}

app.use(routes);
app.use(vuetify);
app.mount('#app');

await invoke('close_splashscreen');