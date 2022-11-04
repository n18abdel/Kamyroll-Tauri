import {reactive} from 'vue';
import adn_logo from '/img/adn.svg';
import crunchyroll_logo from '/img/crunchyroll.svg';
import nekosama_logo from '/img/neko-sama.svg';


const CRUNCHYROLL = 'crunchyroll';
const NEKO_SAMA = 'neko-sama';
const ANIMEDIGITALNETWORK = 'adn';
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
    { name: CRUNCHYROLL, short_label:'Crunchyroll',label: 'Crunchyroll',icon:crunchyroll_logo,description : 'Crunchyroll is an American distributor, publisher and licensing company focused on streaming anime, manga, drama, and more.',color:'#ff6600'},
    { name: NEKO_SAMA, short_label:'Neko-sama', label: 'Neko-sama',icon: nekosama_logo ,description : 'Neko-sama is a french streaming website focused on streaming anime',color:'#1cb9f4' },
    { name: ANIMEDIGITALNETWORK, short_label:'ADN', label: 'Animation Digital Network', icon: adn_logo,description : 'Animation Digital Network is a French distributor, publisher and licensing company focused on streaming anime and manga.',color:'#0095ff' },
]);

let getChannelinUse = (chan) => {
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].name == chan) {
            return channels[i];
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