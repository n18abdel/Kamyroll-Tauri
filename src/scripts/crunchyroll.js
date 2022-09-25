import {
    fetch
} from '@tauri-apps/api/http'
import {
    episode,finalData
} from './constructor.js'
import {
    token
} from './token.js'
import {
    chan,setChannel
} from './channel_id.js'

async function getEpisodes(slug, type) {
    if(window.location.href.includes('adn')){
        setChannel('animedigitalnetwork');
    }else if(window.location.href.includes('neko')){
        setChannel('neko-sama');
    }else{
        setChannel('crunchyroll');
    }
    let url = "";
    if (type == 'movie_listing') {
        url = `https://kamyroll.herokuapp.com/content/v1/movies?id=${slug}&channel_id=${chan}`;
    } else {
        url = `https://kamyroll.herokuapp.com/content/v1/seasons?id=${slug}&channel_id=${chan}`;
    }
    const options = {
        headers: {
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
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
                    if (chan == 'crunchyroll') {
                        link = '/crunchyroll/watch/' + id;
                    } else if(chan == 'animedigitalnetwork'){
                        link = '/adn/watch/' + id;
                    }else if(chan == 'neko-sama'){
                        link = '/nekosama/watch/' + id;
                    }
                    let is_dubbed = epi.is_dubbed;
                    let is_subbed = epi.is_subbed;
                    let finalData = new episode(titre, link, desc, image, is_dubbed, is_subbed);
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
            let image = ""
            try {
                image = epi.images.thumbnail[1].source;
            } catch (e) {
                image = epi.images.thumbnail[0].source;
            }
            let link = '';
            if (chan == 'crunchyroll') {
                link = '/crunchyroll/watch/' + id;
            } else if(chan == 'animedigitalnetwork'){
                link = '/adn/watch/' + id;
            } else if(chan == 'neko-sama'){
                link = '/nekosama/watch/' + id;
            }
            let is_dubbed = epi.is_dubbed;
            let is_subbed = epi.is_subbed;
            let finalData = new episode(titre, link, desc, image, is_dubbed, is_subbed);
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
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
        }
    };
    console.log(query);
    let url = `https://kamyroll.herokuapp.com/content/v1/search?query=${query.replaceAll(' ','+')}&limit=100&channel_id=${chan}`;
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
            if(chan=="animedigitalnetwork"){
                link = '/adn/' + item.id;
            } else if (chan=="neko-sama"){
                link = '/nekosama/' + item.id;
            } else if(chan=="crunchyroll"){
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

export {getEpisodes,search};