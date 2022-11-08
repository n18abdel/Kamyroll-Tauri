import {
    fetch
} from '@tauri-apps/api/http'
import {
    finalData,Videos,Subs
} from './constructor.js'

import {
    channel,channelPage
} from './channel_id.js'
import pStreamExtractor from './pstreamextractor.js'

var token = localStorage.getItem('token');

async function getLastEpisodes(){
    if(token == null){
        token = localStorage.getItem('token');
    }
    let url = `https://api.kamyroll.tech/content/v1/updated?channel_id=${channel}&locale=en-US&limit=20`;
    const options = {
        headers: {
            'User-Agent': 'Kamyroll/1.0.2 Tauri-Rust',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }
    let episodes = [];
    let response = await fetch(url, options);
    if (response.status != 200) {
        console.log(response);
        return episodes;
    }
    let result = response.data.items;
    for (let item of result) {
        item.url = '';
        let id = item.id;
        if (channel == 'crunchyroll') {
            item.url = '/crunchyroll/watch/' + id;
        } else if (channel == 'adn') {
            item.url = '/adn/watch/' + id;
        } else if (channel == 'neko-sama') {
            item.url = '/nekosama/watch/' + id;
        }
        episodes.push(item)
    }
    return episodes;
}


async function getEpisodes(slug, type) {
    channelPage();
    if(token == null){
        token = localStorage.getItem('token');
    }
    let url = "";
    if (type == 'movie_listing') {
        url = `https://api.kamyroll.tech/content/v1/movies?id=${slug}&channel_id=${channel}`;
    } else {
        url = `https://api.kamyroll.tech/content/v1/seasons?id=${slug}&channel_id=${channel}`;
    }
    const options = {
        headers: {
            'User-Agent': 'Kamyroll/1.0.2 Tauri-Rust',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }
    let response = await fetch(url, options);
    if (response.status != 200) {
        console.log(response);
        return;
    }
    let result = response.data;
    if (type == 'series') {
        for (let season of result.items) {
            for (let epi of season.episodes) {
                if (epi.episode != 'Bande Annonce') {
                    epi.title = `S${epi.season_number} Episode ${epi.episode}: ` + epi.title;
                    if (epi.id.includes('vf')) {
                        epi.title += ' (VF)';
                    } else if (epi.id.includes('vostfr')) {
                        epi.title += ' (VOSTFR)';
                    }
                    epi.url = '';
                    if (channel == 'crunchyroll') {
                        epi.url = '/crunchyroll/watch/' + epi.id;
                    } else if (channel == 'adn') {
                        epi.url = '/adn/watch/' + epi.id;
                    } else if (channel == 'neko-sama') {
                        epi.url = '/nekosama/watch/' + epi.id;
                    }
                    epi.duration_ms = epi.duration_ms;
                    epi.duration_ms = Math.floor(epi.duration_ms / 60000);
                }
            }
        }
    } else if (type == 'movie_listing') {
        for (const epi of result.items) {
            epi.url = "";
            if (channel == 'crunchyroll') {
                epi.url = '/crunchyroll/watch/' + epi.id;
            } else if (channel == 'adn') {
                epi.url = '/adn/watch/' + epi.id;
            } else if (channel == 'neko-sama') {
                epi.url = '/nekosama/watch/' + epi.id;
            }
            epi.duration_ms = epi.duration_ms;
            epi.duration_ms = Math.floor(epi.duration_ms / 60000);
        }
    }
    return result;
}

async function search(query){
    if(token == null){
        token = localStorage.getItem('token');
    }
    let results = [];
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Kamyroll/1.0.2 Tauri-Rust',
            'Authorization': `Bearer ${token}`,
        }
    };
    console.log(query);
    let url = `https://api.kamyroll.tech/content/v1/search?query=${query.replaceAll(' ','+')}&limit=100&channel_id=${channel}`;
    console.log(url);
    let request = await fetch(url,options);
    let response = request.data;
    if(request.status != 200){
        console.log(response);
        return;
    }
    let data = response;
    for (let anime of data.items) {
        for (let item of anime.items) {
            let title = item.title;
            let image = item.images.poster_tall[0].source;
            let desc = item.descripion;
            let type = item.media_type;
            let metadata;
            if (type == 'movie_listing'){
                metadata = item.movie_listing_metadata;
            } else{
                metadata = item.series_metadata;
            }
            let link = "";
            if(channel == "adn"){
                link = '/adn/' + item.id;
            } else if (channel=="neko-sama"){
                link = '/nekosama/' + item.id;
            } else if(channel=="crunchyroll"){
                link = '/crunchyroll/' + item.id;
            }
            let maturity_ratings = metadata.maturity_ratings;
            let is_dubbed = metadata.is_dubbed;
            let is_subbed = metadata.is_subbed;
            let is_mature = metadata.is_mature;
            let is_simulcast = '';
            let season_count = '';
            let episode_count = '';
            try{
                 is_simulcast = metadata.is_simulcast;
                 season_count = metadata.season_count;
                 episode_count = metadata.episode_count;
            }catch(e){
                 is_simulcast = false;
                 season_count = 0;
                 episode_count = 0;
            }
            results.push(new finalData(title, image, desc, type, maturity_ratings, link, is_dubbed, is_subbed, is_mature, is_simulcast,season_count,episode_count));
        }
    }
    return results
}


async function getVideos(id) {
    if(token == null){
        token = localStorage.getItem('token');
    }
    let preferredLanguage = '';
    if(localStorage.getItem('preferredLanguage') == null){
        preferredLanguage = 'en-US';
    } else{
        preferredLanguage = localStorage.getItem('preferredLanguage');
    }
    const proxy_url = 'http://127.0.0.1:15411';
    let videos = [];
    let subtitles = [];
    const style = {
        /* filter : 'drop-shadow(2px 2px 1px black)',
        fontSize : '45px',
        letterSpacing : '-2px',
        fontFamily : '"Trebuc Bold", "Trebuc", "Helvetica", "Arial", sans-serif',
        textShadow : '2px 2px 1px black',
        '-webkit-text-stroke': '2px black',
        'padding-bottom' : '20px', */
    };
    const url = `https://api.kamyroll.tech/videos/v1/streams?channel_id=${channel}&id=${id}&type=adaptive_hls&format=ass`;
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
        if (window.location.href.includes('/crunchyroll/')) {
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });
            let result = response.data;
            for (let streams of result.streams) {
                var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                var link = streams.url;
                videos.push(new Videos(quality, link));
            }
            if (result.subtitles.length >= 1) {
                for (let subs of result.subtitles) {
                    let lang = subs.locale;
                    let link = subs.url;
                    let type = subs.format;
                    let finalData = new Subs(lang, link, style, type);
                    subtitles.push(finalData);
            }
            } else {
                subtitles.push(new Subs('No subtitles', '', {}, ''));
            }
        } else if (window.location.href.includes('/adn/')) {
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });
            let result = response.data;
            for (let streams of result.streams) {
                let quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                let link = streams.url;
                const video_url = link;
                const file_extension = '.m3u8';
                const hls_proxy_url  = `${proxy_url}/${ btoa(video_url) }${file_extension}`;
                videos.push(new Videos(quality, hls_proxy_url));
            }
            if (result.subtitles.length >= 1) {
                for (let subs of result.subtitles) {
                    let lang = subs.locale;
                    let link = subs.url;
                    let type = subs.format;
                    let finalData = new Subs(lang, link, style, type);
                    subtitles.push(finalData);
            }
            } else {
                subtitles.push(new Subs('No subtitles', '', style, ''));
            }
        } else if (window.location.href.includes('/nekosama/')) {
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });
            let result = response.data;
            let quality = result.streams[0].audio_locale + ' ' + result.streams[0].hardsub_locale;
            let pstreamlink = result.streams[0].url.url + '&key=clear';
            const video_url = pstreamlink;
            const file_extension = '.m3u8'
            const hls_proxy_url  = `${proxy_url}/${ btoa(video_url) }${file_extension}`
            videos.push(new Videos(quality, hls_proxy_url));
            subtitles.push(new Subs('No subtitles', '', {}, ''));
        }

        // fr-FR in first in the subtitles array
        for(let i = 0; i < subtitles.length; i++){
            if(subtitles[i].html == preferredLanguage){
                let temp = subtitles[0];
                subtitles[0] = subtitles[i];
                subtitles[i] = temp;
            }
        }

        return {
            streams:videos.reverse(), 
            subs: subtitles
        };
    } catch (e) {
        console.log(e);
    }
}

export {getEpisodes,search,getVideos,getLastEpisodes};