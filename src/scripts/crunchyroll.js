import {
    fetch
} from '@tauri-apps/api/http'
import {
    episode,finalData,Videos,Subs
} from './constructor.js'

import {
    channel,channelPage
} from './channel_id.js'
import pStreamExtractor from './pstreamextractor.js'

const token = localStorage.getItem('token');
async function getLastEpisodes(){
    let url = `https://api.kamyroll.tech/content/v1/updated?channel_id=${channel}&locale=en-US&limit=20`;
    const options = {
        headers: {
            'User-Agent': 'Kamyroll/0.3.6 Tauri-Rust',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }
    let episodes = [];
    let response = await fetch(url, options);
    console.log(response);
    if (response.status != 200) {
        console.log(response);
        return;
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
    console.log(episodes);
    return episodes;
}


async function getEpisodes(slug, type) {
    channelPage();
    let url = "";
    if (type == 'movie_listing') {
        url = `https://api.kamyroll.tech/content/v1/movies?id=${slug}&channel_id=${channel}`;
    } else {
        url = `https://api.kamyroll.tech/content/v1/seasons?id=${slug}&channel_id=${channel}`;
    }
    const options = {
        headers: {
            'User-Agent': 'Kamyroll/0.3.6 Tauri-Rust',
            'Authorization': `Bearer ${token}`,
        },
        method: "GET",
    }
    let episodes = [];
    let response = await fetch(url, options);
    console.log(response);
    if (response.status != 200) {
        console.log(response);
        return;
    }
    let result = response.data;
    if (type == 'series') {
        for (let season of result.items) {
            let season_title = season.title;
            for (let epi of season.episodes) {
                if (epi.episode != 'Bande Annonce') {
                    let titre = `S${epi.season_number} Episode ${epi.episode}: ` + epi.title;
                    let id = epi.id;
                    if(id.includes('vf')){
                        titre += ' (VF)';
                    }else if(id.includes('vostfr')){
                        titre += ' (VOSTFR)';
                    }
                    let desc = epi.description;
                    let image = "";
                    try {
                        image = epi.images.thumbnail[1].source;
                    } catch (e) {
                        image = epi.images.thumbnail[0].source;
                    }
                    let link = '';
                    if (channel ==  'crunchyroll') {
                        link = '/crunchyroll/watch/' + id;
                    } else if(channel ==  'adn'){
                        link = '/adn/watch/' + id;
                    }else if(channel ==  'neko-sama'){
                        link = '/nekosama/watch/' + id;
                    }
                    let is_dubbed = epi.is_dubbed;
                    let is_subbed = epi.is_subbed;
                    let duration = epi.duration_ms;
                    duration = Math.floor(duration / 60000);
                    let finalData = new episode(titre, link, desc, image, is_dubbed, is_subbed,duration);
                    episodes.push(finalData);
                }
            }
        }
    } else if (type == 'movie_listing') {
        for (const epi of result.items) {
            let titre = epi.title;
            let id = epi.id;
            if(id.includes('vf')){
                titre += ' (VF)';
            }else if(id.includes('vostfr')){
                titre += ' (VOSTFR)';
            }
            let desc = epi.description;
            let image = "";
            try {
                image = epi.images.thumbnail[1].source;
            } catch (e) {
                image = epi.images.thumbnail[0].source;
            }
            let link = '';
            if (channel == 'crunchyroll') {
                link = '/crunchyroll/watch/' + id;
            } else if(channel == 'adn'){
                link = '/adn/watch/' + id;
            } else if(channel == 'neko-sama'){
                link = '/nekosama/watch/' + id;
            }
            let is_dubbed = epi.is_dubbed;
            let is_subbed = epi.is_subbed;
            let duration = epi.duration_ms;
            duration = Math.floor(duration / 60000);
            let finalData = new episode(titre, link, desc, image, is_dubbed, is_subbed,duration);
            episodes.push(finalData);
        }
    }
    return episodes;
}

async function search(query){
    let results = [];
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Kamyroll/0.3.6 Tauri-Rust',
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
    const proxy_url = 'http://127.0.0.1:15411';
    let videos = [];
    let subtitles = [];
    var streams = '';
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
            console.log(result);
            for (streams of result.streams) {
                var quality = streams.audio_locale + ' ' + streams.hardsub_locale;
                var link = streams.url;
                videos.push(new Videos(quality, link));
            }
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
                subtitles.push(new Subs('No subtitles', '', {}, ''));
            }
        } else if (window.location.href.includes('/adn/')) {
            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });
            let result = response.data;
            for (streams of result.streams) {
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
                    if (link.includes('kamyroll')) {
                        link = 'https://corsproxy.io/?' + encodeURIComponent(link);
                    }
                    let type = subs.format;
                    let style = {
                        fontSize: '40px',
                    };
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
            if(subtitles[i].html == 'fr-FR'){
                let temp = subtitles[0];
                subtitles[0] = subtitles[i];
                subtitles[i] = temp;
            }
        }

        return {
            streams:videos, 
            subs: subtitles
        };
    } catch (e) {
        console.log(e);
    }
}

export {getEpisodes,search,getVideos,getLastEpisodes};