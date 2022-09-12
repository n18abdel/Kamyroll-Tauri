<script setup>
import {fetch ,Body} from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri'
</script>


<template>
    <Suspense>
        <template v-if="channel=='crunchyroll'" #default>
            <article class="erc-hero-card" :id="trending[random].id">
                <div class="erc-hero-card-background-overlay bottom-angled"><span
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
        </template>
        <template v-if="channel=='neko-sama'" #default>
            <article class="erc-hero-card" :id="trending[random].id">
                <div class="erc-hero-card-background-overlay bottom-angled"><span
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
        </template>
        <template v-if="channel=='animedigitalnetwork'" #default>
            <article class="erc-hero-card" :id="trending[random].id">
                <div class="erc-hero-card-background-overlay bottom-angled"><span
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
        </template>
    </Suspense>
</template>

<script>
export default {
    data() {
        return {
            trending:[],
            random: null,
            channel: localStorage.getItem('channel')
        }
    },
    methods: {
        checkToken() {
            if (localStorage.getItem('channel') != this.channel) {
                this.$forceUpdate()
                window.location.reload();
            }
        }
    },
    beforeCreate: async function () {
        function Trending(title, link, image, bannerImage, description, status, id) {
            this.title = title;
            this.link = link;
            this.image = image;
            this.bannerImage = bannerImage;
            this.description = description;
            this.status = status;
            this.id = id;
        }

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
                const getTrending = async () => {
                    return new Promise(async (resolve) => {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            body: Body.text(JSON.stringify(params))
                        });
                        console.log(response.data)
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
                            description = description.replace(/<(?:.|\n)*?>/gm, '').trim();
                            for (const provider of providers) {
                                if (provider.site == 'VRV') {
                                    id = provider.url.split('/')[4];
                                    break
                                }
                            }
                            if (id != '') {
                                const link = "/crunchyroll/" + id;
                                trends.push(new Trending(tMedia.title.romaji, link, tMedia.coverImage.large, bannerImage, description, tMedia.status, id));
                            }
                        }
                        resolve(trends);
                    });
                
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
                console.log(doc);
                let trendings = doc.querySelectorAll('#home > div > div:nth-child(6) .row.anime-listing div.text-left');
                let trends = [];
                for (var x = 0; x < trendings.length; x++) {
                    let tMedia = trendings[x];
                    let title = tMedia.querySelector('a').title;
                    var link = tMedia.querySelector('a').href;
                    let image = tMedia.querySelector('img.lazy').dataset.src;
                    let bannerImage = image;
                    let description = tMedia.querySelector('.episode').innerText;
                    link = '/neko-sama/' + link.split('/').pop().split('-')[0];
                    console.log(link)
                    let id = link.split('/').pop().split('-')[0];
                    trends.push(new Trending(title, link, image, bannerImage, description, 'unknown', id));
                }
                this.trending = trends;
            } else if (localStorage.getItem('channel') == 'animedigitalnetwork'){
                let request = await fetch('https://gw.api.animationdigitalnetwork.fr/show/carousel?limit=15', {
                    method: 'GET'
                });
                let response = request.data;
                let trends = [];
                for (var x = 0; x < response.shows.length; x++) {
                    let tMedia = response.shows[x];
                    let title = tMedia.title;
                    let image = tMedia.image2x;
                    let bannerImage = tMedia.imageHorizontal2x;
                    let description = tMedia.summary;
                    let id = tMedia.id;
                    let link = '/adn/' + id;
                    let finalData = new Trending(title, link, image, bannerImage, description, 'unknown', id);
                    trends.push(finalData);
                }
                this.trending = trends;
            }
            this.random = '' + getRandomInt(0, this.trending.length);
        invoke('close_splashscreen');
    },
    mounted() {
        setInterval(this.checkToken, 1000);
    }

}
</script>