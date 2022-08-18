<script setup>
import {fetch ,Body} from '@tauri-apps/api/http';
let query = ref("");

</script>
<template>
    <div class="search">
        <div class="erc-search">
            <div class="search-header-wrapper state-search-results">
                <div class="erc-search-field">
                    <div class="content">
                        <form class="search-input-wrapper state-narrow">
                            <input type="text" v-model="query" placeholder="Rechercher" class="search-input" @keydown.enter.prevent="search">
                            <button class="search-button" type="sumbit" @click="search">
                                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    data-t="search-svg">
                                    <path
                                        d="M2,10.666V5.333L5.333,2h5.333L14,5.333v5.333L10.667,14H5.333ZM4.364,0,0,4.363v7.273L4.364,16h7.273l1.757-1.757L18,20h2V18l-5.757-4.606L16,11.637V4.363L11.637,0Z">
                                    </path>
                                </svg></button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="search-results-wrapper state-search-results">
                <div class="content">
                    <div class="search-result-collection">
                        <div class="search-card-list">
                            <div v-for="anime of results" class="search-series-movie-card">
                                <article class="erc-search-series-movie-card" style="border-color: rgb(244, 33, 33);">
                                    <a :title="anime.title" class="card-link"
                                        :href="anime.link"></a>
                                    <div class="search-card-content">
                                        <div class="thumbnail">
                                            <img :src="anime.image" class="c-content-image" :alt="anime.title">

                                        </div>
                                        <section class="info">
                                            <div class="series-movie-info">
                                                <h1 class="series-movie-title">{{anime.title}}</h1>
                                                <div class="series-movie-details">
                                                    <span v-if="anime.season_count>1" class="series-info-elem seasons-number">{{anime.season_count}} Seasons,</span>
                                                    <span v-else-if="anime.season_count<=1" class="series-info-elem seasons-number">{{anime.season_count}} Season,</span>
                                                    <span v-if="anime.episode_count>1" class="series-info-elem episodes-number">{{anime.episode_count}} Episodes</span>
                                                    <span v-else-if="anime.episode_count<=1" class="series-info-elem episodes-number">{{anime.episode_count}} Episode</span>
                                                </div>
                                            </div>
                                            <p class="channel-name">Crunchyroll</p>
                                            <div class="c-meta-tags annotation">
                                               <span v-if="anime.is_subbed && !anime.is_dubbed" class="c-meta-tags__language">Sub</span>
                                               <span v-else-if="anime.is_dubbed && !anime.is_subbed" class="c-meta-tags__language">Dub</span>
                                               <span v-else-if="anime.is_subbed && anime.is_dubbed" class="c-meta-tags__language">Sub | Dub</span>
                                               <span v-else class="c-meta-tags__language">Unknown</span>
                                            </div>
                                        </section>
                                    </div>
                                </article>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
     
    </div>
</template>

<script>
export default { 
    data(){
        return{
            results:null
        }
    },
    methods:{
         infoAnime(title,  url, image, description, episodes, status, is_dubbed,is_subbed,is_mature,is_simulcast,maturity_ratings) {
        this.title = title;
        this.url = url;
        this.image = image;
        this.description = description;
        this.episodes = episodes;
        this.status = status;
        this.is_dubbed = is_dubbed;
        this.is_subbed= is_subbed;
        this.is_mature = is_mature;
        this.is_simulcast = is_simulcast;
        this.maturity_ratings = maturity_ratings;
      },
        async getToken() {
        const url = 'https://kamyroll.herokuapp.com/auth/v1/token';
        const headers = {
          'Authorization': 'Basic vrvluizpdr2eby+RjSKM17dOLacExxq1HAERdxQDO6+2pHvFHTKKnByPD7b6kZVe1dJXifb6SG5NWMz49ABgJA==',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        try {
          var body = Body.text(
            'refresh_token=IV%2BFtTI%2BSYR0d5CQy2KOc6Q06S6aEVPIjZdWA6mmO7nDWrMr04cGjSkk4o6urP%2F6yDmE4yzccSX%2FrP%2FOIgDgK4ildzNf2G%2FpPS9Ze1XbEyJAEUyN%2BoKT7Gs1PhVTFdz%2FvYXvxp%2FoZmLWQGoGgSQLwgoRqnJddWjqk0ageUbgT1FwLazdL3iYYKdNN98BqGFbs%2Fbaeqqa8aFre5SzF%2F4G62y201uLnsElgd07OAh1bnJOy8PTNHpGqEBxxbo1VENqtYilG9ZKY18nEz8vLPQBbin%2FIIEjKITjSa%2BLvSDQt%2F0AaxCkhClNDUX2uUZ8q7fKuSDisJtEyIFDXtuZGFhaaA%3D%3D&grant_type=refresh_token&scope=offline_access'
          )
          const response = await fetch(url, {
            method: "POST",
            body: body,
            headers: headers

          })
          let result = response.data;
          return result;
        } catch (e) {
          console.log(e);
        }
      },
        async search() {
            const finalData = (title, image, desc, type, maturity_ratings, link, is_dubbed, is_subbed, is_mature, is_simulcast,season_count,episode_count) => {
                    return {
                        title: title,
                        image: image,
                        desc: desc,
                        type: type,
                        maturity_ratings: maturity_ratings,
                        link: link,
                        is_dubbed: is_dubbed,
                        is_subbed: is_subbed,
                        is_mature: is_mature,
                        is_simulcast: is_simulcast,
                        season_count: season_count,
                        episode_count: episode_count
                    }
                }
            this.results = null;
            const results = [];
            let query = document.querySelector('.search-input').value;
            const token = await this.getToken();
            const options = {
                headers: {
                    'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
                    'Authorization': `Bearer ${token.access_token}`,
                }
            };
            const request = await fetch(`https://kamyroll.herokuapp.com/content/v1/search?query=${query}&limit=100&channel_id=crunchyroll`,options);
            console.log(request);
            const response = request.data;
            const data = response;
            for (const anime of data.items) {
                for (const item of anime.items) {
                    var title = item.title;
                    var image = item.images.poster_tall.pop().source;
                    var desc = item.descripion;
                    var type = item.media_type;
                    console.log(type);
                    if (type == 'movie_listing'){
                        var metadata = item.movie_listing_metadata;
                    } else{
                        var metadata = item.series_metadata;
                    }
                    var link = '/anime/' + item.id;
                    var maturity_ratings = metadata.maturity_ratings;
                    var is_dubbed = metadata.is_dubbed;
                    var is_subbed = metadata.is_subbed;
                    var is_mature = metadata.is_mature;
                    try{
                        var is_simulcast = metadata.is_simulcast;
                        var season_count = metadata.season_count;
                        var episode_count = metadata.episode_count;
                    }catch(e){
                        var is_simulcast = false;
                        var season_count = 0;
                        var episode_count = 0;
                    }
                    results.push(finalData(title, image, desc, type, maturity_ratings, link, is_dubbed, is_subbed, is_mature, is_simulcast,season_count,episode_count));
                }
                
            }
            console.log(results);
            this.results = results;
}
    }
}

</script>

<style scoped>
.erc-search {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    left: 0;
    overflow-y: auto;
    right: 0;
    top: 0;
    z-index: 1001;
    padding: 100px;
}

.erc-search .content {
    margin: 0 auto;
    max-width: 65.63rem;
    padding: 0 1.25rem;
    position: relative
}

.erc-search .modal-title {
    text-rendering: optimizeLegibility;
    align-items: center;
    color: #f9f9fa;
    color: #b0aebb;
    display: flex;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.43;
    margin-bottom: 1.25rem;
    text-transform: uppercase
}

.erc-search .modal-back-button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin-right: .5rem;
    padding: 0 0 0 .25rem;
    width: 7.275rem
}

.erc-search .modal-back-button .modal-back-icon {
    fill: #00b4ff;
    display: block;
    height: 1.25rem;
    width: .67rem
}

.erc-search .modal-back-button span {
    text-rendering: optimizeLegibility;
    color: #f9f9fa;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.43
}


.erc-search .state-hidden-mobile {
    display: none
}


@media screen and (min-width:35.5em) {
    .erc-search .search-header-wrapper {
        padding: 2.125rem 0 1.125rem
    }

    .erc-search .content {
        padding: 0 2.5rem
    }
}

@media screen and (min-width:35.5em) {
    .erc-search .search-header-wrapper {
        padding: 2.125rem 0 1.125rem
    }

    .erc-search .content {
        padding: 0 2.5rem
    }
}

@media screen and (min-width:50em) {
    .erc-search .state-visible-mobile {
        display: none
    }

    .erc-search .search-header-wrapper {
        padding: 2.125rem 0 1.125rem
    }

    .erc-search .search-header-wrapper.state-search-results {
        padding: 2.125rem 0 0
    }

    .erc-search .state-search-results .erc-search-field {
        padding-bottom: .625rem
    }
}

@media screen and (min-width:50em) and (min-height:43.75rem) {
    .erc-search .state-visible-mobile {
        display: none
    }

    .erc-search .state-hidden-mobile {
        display: block
    }

    .erc-search .search-header-wrapper {
        padding: 2.875rem 0 1.0625rem
    }

    .erc-search .search-header-wrapper.state-search-results {
        padding: 2.875rem 0 0
    }

    .erc-search .search-header-wrapper.state-search-results .erc-search-field {
        padding-bottom: 1rem
    }

    .erc-search .search-filters-container .search-filters-title {
        display: block
    }
}

.erc-search-field {
    padding-bottom: 1rem
}

.erc-search-field .search-input-wrapper {
    margin-right: 5rem;
    max-width: 37.5rem;
    position: relative
}

.erc-search-field .search-input {
    text-rendering: optimizeLegibility;
    background-color: initial;
    border: none;
    border-bottom: .125rem solid #5e5c70;
    box-sizing: border-box;
    color: #f9f9fa;
    display: block;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    height: 2.5rem;
    line-height: 1.11;
    padding: .25rem 2.5rem .25rem 0;
    width: 100%
}

.erc-search-field .search-input::-webkit-input-placeholder {
    text-rendering: optimizeLegibility;
    color: #f9f9fa;
    color: #5e5c70;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.11;
    line-height: 1.2;
    opacity: 1
}

.erc-search-field .search-input::-moz-placeholder {
    text-rendering: optimizeLegibility;
    color: #f9f9fa;
    color: #5e5c70;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.11;
    line-height: 1.2;
    opacity: 1
}

.erc-search-field .search-input:-ms-input-placeholder {
    text-rendering: optimizeLegibility;
    color: #f9f9fa;
    color: #5e5c70;
    font-family: markpro, Helvetica Neue, helvetica, sans-serif;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.11;
    line-height: 1.2;
    opacity: 1
}

.erc-search-field .search-input:focus {
    border-color: rgb(255, 40, 2)
}

.erc-search-field .search-button {
    background-color: initial;
    border: none;
    cursor: pointer;
    display: block;
    padding: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
}

.erc-search-field .search-icon {
    fill: #f9f9fa;
    display: block;
    height: 1.25rem;
    opacity: .5;
    width: 1.25rem
}

@media screen and (min-width:35.5em) {
    .erc-search-field .search-input {
        font-size: 1.875rem;
        font-weight: 400;
        height: 3rem
    }

    .erc-search-field .search-input::-webkit-input-placeholder {
        font-size: 1.875rem;
        font-weight: 400
    }

    .erc-search-field .search-input::-moz-placeholder {
        font-size: 1.875rem;
        font-weight: 400
    }

    .erc-search-field .search-input:-ms-input-placeholder {
        font-size: 1.875rem;
        font-weight: 400
    }
}

@media screen and (min-width:50em) {
    .erc-search-field {
        padding-bottom: 1.125rem
    }

    .erc-search-field .search-input-wrapper {
        margin: 0 auto;
        max-width: 37.5rem
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input {
        font-size: 1.25rem;
        height: 2.25rem;
        line-height: 1.33
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input::-webkit-input-placeholder {
        font-size: 1.25rem;
        line-height: 1.33
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input::-moz-placeholder {
        font-size: 1.25rem;
        line-height: 1.33
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input:-ms-input-placeholder {
        font-size: 1.25rem;
        line-height: 1.33
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-icon {
        height: 1.25rem;
        width: 1.25rem
    }
}

@media screen and (min-width:50em) and (min-height:43.75rem) {
    .erc-search-field {
        padding-bottom: 1.875rem
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input {
        font-size: 1.875rem;
        height: 3rem
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input::-webkit-input-placeholder {
        font-size: 1.875rem
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input::-moz-placeholder {
        font-size: 1.875rem
    }

    .erc-search-field .search-input-wrapper.state-narrow .search-input:-ms-input-placeholder {
        font-size: 1.875rem
    }

    .erc-search-field .search-input {
        text-rendering: optimizeLegibility;
        color: #f9f9fa;
        font-family: markpro, Helvetica Neue, helvetica, sans-serif;
        font-size: 3.375rem;
        font-weight: 200;
        height: 4.25rem;
        line-height: 1.11;
        padding: .25rem 6.25rem .25rem 0;
        transition: all .3s ease
    }

    .erc-search-field .search-input::-webkit-input-placeholder {
        text-rendering: optimizeLegibility;
        color: #f9f9fa;
        color: #5e5c70;
        font-family: markpro, Helvetica Neue, helvetica, sans-serif;
        font-size: 3.375rem;
        font-weight: 200;
        line-height: 1.11;
        -webkit-transition: all .3s ease;
        transition: all .3s ease
    }

    .erc-search-field .search-input::-moz-placeholder {
        text-rendering: optimizeLegibility;
        color: #f9f9fa;
        color: #5e5c70;
        font-family: markpro, Helvetica Neue, helvetica, sans-serif;
        font-size: 3.375rem;
        font-weight: 200;
        line-height: 1.11;
        -moz-transition: all .3s ease;
        transition: all .3s ease
    }

    .erc-search-field .search-input:-ms-input-placeholder {
        text-rendering: optimizeLegibility;
        color: #f9f9fa;
        color: #5e5c70;
        font-family: markpro, Helvetica Neue, helvetica, sans-serif;
        font-size: 3.375rem;
        font-weight: 200;
        line-height: 1.11;
        -ms-transition: all .3s ease;
        transition: all .3s ease
    }

    .erc-search-field .search-icon {
        height: 2.5rem;
        transition: all .3s ease;
        width: 2.5rem
    }
}

</style>