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
import {testToken, generateNewToken } from './scripts/token';
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/tauri';


let first_launch = '';
if(localStorage.getItem('miniProgressBar') == null){
    localStorage.setItem('miniProgressBar', 'false');
}
if(localStorage.length == 0){
    first_launch = true;
} else {
    first_launch = false;
}
console.log('first launch: ' + first_launch);
if(!first_launch){ 
    await invoke('close_splashscreen');
} else {
    console.log('first launch');
    await generateNewToken();
    await invoke('close_splashscreen');
}

if(((new Date(Date.now()) > new Date(eval(localStorage.getItem('token_valid')))))){
    let test = await testToken(localStorage.getItem('token'));
    if(test == false){
        await generateNewToken();
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
