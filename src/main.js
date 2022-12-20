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
import { invoke } from '@tauri-apps/api/tauri';
import { getChannelinUse,channel } from './scripts/channel_id.js';


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

app.use(routes);
app.use(vuetify);
app.mount('#app');



await invoke('close_splashscreen');

if (!window.location.href.includes('watch')){
    setInterval(async () => {
        await invoke('set_activity', {
            state : getChannelinUse(localStorage.getItem('channel')).short_label,
            page : `Doing nothing`,
            channel : channel,
            doing : `Idle`
        })
    }, 300000);
}
