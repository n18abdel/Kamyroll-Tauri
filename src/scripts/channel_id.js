import {reactive} from 'vue';
const CRUNCHYROLL = 'crunchyroll';
const NEKO_SAMA = 'neko-sama';
const ANIMEDIGITALNETWORK = 'animedigitalnetwork';


export const channelId = reactive({
    id: CRUNCHYROLL,
    adn(){
        this.id = ANIMEDIGITALNETWORK;
    },
    crunchyroll(){
        this.id = CRUNCHYROLL;
    },
    neko(){
        this.id = NEKO_SAMA;
    }
 });
