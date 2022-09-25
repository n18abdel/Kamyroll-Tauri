<script setup>
import {fetch ,Body,ResponseType} from '@tauri-apps/api/http';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import { pStreamExtractor } from '../../scripts/pstreamextractor';
import loading from '/src/assets/loading.svg';
import { appWindow } from '@tauri-apps/api/window';
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
import {
    token
} from '/src/scripts/token.js';

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
        if (window.location.href.includes('crunchyroll')) {
            this.channel_id = 'crunchyroll';
        } else if (window.location.href.includes('adn')) {
            this.channel_id = 'animedigitalnetwork';
        } else if (window.location.href.includes('nekosama')) {
            this.channel_id = 'neko-sama';
        }

        function Videos(quality, link) {
            this.html = quality;
            this.url = link;
        }

        function Subs(lang, link, style, type) {
            this.html = lang;
            this.url = link;
            this.style = style;
            this.type = type;
        }

        async function getVideos(channel, id) {
            let videos = [];
            var streams = '';
            const url = `https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=${channel}&id=${id}&type=adaptive_hls&format=ass`;

            const headers = {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            try {
                if (window.location.href.includes('/crunchyroll/')) {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: headers
                    });
                    let result = response.data;
                    console.log(result);
                    for (streams of result.streams) {
                        var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                        var link = streams.url;
                        videos.push(new Videos(quality, link));
                    }
                } else if (window.location.href.includes('/adn/')) {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: headers
                    });
                    let result = response.data;
                    console.log(result);
                    for (streams of result.streams) {
                        var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                        var link = streams.url;
                        var videorequest = await fetch(link, {
                            method: "GET",
                            responseType: ResponseType.Text
                        });
                        var videoresult = videorequest.data;
                        var lines = videoresult.split('\n');
                        for (var x = 0; x < lines.length; x++) {
                            var line = lines[x];
                            if (line.includes('EXT-X-STREAM-INF:PROGRAM-ID=1')) {
                                console.log(line);
                                var quality1 = quality + ' ' + line.split('RESOLUTION=')[1].match(/(\d)+x+(\d)+/g)[0];
                                var videoLink = lines[x + 1];
                                videos.push(new Videos(quality1, videoLink));
                            }
                        }
                    }
                } else if (window.location.href.includes('/nekosama/')) {
                    const response = await fetch(url, {
                        method: "GET",
                        headers: headers
                    });
                    let result = response.data;
                    const quality = result.streams[0].audio_locale + ' ' + result.streams[0].hardsub_locale;
                    const pstreamlink = result.streams[0].url.replace('https://www.pstream.net', ' http://localhost:5000');
                    console.log(pstreamlink);
                    const pstream = await pStreamExtractor(pstreamlink);
                    // var videorequest = await fetch(pstream, {
                    //     method: "GET",
                    //     responseType: ResponseType.Text,
                    //     headers: {
                    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                    //         "Accept-Language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"
                    //     }
                    // });
                    // var videoresult = videorequest.data;
                    // console.log(videoresult);
                    // var lines = videoresult.split('\n');
                    // for (var x = 0; x < lines.length; x++) {
                    //     var line = lines[x];
                    //     if (line.includes('EXT-X-STREAM-INF')) {
                    //         console.log(line);
                    //         var quality1 = quality + ' ' + line.split('RESOLUTION=')[1].match(/(\d)+x+(\d)+/g)[0];
                    //         var videoLink = lines[x + 1];

                    //     }
                    // }
                    videos.push(new Videos(quality, pstream));
                }
                return videos;
            } catch (e) {
                console.log(e);
            }
        }
        async function getSubs(channel, id) {
            let subtitles = [];
            const url = `https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=${channel}&id=${id}&type=adaptive_hls&format=ass`;

            const headers = {
                'Authorization': 'Bearer ' + token.access_token,
            };
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers
                });
                let result = response.data;
                if (result.subtitles.length >= 1) {
                    for (let subs of result.subtitles) {
                        let lang = subs.locale;
                        let link = subs.url;
                        if (link.includes('kamyroll')) {
                            link = 'https://corsproxy.io/?' + encodeURIComponent(link);
                        }
                        let type = subs.format;
                        let style = {
                            fontSize: '40px'
                        };
                        let finalData = new Subs(lang, link, style, type);
                        subtitles.push(finalData);
                        console.log(finalData);
                    }
                } else {
                    subtitles.push(new Subs('No subtitles', '', style, ''));
                }
                return subtitles;
            } catch (e) {
                console.log(e);
            }
        }
        var streams = await getVideos(this.channel_id, this.id);
        this.videos = streams;
        if (!window.location.href.includes('/nekosama/')) {
            var subs = await getSubs(this.channel_id, this.id);
            this.subs = subs;
        } else {
            subs = [new Subs('No subtitles', '', {}, '')];
            this.subs = subs;
        }
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
            loop: true,
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
            subtitle: subs[0],
            controls: [{
                position: 'left',
                html: '+15',
                tooltip: '+15',
                click: function () {
                    art.forward = 15;
                },
            }],
            settings: [{
                width: 200,
                html: 'Subtitle',
                tooltip: subs[0].html,
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
                    ...subs.map(sub => {
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
            art.controls.add({
                position: 'right',
                html: 'Quality',
                style: {
                    "padding-left": "10px"
                },
                selector: hls.levels.map((item, index) => {
                    return {
                        html: item.height + 'P',
                        level: item.level || index
                    }
                }),
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
