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
import { appWindow } from '@tauri-apps/api/window';
/* import { exists, BaseDirectory, createDir } from '@tauri-apps/api/fs'; */
import { idleRPC } from './scripts/misc/rpc.js';


if(appWindow.isFullscreen() && !window.location.href.includes('watch')){
    await appWindow.setFullscreen(false);
    console.log('no more fullscreen');
}

const app = createApp(App);

if(!process.env.CHANNEL.includes('Dev')){
    app.config.errorHandler = function(err, vm, info) {
        console.log(`Error: ${err.toString()}\nInfo: ${info}`);
    }
}

/* await exists('Kamyroll', { dir: BaseDirectory.Video}).then(async (exists) => {
    if(!exists){
        await createDir('Kamyroll', { dir: BaseDirectory.Video});
    }
}); */

if(localStorage.getItem('season') == null){
    localStorage.setItem('season', 'null');
}




app.use(routes);
app.use(vuetify);
app.mount('#app');

if (!window.location.href.includes('watch')){
    setInterval(async () => {
        await idleRPC('Doing nothing', 'Idle')
    }, 300000);
}
