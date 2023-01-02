<script setup>
import adn_logo from '/img/adn.svg';
import crunchyroll_logo from '/img/crunchyroll.svg';
import neko_logo from '/img/neko-sama.svg';
</script>
<template>
<div class="erc-feed-container">
    <div class="erc-shelf-feed-item" v-if="episodes.length == 0" id="continue-watching-placeholder">
        <h1 class="feed-title">Continue Watching</h1>
        <div class="erc-cards-collection" >
            <div class="erc-cards-collection">
                <div class="card placeholder" v-for="anime in 6">
                    <article class="erc-series-movie-card placeholder">
                        <a title="" class="card-link" href=""></a>
                        <div class="watch-tag-list">
                            <div class="erc-info-tags-group"></div>
                        </div>
                        <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><a class="erc-channel-icon"
                                href="#">
                                <div class="channel-mask">
                                    <div class="channel-background" v-if="channel=='crunchyroll'" style="background-color: rgb(244, 117, 33);"></div>
                                    <div class="channel-background" v-else-if="channel=='adn'" style="background-color: #0095ff;"></div>
                                    <div class="channel-background" v-else-if="channel=='neko-sama'" style="background-color: #1cb9f4;"></div>
                                    <img class="channel-icon" v-if="channel == 'crunchyroll'" :src="crunchyroll_logo" alt="Crunchyroll icon">
                                    <img class="channel-icon" v-else-if="channel == 'adn'" :src="adn_logo" alt="Anime Digital Network icon">
                                    <img class="channel-icon" v-else-if="channel == 'neko-sama'" :src="neko_logo" alt="Neko-sama icon">
                                </div>
                            </a></div>
                        <div class="body-section">
                            <div class="poster-image"></div>
                            <div class="info">
                                <div class="description-metadata"></div>
                                <div class="details-metadata">
                                    <div class="c-meta-tags media-tag-group"></div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
    <div class="erc-shelf-feed-item" id="continue-watching" v-else-if="episodes.length >= 1 && episodes[0] != 'nothing'">
            <h1 class="feed-title">Continue Watching</h1>
            <div class="erc-cards-collection">
                <div class="card" v-for="episode of episodes">
                    <div>
                        <article class="erc-series-movie-card" :id="episode.id">
                            <a :title="episode.title" class="card-link"
                                :href="episode.url"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);">
                                <img v-if="(Object.keys(episode.images).length == 3 && episode.images.thumbnail.length >= 2)" :src="episode.images.thumbnail[1].source" class="c-content-image image" :alt="episode.title">
                                <img v-else :src="episode.images.poster_wide[1].source" class="c-content-image image" :alt="episode.title">
                                <span class="erc-channel-icon" @mouseenter="setWidth($event)" @mouseleave="$event.target.style=''">
                                    <div class="channel-mask">
                                        <div class="channel-background" v-if="channel=='crunchyroll'" style="background-color: rgb(244, 117, 33);"></div>
                                        <div class="channel-background" v-else-if="channel=='adn'" style="background-color: #0095ff;"></div>
                                        <div class="channel-background" v-else-if="channel=='neko-sama'" style="background-color: #1cb9f4;"></div>
                                        <img class="channel-icon" v-if="channel=='crunchyroll'" :src="crunchyroll_logo" alt="Crunchyroll icon">
                                        <img class="channel-icon" v-else-if="channel=='adn'" :src="adn_logo" alt="ADN icon">
                                        <img class="channel-icon" v-else :src="neko_logo" alt="Neko-sama icon">
                                        <span class="channel-name" v-if="channel=='crunchyroll'">Crunchyroll</span>
                                        <span class="channel-name" v-else-if="channel=='adn'">ADN</span>
                                        <span class="channel-name" v-else>Neko-sama</span>
                                    </div>
                                </span>
                                <div class="progress-bar" :style="{'width':`${episode.time}%`}"></div>
                            </div>
                            <div class="body-section">
                                <div class="poster-image">
                                    <img :src="episode.images.poster_tall[2].source" class="c-content-image" :alt="episode.series_title">
                                </div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>{{episode.series_title}}</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group">
                                            <span class="c-meta-tags__type">{{episode.time}}% Ep.{{episode.episode}}</span>
                                            <span class="c-meta-tags__language" v-if="episode.is_subbed && episode.is_dubbed">Sub | Dub</span>
                                            <span class="c-meta-tags__language" v-else-if="episode.is_subbed">Sub</span>
                                            <span class="c-meta-tags__language" v-else>Dub</span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
    </div>
    <div class="erc-shelf-feed-item" id="continue-watching" v-else>
    </div>
</div>
        
</template>

<script>
import { db } from '../scripts/db.js'
import getMetadata from '../scripts/getMetadata.js'
    export default {
        data() {
            return {
                episodes: [],
                channel: localStorage.getItem('channel'),
            }
        },
        methods: {
            async getEpisodes() {
                let series = await db.anime_saved.where('channel').equals(this.channel).toArray()
                for(let serie of series){
                    let episodes = serie.episodes_seen;
                    for(let epi of episodes){
                        if(epi.time <= 98){
                            let metadata = await getMetadata(epi.episode);
                            let id = metadata.series_id == undefined ? metadata.id : metadata.series_id;
                            let series_info = await getMetadata(id);
                            metadata.images.poster_tall = series_info.images.poster_tall;
                            metadata.images.poster_wide = series_info.images.poster_wide;
                            metadata.time = epi.time;
                            this.episodes.push(metadata);
                        }
                    }
                }
                if(this.episodes.length == 0){
                    this.episodes = ['nothing'];
                }
            },
            setWidth(el){
                if(this.channel=='adn'){
                    el.target.style ='width:65px'
                }else if(this.channel == 'neko-sama'){
                    el.target.style ='width:112px'
                }
                else {
                    el.target.style="width:132px"
                }
            }
            
        },
        mounted: function () {
            this.getEpisodes();
            if (this.channel == 'crunchyroll') {
                while (this.counter >= 5) {
                    setInterval(() => {
                        this.counter++;
                    }, 1000);
                }
            }
        },
    }
    
</script>
