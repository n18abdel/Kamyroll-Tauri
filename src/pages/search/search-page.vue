<script setup>

import spinner from '/src/assets/loading.svg';

</script>
<template>
    <div class="search">
        <div class="erc-search">
            <div class="search-header-wrapper state-search-results">
                <div class="erc-search-field">
                    <div class="content">
                        <form class="search-input-wrapper state-narrow">
                            <input type="text" placeholder="Rechercher" class="search-input" @keydown.enter.prevent="recherche">
                            <div class="search-button" @click="recherche">
                                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    data-t="search-svg">
                                    <path
                                        d="M2,10.666V5.333L5.333,2h5.333L14,5.333v5.333L10.667,14H5.333ZM4.364,0,0,4.363v7.273L4.364,16h7.273l1.757-1.757L18,20h2V18l-5.757-4.606L16,11.637V4.363L11.637,0Z">
                                    </path>
                                </svg></div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="search-results-wrapper state-search-results">
                <div class="loading" >
                    <div class="loading__spinner" v-show="loading"><img :src="spinner" alt="loading"></div>
                </div>
                <div class="content" v-if="results != null">
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
                                            <p class="channel-name">{{channel}}</p>
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
import {getChannelinUse,chan} from '../../scripts/channel_id';
import {search} from '../../scripts/crunchyroll.js'
export default { 
    data(){
        return{
            results:null,
            loading : false,
            channel : null
        }
    },
    methods:{
        async recherche() {
            this.channel = getChannelinUse(chan);
            this.results = [];
            this.loading = true;
            let keyword = document.querySelector('.search-input').value;
            this.results = await search(keyword);
            this.loading = false; 
        }
    }
}

</script>

<style scoped>
.erc-search::-webkit-scrollbar {
    width: 12px !important;
   
}

.erc-search::-webkit-scrollbar-thumb {
    background-color: red !important;
    border-radius: 10px !important;
}
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