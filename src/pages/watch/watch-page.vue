<script setup>
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import loading from '/src/assets/loading.svg';
import fastforward from '/src/assets/fast-forward-15.svg';
import backforward from '/src/assets/back-forward-15.svg';
import download from '/src/assets/download-button.svg';
import { invoke } from '@tauri-apps/api';
</script>

<template>
    <div class="loading" v-if="videos.length == 0">
        <div class="loading__spinner">
            <img :src="loading" alt="loading">
        </div>
    </div>
    <div id="player"></div>
</template>
<script>
import { channelPage } from '../../scripts/channel_id';
import { getVideos } from '../../scripts/crunchyroll.js';
import qualityicon from '../../assets/quality.svg';
export default {
    data() {
        return {
            videos: [],
            subs: [],
            id: document.location.href.split('/').pop(),
            lang: navigator.language,
            channel_id: null,
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
        }
    },
    beforeMount: async function () {
        channelPage()
        let sources = await getVideos(this.id);
        this.videos = sources.streams;
        var hls = null;
        var art = new Artplayer({
            url: this.videos.reverse()[0].url,
            container: '#player',
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
                    click: function (item) {
                        item.tooltip = 'Bah alors bien essayer';
                    }
                },{
                position: 'left',
                html: `<img width="22" heigth="22" src="${backforward}">`,
                tooltip: '-15',
                click: function () {
                    art.backward = 15;
                }
            },{
                position: 'left',
                html: `<img width="22" heigth="22" src="${fastforward}">`,
                tooltip: '+15',
                click: function () {
                    art.forward = 15;
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
                            art.subtitle.show = !item.switch;
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
                    art.subtitle.switch(item.url, {
                        name: item.html,
                    });
                    return item.html;
                },
            }]
        });
        art.on('ready', async () => {
            console.log(art.controls)
            art.controls.add({
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
                        art.notice.show = "CHANGEMENT DE QUALITE";
                        console.info('LEVEL_SWITCHING -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_SWITCHED, (res) => {
                        art.notice.show = "CHANGEMENT DE QUALITE ";
                        console.info('LEVEL_SWITCHED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_LOADING, (res) => {
                        art.notice.show = "LA QUALITE EST EN COURS DE CHARGEMENT";
                        console.info('LEVEL_LOADING -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_LOADED, (res) => {
                        art.notice.show = "CHARGEE";
                        console.info('LEVEL_LOADED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVEL_UPDATED, (res) => {
                        art.notice.show = "LEVEL_UPDATED";
                        console.info('LEVEL_UPDATED -->', res);
                        updateHtml();
                    });
                    hls.on(Hls.Events.LEVELS_UPDATED, (res) => {
                        art.notice.show = "LEVELS_UPDATED";
                        console.info('LEVELS_UPDATED -->', res);
                        updateHtml();
                    });
                }
            })
            async function getState() {
                if (art.fullscreen) {
                    await appWindow.setFullscreen(true);
                    console.info('fullscreen');
                } else {
                    await appWindow.setFullscreen(false);
                    console.info('not fullscreen');
                }
            }
            art.on('fullscreen', async () => {
                await getState();
            });
        });


    },
}
</script>

<style scoped>
#player{
    /* fullscreen */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    /* fullscreen but let the header appear */
    overflow: visible;
    
}

#player > .art-video-player .art-subtitle {
    font-size: 50px !important;
}
</style>
