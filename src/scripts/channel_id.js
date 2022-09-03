import {reactive} from 'vue';
import { ref } from 'vue'
const CRUNCHYROLL = 'crunchyroll';
const NEKO_SAMA = 'neko-sama';
const ANIMEDIGITALNETWORK = 'animedigitalnetwork';
const setChannel = (channelName) => {
    channel = localStorage.setItem('channel', channelName);
    localStorage.setItem('channel', channelName);
    chan = localStorage.getItem('channel');
}
// by default set in the local storage crunchyroll
var channel = localStorage.getItem('channel');
if (channel==undefined){
    setChannel(CRUNCHYROLL);
} else {
    channel = localStorage.getItem('channel');
}
var chan = localStorage.getItem('channel');

const channels = reactive([
    { name: CRUNCHYROLL, label: 'Crunchyroll' },
    { name: NEKO_SAMA, label: 'Neko-sama' },
    { name: ANIMEDIGITALNETWORK, label: 'Anime Digital Network' },
]);



export  {       
    chan,
    channels,
    setChannel,
    channel
}