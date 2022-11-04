<template>
    <div class="app-body-wrapper">
        <div class="watch-page-container">
            <div class="video-player-wrapper" v-if="videos.length == 0" >
                <img class="loading"  src="/img/loading.svg" alt="loading">
            </div>
            <Artplayer v-else @get-instance="getInstance" :option="option" :subs="subs" :videos="videos" />
            <div class="video-content" >
                <div class="content" v-if="JSON.stringify(metadat).length > 10">
                    <div class="media-metadata"><a class="poster-image-wrapper" :href="metadat.url"><span
                                class="poster-hover-layer">to
                                series</span><img :src="metadat.images?.poster_tall[image].source" class="c-content-image"
                                :alt="metadat.title"></a>
                        <div class="text-wrapper"><a class="episode-info" :href="metadat.url"><span class="series"><svg
                                        class="left-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20"
                                        data-t="left-arrow-svg">
                                        <path d="M10 .667L.667 10 10 19.332h1.333V18l-8-8 8-8V.667"></path>
                                    </svg>{{metadat.series_title}}</span><span
                                    class="season">{{metadat.season_count}}</span></a>
                            <h2 class="title">{{metadat.title}}</h2>
                            <div class="description">{{metadat.description}}</div>
                            <div class="additional-information">
                                <div class="c-meta-tags additional-information-tag">
                                    <span class="c-meta-tags__language" v-if="metadat.is_subbed && metadat.is_dubbed">Sub |
                                        Dub</span>
                                    <span class="c-meta-tags__language" v-else-if="metadat.is_subbed">Subtitled</span>
                                    <span class="c-meta-tags__language" v-else>Dubbed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { channel} from '../../scripts/channel_id';
import { getVideos } from '../../scripts/crunchyroll.js';
import Artplayer from "../../components/Artplayer.vue";
import getMetadata from '../../scripts/getMetadata';
export default {
    data() {
        return {
            player: null,
            videos: [],
            subs: [],
            id: document.location.href.split('/').pop(),
            lang: navigator.language,
            channel_id: null,
            metadat: '',
            image: 0,
            nextepisode: '',
            option: {}
        }
    },
    components: {
        Artplayer,
    },
    methods: {
        getQuality(keys) {
            let quality = [];
            for (var x = 0; x < keys.length; x++) {
                let tKey = keys[x];
                quality.push(tKey.quality);
            }
            return quality;
        },
        getValueFromKey(obj, key) {
            for (var x = 0; x < obj.length; x++) {
                if (obj[x].html == key) {
                    return obj[x];
                }
            }
        },
        findNextEpisode(id) {
            // go through localStorage.getItem('seasons'), find the id and take the i+1
            let seasons = JSON.parse(localStorage.getItem('episodes'));
            // go through all the items and when the id is found, return the next one
            for (let season of seasons.items) {
                for (let i = 0; i < season.episodes.length; i++) {
                    if (season.episodes[i].id == id) {
                        if (season.episodes[i + 1] == undefined) {
                            return null;
                        }
                        console.log('next episode id', season.episodes[i + 1].id);
                        return season.episodes[i + 1].id;
                    }
                }
            }
        },
        getInstance(art) {
            return art;
        }
    },
    beforeMount: async function () {
        this.metadat = await getMetadata(this.id);
        let meta1 = await getMetadata(this.metadat.series_id);
        this.metadat.images.poster_tall = meta1.images.poster_tall;
        this.metadat.url = `/${channel.replace('-','')}/`+meta1.id;
        this.image = Math.floor((this.metadat.images.poster_tall.length - 1) /2); 
        let sources = await getVideos(this.id);
        this.videos = sources.streams;
        this.subs = sources.subs;
    }
}
</script>

<style scoped>
.erc-header .header-content {
    position: none !important;
}

img.loading {
    margin: auto;
    margin-top: 17%;
    margin-bottom: 20%;
}


/*when the window is mobile sized */
@media only screen and (max-width: 958px) {
    img.loading {
    margin: auto;
    margin-top: 25%;
    margin-bottom: 20%;
}
}
</style>
