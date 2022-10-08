import {reactive} from 'vue';

const CRUNCHYROLL = 'crunchyroll';
const NEKO_SAMA = 'neko-sama';
const ANIMEDIGITALNETWORK = 'animedigitalnetwork';
let setChannelinUse = () => {
    channel = localStorage.getItem('channel');
}

let setChannel = async (channelName) => {
    localStorage.setItem('channel', channelName);
    setChannelinUse();
}
// by default set in the local storage crunchyroll
/* let channel = localStorage.getItem('channel');
if (channel==undefined){
    setChannel(CRUNCHYROLL);
} else {
    channel = localStorage.getItem('channel');
} */

let channel = localStorage.getItem('channel');
if (channel==undefined){
    setChannel(CRUNCHYROLL);
} else {
    channel = localStorage.getItem('channel');
}
var chan = channel;







const channels = reactive([
    { name: CRUNCHYROLL, label: 'Crunchyroll'},
    { name: NEKO_SAMA, label: 'Neko-sama' },
    { name: ANIMEDIGITALNETWORK, label: 'Anime Digital Network' },
]);

let getChannelinUse = (chan) => {
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].name == chan) {
            return channels[i].label;
        }
    }
}



let channelPage = () => {
    if (window.location.pathname.includes('/crunchyroll/')) {
        setChannel(CRUNCHYROLL);
        chan = CRUNCHYROLL;
    } else if (window.location.pathname.includes('/nekosama/')) {
        setChannel(NEKO_SAMA);
        chan = NEKO_SAMA;
    } else if (window.location.pathname.includes('/adn/')) {
        setChannel(ANIMEDIGITALNETWORK);
        chan = ANIMEDIGITALNETWORK;
    }
}




export  {       
    chan,
    channels,
    setChannel,
    channel,
    getChannelinUse,
    channelPage,
    setChannelinUse
}