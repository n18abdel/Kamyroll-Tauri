<script setup>
import {fetch ,Body} from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri'
</script>


<template>
        <div class="crunchyroll" v-if="channel=='crunchyroll' && trending.length >= 1 " >
            <div class="erc-feed-container">
            <article class="erc-hero-card" >
                <div class="erc-hero-card-background-overlay top-angled bottom-angled"><span
                        class="background-gradient"></span><img class="background-image"
                        :src="trending[random].bannerImage" :alt="trending[random].title"></div>
                <div class="foreground">
                    <div class="main-image-wrapper-link">
                        <div class="main-image-wrapper"><a class="poster-hover-layer" :href="trending[random].link">to
                                series</a><img :src="trending[random].image" class="c-content-image"
                                :alt="trending[random].title"></div>
                    </div>
                    <section class="info"><a class="title-link" :href="trending[random].link">
                            <h1 class="title">{{trending[random].title}}</h1>
                    </a>
                        <div class="additional-information">
                            <div class="c-meta-tags media-tag-group"><span class="c-meta-tags__type">Series</span><span
                                    class="c-meta-tags__language">Subtitled</span></div>
                        </div>
                        <p class="description">{{trending[random].description}}</p>
                        <div class="watch-actions"><a role="button" tabindex="0"
                                class="go-watch c-button -type-one-weak" data-t="watching-btn"
                                :href="trending[random].link"><svg class="" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg" data-t="play-arrow-svg">
                                    <polygon points="0 0 0 20 20 10"></polygon>
                                </svg><span>Start Watching</span></a></div>
                    </section>
                </div>
            </article>
    
    </div>
        </div>
        <div class="neko-sama" v-if="channel=='neko-sama' && trending.length >= 1" >
            <article class="erc-hero-card" :id="trending[random].id">
                <div class="erc-hero-card-background-overlay top-angled bottom-angled"><span
                        class="background-gradient"></span><img class="background-image"
                        :src="trending[random].bannerImage" :alt="trending[random].title"></div>
                <div class="foreground">
                    <div class="main-image-wrapper-link">
                        <div class="main-image-wrapper"><a class="poster-hover-layer" :href="trending[random].link">to
                                series</a><img :src="trending[random].image" class="c-content-image"
                                :alt="trending[random].title"></div>
                    </div>
                    <section class="info"><a class="title-link" :href="trending[random].link">
                            <h1 class="title">{{trending[random].title}}</h1>
                        </a>
                        <div class="additional-information">

                        </div>
                        <p class="description">{{trending[random].description}}</p>
                        <div class="watch-actions"><a role="button" tabindex="0"
                                class="go-watch c-button -type-one-weak" data-t="watching-btn"
                                :href="trending[random].link"><svg class="" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg" data-t="play-arrow-svg">
                                    <polygon points="0 0 0 20 20 10"></polygon>
                                </svg><span>Start Watching</span></a></div>
                    </section>
                </div>
            </article>
        </div>
        <div class="adn" v-if="channel=='adn' && trending.length >= 1 " >
            <article class="erc-hero-card" :id="trending[random].id">
                <div class="erc-hero-card-background-overlay top-angled bottom-angled"><span
                        class="background-gradient"></span><img class="background-image"
                        :src="trending[random].bannerImage" :alt="trending[random].title"></div>
                <div class="foreground">
                    <div class="main-image-wrapper-link">
                        <div class="main-image-wrapper"><a class="poster-hover-layer" :href="trending[random].link">to
                                series</a><img :src="trending[random].image" class="c-content-image"
                                :alt="trending[random].title"></div>
                    </div>
                    <section class="info"><a class="title-link" :href="trending[random].link">
                            <h1 class="title">{{trending[random].title}}</h1>
                        </a>
                        <div class="additional-information">
                            <div class="c-meta-tags media-tag-group">
                                <span class="c-meta-tags__type">{{trending[random].type}}</span>
                                <span class="c-meta-tags__language">{{trending[random].lang}}</span>
                            </div>
                        </div>
                        <p class="description">{{trending[random].description}}</p>
                        <div class="watch-actions"><a role="button" tabindex="0"
                                class="go-watch c-button -type-one-weak" data-t="watching-btn"
                                :href="trending[random].link"><svg class="" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg" data-t="play-arrow-svg">
                                    <polygon points="0 0 0 20 20 10"></polygon>
                                </svg><span>Start Watching</span></a></div>
                    </section>
                </div>
            </article>
        </div>
</template>

<script>
    import { trend } from '../scripts/constructor.js';
export default {
    data() {
        return {
            trending: [] ,
            random: 0,
            channel: localStorage.getItem('channel')
        }
    },
    methods: {
        checkChannel() {
            if (localStorage.getItem('channel') != this.channel) {
                this.$forceUpdate()
                window.location.reload();
            }
        }
    },
    beforeMount: async function () {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        if (localStorage.getItem('channel') == 'crunchyroll') {
            const url = 'https://graphql.anilist.co/';
            const params = {
                    query: `{
                            Page(page: 1, perPage: 15) {
                                media(type: ANIME, sort: TRENDING_DESC, status: RELEASING) {
                                id
                                title {
                                    romaji
                                    english
                                    native
                                }
                                bannerImage
                                coverImage {
                                    large
                                }
                                externalLinks {
                                    id
                                    site
                                    url
                                }
                                description
                                status
                                }
                            }
                    }`
                };
                async function getTrending(){
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: Body.text(JSON.stringify(params))
                    });
                    let trends = [];
                    for (var x = 0; x < response.data.data.Page.media.length; x++) {
                        let tMedia = response.data.data.Page.media[x];
                        let providers = tMedia.externalLinks;
                        var id = '';
                        var bannerImage = tMedia.bannerImage;
                        if (bannerImage == null) {
                            bannerImage = tMedia.coverImage.large;
                        }
                        var description = tMedia.description;
                        try{
                            description = description.replace(/<(?:.|\n)*?>/gm, '').trim();
                        } catch (e) {
                            description = "No Description";
                        }
                        for (const provider of providers) {
                            if (provider.site == 'VRV') {
                                id = provider.url.split('/')[4];
                                break
                            }
                        }
                        if (id != '' || id == null || id == undefined) {
                            let link = "/crunchyroll/" + id;
                            trends.push(new trend(tMedia.title.romaji, link, tMedia.coverImage.large, bannerImage, description, tMedia.status, id));
                        }
                    }
                    return trends;
                }
                this.trending = await getTrending();
            } else if (localStorage.getItem('channel') == 'neko-sama'){
                let request = await fetch('https://neko-sama.fr/', {
                    method: 'GET',
                    responseType: 2
                });
                let response = request.data;
                let parser = new DOMParser();
                let doc = parser.parseFromString(response, "text/html");
                let trendings = doc.querySelectorAll('#home > div > div:nth-child(6) .row.anime-listing div.text-left');
                let trends = [];
                for (var x = 0; x < trendings.length; x++) {
                    let tMedia = trendings[x];
                    let title = tMedia.querySelector('a').title;
                    var link = tMedia.querySelector('a').href;
                    let image = tMedia.querySelector('img.lazy').dataset.src;
                    let bannerImage = image;
                    let description = tMedia.querySelector('.episode').innerText;
                    link = '/nekosama/' + link.split('/').pop().split('-')[0];
                    let id = link.split('/').pop().split('-')[0];
                    trends.push(new trend(title, link, image, bannerImage, description, 'unknown', id));
                }
                this.trending = trends;
            } else if (localStorage.getItem('channel') == 'adn'){
                let request = await fetch('https://gw.api.animationdigitalnetwork.fr/show/carousel?limit=15', {
                    method: 'GET'
                });
                let response = request.data;
                console.log(response.shows)
                let trends = [];
                for (var x = 0; x < response.shows.length; x++) {
                    let tMedia = response.shows[x];
                    let title = tMedia.title;
                    let image = tMedia.image2x;
                    let bannerImage = tMedia.imageHorizontal2x;
                    let description = tMedia.summary;
                    let id = tMedia.id;
                    let link = '/adn/' + id;
                    let lang = tMedia.languages;
                    if(lang.length > 2){
                        lang = 'Sub | Dub';
                    } else if (lang[0]=='vostf'){
                        lang = 'Sub';
                    } else if (lang[0]=='vf') {
                        lang = 'Dub';
                    } else {
                        lang = 'Unknown';
                    }
                    let type = tMedia.type;
                    if(type == 'EPS'){
                        type = 'Series';
                    } else if (type == 'MOV'){
                        type = 'Movie';
                    } else {
                        type = 'Unknown';
                    }
                    let finalData = new trend(title, link, image, bannerImage, description, 'unknown', id, lang, type);
                    trends.push(finalData);
                }
                this.trending = trends;
            }
            
            this.random = '' + getRandomInt(0, this.trending.length);
            await invoke('close_splashscreen');
    }

}
</script>