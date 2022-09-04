<script setup>
import {fetch ,Body} from '@tauri-apps/api/http';
import { invoke } from '@tauri-apps/api/tauri'
</script>


<template>
  <Suspense>
    <template v-if="channel=='crunchyroll'" #default>
        <article  class="erc-hero-card" :id="trending[random].id">
                        <div class="erc-hero-card-background-overlay bottom-angled"><span
                                class="background-gradient"></span><img class="background-image" :src="trending[random].image"
                                :alt="trending[random].title"></div>
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
  </Suspense>
</template>

<script>
export default {
    data() {
        return {
            trending: null,
            random: null,
            channel : localStorage.getItem('channel')
        }
    },
    beforeCreate: async function () {
        function Trending(title, link, image,description,status,id) {
            this.title = title;
            this.link = link;
            this.image = image;
            this.description = description;
            this.status = status;
            this.id = id;
        }

        function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
        if(localStorage.getItem('channel')=='crunchyroll'){
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
            return new Promise(async(resolve) => {
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
            let providers= tMedia.externalLinks;
            var id = '';
            var description = tMedia.description;
            description = description.replace(/<(?:.|\n)*?>/gm, '').trim();
            for (const provider of providers){
                if(provider.site == 'VRV'){
                    id = provider.url.split('/')[4];
                }
            }
            if(id != ''){
                const link = "/crunchyroll/"+id;
                trends.push(new Trending(tMedia.title.romaji, link, tMedia.coverImage.large,description, tMedia.status, id));
                }
            }
            resolve(trends);
        });}
        this.trending = await getTrending();
        this.random = '' + getRandomInt(0,this.trending.length);
        }
        
        invoke('close_splashscreen');
    }
}
</script>