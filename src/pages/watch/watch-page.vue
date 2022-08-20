<script setup>
import {fetch ,Body,ResponseType} from '@tauri-apps/api/http';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

</script>

<template>
        <div id="player" style="width:510px;height: 350px;"></div>
</template>

<script>
import { token } from '/src/scripts/token.js';
import { channelId } from '../../scripts/channel_id'; 
export default {
    data() {
        return {
            videos: null,
            subs: null,
            id: window.location.href.split('/').pop(),
            lang: navigator.language,
            channel_id : channelId
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
    beforeMount: async function () {
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

        async function getVideos(channel,id) {
            let videos = [];
            var streams = '';
            const url = `https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=${channel}&id=${id}&type=adaptive_hls&format=vtt`;

            const headers = {
                'Authorization': 'Bearer ' + token.access_token,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            try {
                if(channel == 'crunchyroll'){
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
                } else if(channel == 'animedigitalnetwork'){
                    const response = await fetch(url, {
                        method: "GET",
                        headers: headers
                    });
                    let result = response.data;
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
                                var quality1 = quality +' '+ line.split('RESOLUTION=')[1].match(/(\d)+x+(\d)+/g)[0];
                                var videoLink = lines[x + 1];
                                videos.push(new Videos(quality1, videoLink));
                            }
                        }
                    }
                } else if (channel =='neko-sama'){
                    //not implemented yet
                }
                return videos;
            } catch (e) {
                console.log(e);
            }
        }
        async function getSubs(channel,id) {
            let subtitles = [];
            const url = `https://kamyroll.herokuapp.com/videos/v1/streams?channel_id=${channel}&id=${id}&type=adaptive_hls&format=ass`;

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
                if(result.subtitles.length >= 1){
                    for(let subs of result.subtitles){
                        var lang = subs.locale;
                        var link = subs.url;
                        if(link.includes('kamyroll')){
                            link = 'https://corsproxy.io/?' + encodeURIComponent(link);
                        }
                        var type = subs.format;
                        subtitles.push(new Subs(lang, link, type));
                    }
                }else{
                    console.log('no subs');
                    subtitles.push(new Subs('No subtitles', '', ''));
                }
                return subtitles;
                
            } catch (e) {
                console.log(e);
            }
        }
        var streams = await getVideos(channelId.id,this.id);
        this.videos = streams;
        var subs = await getSubs(channelId.id,this.id);
        this.subs = subs;
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
            subtitle: subs[0],
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
                                url:  sub.url,
                                type: 'ass',
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
