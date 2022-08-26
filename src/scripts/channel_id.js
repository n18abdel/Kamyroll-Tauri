import {reactive} from 'vue';
import { ref } from 'vue'
const CRUNCHYROLL = 'crunchyroll';
const NEKO_SAMA = 'neko-sama';
const ANIMEDIGITALNETWORK = 'animedigitalnetwork';


export var channelId = reactive({
    id: null,
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
