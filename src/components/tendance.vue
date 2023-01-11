<template>
    <div class="erc-feed-container" v-if="!(trending.length >= 1)">
        <article class="erc-hero-card">
            <div class="erc-hero-card-background-overlay top-angled bottom-angled"><span
                    class="background-gradient"></span>
                    <img class="background-image" src="">
            </div>
            <div class="foreground">
                <div class="main-image-wrapper-link">
                    <div class="main-image-wrapper"><a class="poster-hover-layer" href="#">to
                            series</a></div>
                </div>
                <section class="info"><a class="title-link" href="#">
                        <h1 class="title"></h1>
                    </a>
                    <div class="additional-information">
                        <div class="c-meta-tags media-tag-group">
                        </div>
                    </div>
                    <div class="watch-actions"><a role="button" tabindex="0" class="go-watch c-button -type-one-weak"
                            data-t="watching-btn" href="#"><svg class="" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg" data-t="play-arrow-svg">
                                <polygon points="4 3 4 20 20 10"></polygon>
                            </svg><span>Start Watching</span></a></div>
                </section>
            </div>
        </article>
    </div>
    <div class="erc-feed-container" v-else>
        <article class="erc-hero-card">
            <div class="erc-hero-card-background-overlay top-angled bottom-angled"><span
                    class="background-gradient"></span>
                    <img v-if="trending[random].images.poster_wide.length > 1" class="background-image" :src="trending[random].images.poster_wide[trending[random].images.poster_wide.length - 1].source"
                    :alt="trending[random].title">
                    <img v-else class="background-image" :src="trending[random].images.poster_tall[trending[random].images.poster_tall.length - 1].source" :alt="trending[random].title">
            </div>
            <div class="foreground">
                <div class="main-image-wrapper-link">
                    <div class="main-image-wrapper"><a class="poster-hover-layer" :href="trending[random].link">to
                            series</a><img
                            :src="trending[random].images.poster_tall[trending[random].images.poster_wide.length - 1].source"
                            class="c-content-image" :alt="trending[random].title"></div>
                </div>
                <section class="info"><a class="title-link" :href="trending[random].link">
                        <h1 class="title">{{trending[random].series_title}}</h1>
                    </a>
                    <div class="additional-information">
                        <div class="c-meta-tags media-tag-group">
                            <span class="c-meta-tags__type" v-if="trending.series_id == undefined">Series</span>
                            <span class="c-meta-tags__type" v-else>Movie</span>
                            <span class="c-meta-tags__language" v-if="trending.is_subbed">Subtitled</span>
                            <span class="c-meta-tags__language" v-else-if="trending.is_dubbed && trending.is_subbed">Sub | Dub</span>
                            <span class="c-meta-tags__language" v-else>Dubbed</span>
                        </div>
                    </div>
                    <p class="description">{{trending[random].description}}</p>
                    <div class="watch-actions"><a role="button" tabindex="0" class="go-watch c-button -type-one-weak"
                            data-t="watching-btn" :href="trending[random].link"><svg class="" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg" data-t="play-arrow-svg">
                                <polygon points="4 3 4 20 20 10"></polygon>
                            </svg><span>Start Watching</span></a></div>
                </section>
            </div>
        </article>
    </div>
</template>

<script>
    import { trend } from '../scripts/constructor.js';
    import {getLastEpisodes} from '../scripts/crunchyroll.js';
    import getMetadata from '../scripts/getMetadata.js';
export default {
    data() {
        return {
            trending: [],
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
            let trending = await getLastEpisodes();
            this.random = '' + getRandomInt(0, trending.length);
            let id = trending[this.random].series_id == undefined ? trending[this.random].id : trending[this.random].series_id;
            let description_series = await getMetadata(id);
            trending[this.random].description = description_series.description;
            let channel = this.channel;
            if(this.channel == 'neko-sama'){
                channel = 'nekosama';
            }
            trending[this.random].link = `/${channel}/${id}`;
            this.trending = trending;
    }
}
</script>

<style scoped>
*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    border-radius: 10px;
}
</style>