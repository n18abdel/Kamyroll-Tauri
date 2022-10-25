<script setup>
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import loading from '/src/assets/loading.svg';
import fastforward from '/src/assets/fast-forward-15.svg';
import backforward from '/src/assets/back-forward-15.svg';
import download from '/src/assets/download-button.svg';
</script>

<template>
    <div class="app-body-wrapper">
        <div class="watch-page-container">
            <div id="player" class="video-player-wrapper">
                <div class="loading" v-if="videos.length == 0">
                    <div class="loading__spinner">
                        <img :src="loading" alt="loading">
                    </div>
                </div>
            </div>
            <div class="video-content">
                <div class="content">
                    <div class="media-metadata"><a class="poster-image-wrapper" :href="meta.url"><span
                                class="poster-hover-layer">to
                                series</span><img :src="meta.images.poster_tall[image].source" class="c-content-image"
                                :alt="meta.title"></a>
                        <div class="text-wrapper"><a class="episode-info" :href="meta.url"><span class="series"><svg
                                        class="left-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20"
                                        data-t="left-arrow-svg">
                                        <path d="M10 .667L.667 10 10 19.332h1.333V18l-8-8 8-8V.667"></path>
                                    </svg>{{meta.series_title}}</span><span
                                    class="season">{{meta.season_count}}</span></a>
                            <h2 class="title">{{meta.title}}</h2>
                            <div class="description">{{meta.description}}</div>
                            <div class="additional-information">
                                <div class="c-meta-tags additional-information-tag">
                                    <span class="c-meta-tags__language" v-if="meta.is_subbed && meta.is_dubbed">Sub |
                                        Dub</span>
                                    <span class="c-meta-tags__language" v-else-if="meta.is_subbed">Subtitled</span>
                                    <span class="c-meta-tags__language" v-else>Dubbed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="meta.images.thumbnail.length >= 5" class="background-overlay"
                        :style="{'background-image': `url(${meta.images.poster_tall[4].source})`}"></div>
                    <div v-else class="background-overlay"
                        :style="{'background-image': `url(${meta.images.poster_tall[0].source})`}"></div>
                </div>
            </div>


        </div>
    </div>

</template>
<script>
import { appWindow } from '@tauri-apps/api/window';
import { getVideos } from '../../scripts/crunchyroll.js';
import qualityicon from '../../assets/quality.svg';
import getMetadata from '../../scripts/getMetadata';
export default {
    data() {
        return {
            instance: null,
            videos: [],
            subs: [],
            id: document.location.href.split('/').pop(),
            lang: navigator.language,
            channel_id: null,
            meta: null,
            image : 0,
            nextepisode: ''
        }
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
        findNextEpisode(id){
            // go through localStorage.getItem('seasons'), find the id and take the i+1
            let seasons = JSON.parse(localStorage.getItem('episodes'));
            // go through all the items and when the id is found, return the next one
            for(let season of seasons.items){
                for(let i=0; i<season.episodes.length; i++){
                    if(season.episodes[i].id == id){
                        if(season.episodes[i+1] == undefined){
                            return null;
                        }
                        console.log('next episode id',season.episodes[i+1].id);
                        return season.episodes[i+1].id;
                    }
                }
            }
            
        }
    },
    beforeMount: async function () {
        this.meta = await getMetadata(this.id);
        let meta = JSON.parse(localStorage.getItem('meta'))
        this.meta.images.poster_tall = meta.images.poster_tall;
        this.image = Math.floor((this.meta.images.poster_tall.length/2)-1);
    },
    mounted : async function (){
        // access the proxy data from the template
        let sources = await getVideos(this.id);
        let next = this.findNextEpisode(this.id);
        this.videos = sources.streams;
        var hls = null;
        this.instance = new Artplayer({
            url: this.videos.reverse()[0].url,
            container: "#player",
            volume: 0.5,
            isLive: false,
            muted: false,
            autoplay: false,
            pip: true,
            screenshot: true,
            setting: true,
            loop: false,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            subtitleOffset: true,
            miniProgressBar: true,
            mutex: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: '#f00',
            icons: {
                loading: `<img src="${loading}">`
            },
            moreVideoAttr: {
                crossOrigin: 'anonymous',
            },
            customType: {
                m3u8: function (video, url) {
                    if (hls) hls.destroy();
                    // xhrSetup
                    hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                },
            },
            whitelist: ['*'],
            moreVideoAttr: {
                crossOrigin: 'anonymous',
            },
            quality: this.videos,
            subtitle: sources.subs[0],
            controls: [
                //download button
                {
                    position: 'right',
                    html: `<img width="22" heigth="22" src="${download}">`,
                    tooltip: 'Soon',
                    click: function () {
                        this.tooltip = 'Bah alors bien essayer';
                    }
                },{
                    position: 'right',
                    html: `Next`,
                    tooltip: 'Next Episode',
                    click: function () {
                        console.log('next',next);
                        if(next){
                            document.location.href =  document.location.origin + document.location.pathname.replace(this.id,next);
                        }
                    }
                },
                {
                position: 'left',
                html: `<img width="22" heigth="22" src="${backforward}">`,
                tooltip: '-15',
                click: function () {
                    this.backward = 15;
                }
            },{
                position: 'left',
                html: `<img width="22" heigth="22" src="${fastforward}">`,
                tooltip: '+15',
                click: function () {
                    this.forward = 15;
                },
            }
            ],
            settings: [{
                width: 200,
                html: 'Subtitle',
                tooltip: sources.subs[0].html,
                icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
                selector: [{
                        html: 'Display',
                        tooltip: 'Show',
                        switch: true,
                        onSwitch: function (item) {
                            item.tooltip = item.switch ? 'Hide' : 'Show';
                            this.instance.subtitle.show = !item.switch;
                            return !item.switch;
                        },
                    },
                    ...sources.subs.map(sub => {
                        return {
                            html: sub.html,
                            url: sub.url,
                            type: 'ass',
                            style: sub.style,
                            encoding: 'utf-8'
                        }
                    })

                ],
                onSelect: function (item) {
                    this.instance.subtitle.switch(item.url, {
                        name: item.html,
                    });
                    return item.html;
                },
            }]
        });

        this.instance.on('ready', async () => {
            this.instance.controls.add({
                position: 'right',
                html: `<img width="22" heigth="22" src="${qualityicon}">`,
                selector: hls.levels.map((item, index) => {
                    return {
                        html: item.height + 'P',
                        level: item.level || index
                    }
                }).reverse(),
                onSelect: function (item) {
                    hls.nextLevel = item.level;
                    return item.html;
                },
                mounted(_, item) {
                    function updateHtml() {
                        const currentLevel = hls.levels[hls.currentLevel];
                        if (currentLevel) {
                            item.tooltip = currentLevel.height + 'P';
                        }
                    }
                    hls.on(Hls.Events.LEVEL_SWITCHING, (res) => {
                        this.instance.notice.show = "CHANGEMENT DE QUALITE";
                        console.info('LEVEL_SWITCHING -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_SWITCHED, (res) => {
                        this.instance.notice.show = "CHANGEMENT DE QUALITE ";
                        console.info('LEVEL_SWITCHED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_LOADING, (res) => {
                        this.instance.notice.show = "LA QUALITE EST EN COURS DE CHARGEMENT";
                        console.info('LEVEL_LOADING -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_LOADED, (res) => {
                        this.instance.notice.show = "CHARGEE";
                        console.info('LEVEL_LOADED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_UPDATED, (res) => {
                        this.instance.notice.show = "LEVEL_UPDATED";
                        console.info('LEVEL_UPDATED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVELS_UPDATED, (res) => {
                        this.instance.notice.show = "LEVELS_UPDATED";
                        console.info('LEVELS_UPDATED -->', res);
                        updateHtml();
                    });
                }
            })
            async function getState(el) {
                if (el.fullscreen) {
                    await appWindow.setFullscreen(true);
                    console.info('fullscreen');
                } else {
                    await appWindow.setFullscreen(false);
                    console.info('not fullscreen');
                }
            }
            this.instance.on('fullscreen', async () => {
                await getState(this.instance);
            });
            this.instance.on('', async () => {
                await getState(this.instance);
            });
        });
        /* this.$nextTick(() => {
            this.$emit("get-instance", this.instance);
        }); */
        },
        beforeUnmount() {
            if (this.instance && this.instance.destroy) {
                this.instance.destroy(false);
            }
        }
    }
</script>

<style scoped>

.loading img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#player > .art-video-player .art-subtitle {
    font-size: 50px !important;
}
</style>
