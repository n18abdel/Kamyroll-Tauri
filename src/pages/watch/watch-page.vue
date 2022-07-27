<script setup>
import Banner from '../../components/banner.vue';
import {fetch ,Body} from '@tauri-apps/api/http';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

</script>

<template>
        <Banner></Banner>
        <div id="player" style="width:510px;height: 350px;"></div>
</template>

<script>
export default {
    data() {
        return {
            videos: null,
            subs: null,
            id: window.location.href.split('/').pop(),
            lang: navigator.language
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
    },
    created: async function () {
        function Videos(quality, link) {
            this.html = quality;
            this.url = link;
        }

        function Subs(lang, link, type) {
            this.html = lang;
            this.url = link;
            this.type = type;
        }

        function getValueFromKey(obj, key) {
            for (var x = 0; x < obj.length; x++) {
                if (obj[x].html == key) {
                    return obj[x];
                }
            }
        }

        async function getToken() {
            const url = 'https://kamyroll.herokuapp.com/auth/v1/token';
            const headers = {
                'Authorization': 'Basic vrvluizpdr2eby+RjSKM17dOLacExxq1HAERdxQDO6+2pHvFHTKKnByPD7b6kZVe1dJXifb6SG5NWMz49ABgJA==',
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            try {
                var body = Body.text('refresh_token=IV%2BFtTI%2BSYR0d5CQy2KOc6Q06S6aEVPIjZdWA6mmO7nDWrMr04cGjSkk4o6urP%2F6yDmE4yzccSX%2FrP%2FOIgDgK4ildzNf2G%2FpPS9Ze1XbEyJAEUyN%2BoKT7Gs1PhVTFdz%2FvYXvxp%2FoZmLWQGoGgSQLwgoRqnJddWjqk0ageUbgT1FwLazdL3iYYKdNN98BqGFbs%2Fbaeqqa8aFre5SzF%2F4G62y201uLnsElgd07OAh1bnJOy8PTNHpGqEBxxbo1VENqtYilG9ZKY18nEz8vLPQBbin%2FIIEjKITjSa%2BLvSDQt%2F0AaxCkhClNDUX2uUZ8q7fKuSDisJtEyIFDXtuZGFhaaA%3D%3D&grant_type=refresh_token&scope=offline_access')
                const response = await fetch(url, {
                    method: "POST",
                    body: body,
                    headers: headers

                });
                let result = response.data;;
                return result;
            } catch (e) {
                console.log(e);
            }
        }
        async function getVideos(id) {
            let videos = [];
            var streams = '';
            const url = 'https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=crunchyroll&id=' + id + '&locale=en-US&type=adaptive_hls&format=vtt';
            var token = await getToken();
            const headers = {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers
                });
                let result = response.data;
                for (streams of result.streams) {
                    var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                    var link = streams.url;
                    videos.push(new Videos(quality, link));
                }
                return videos;
            } catch (e) {
                console.log(e);
            }
        }
        async function getSubs(id) {
            let subtitles = [];
            const url = 'https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=crunchyroll&id=' + id + '&locale=en-US&type=adaptive_hls&format=ass';
            var token = await getToken();
            const headers = {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers
                });
                let result = response.data;
                for (streams of result.subtitles) {
                    var lang = streams.locale;
                    var link = streams.url;
                    subtitles.push(new Subs(lang, link, 'ass'));
                }
                return subtitles;
            } catch (e) {
                console.log(e);
            }
        }
        var subs = await getSubs(this.id);
        this.subs = subs;
        var streams = await getVideos(this.id);
        this.videos = streams;
        console.log(subs);
        var art = new Artplayer({
            url: this.videos.reverse()[0].url,
            container: '#player',
            volume: 0.5,
            isLive: false,
            muted: false,
            autoplay: false,
            autoSize: false,
            autoMini: true,
            setting: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            subtitleOffset: true,
            miniProgressBar: true,
            mutex: true,
            backdrop: true,
            autoPlayback: true,
            airplay: true,
            theme: '#23ade5',
            lang: 'fr-FR',
            customType: {
                m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else {
                        const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
                        if (canPlay === 'probably' || canPlay == 'maybe') {
                            video.src = url;
                        } else {
                            art.notice.show = 'Does not support playback of m3u8';
                        }
                    }
                },
            },
            whitelist: ['*'],
            moreVideoAttr: {
                crossOrigin: 'anonymous',
            },
            quality: this.videos,
            subtitle: getValueFromKey(this.subs, 'en-US'),
            settings: [{
                width: 200,
                html: 'Subtitle',
                tooltip: getValueFromKey(this.subs, 'en-US').html,
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
                    // create new items from subs 
                    ...subs.map(sub => {
                        if (sub.html == 'en-US') {
                            return {
                                html: sub.html,
                                url: 'https://corsproxy.io/?' + sub.url,
                                type: 'ass',
                                default: true,
                                style: {
                                    color: '#fe9200',
                                    fontSize: '20px',
                                }
                            }
                        } else {
                            return {
                                html: sub.html,
                                url: 'https://corsproxy.io/?' + sub.url,
                                type: 'ass',
                                style: {
                                    color: '#fe9200',
                                    fontSize: '20px',
                                }
                            }
                        }
                    })

                ],
                onSelect: function (item) {
                    art.subtitle.switch(item.url, {
                        name: item.html,
                    });
                    return item.html;
                },
            }],
        })
        art.on('ready', () => {
            // the subtitle url is empty
            console.log(art.subtitle.url)
        });

        art.on('subtitleSwitch', (url) => {
            console.log(url)
        });
    },
}
</script>

<style scoped>
#player{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
}
</style>
