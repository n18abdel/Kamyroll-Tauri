<script setup>
  import {
    fetch,
    Body
  } from '@tauri-apps/api/http';
  import loading from '../../assets/loading.svg';
</script>

<template>
    <div class="loading" v-if="episodes == null">
        <div class="loading__spinner">
            <img :src="loading" alt="loading">
        </div>
    </div>
    <div v-if="episodes != null" class="backdrop-blur-sm hover:backdrop-blur-lg">
      <div class="series-page-container">
        <div class="content">
          <div class="series-metadata">
            <div class="erc-series-poster series-poster"><img :src="meta.image" class="c-content-image"
                :alt="meta.title"></div>
            <div class="text-wrapper">
              <div class="erc-series-tags series-tags">
                <div class="c-meta-tags">
                  <span v-if="meta.is_subbed" class="c-meta-tags__language">Sub</span>
                  <span v-else-if="meta.is_dubbed" class="c-meta-tags__language">Dub</span>
                  <span v-else-if="meta.is_subbed && meta.is_dubbed" class="c-meta-tags__language">Sub | Dub</span>
                </div>
              </div>
              <div class="erc-series-info">
                <div class="series-title">{{ meta.title }}</div>
                <div class="erc-hero-description">
                  <div class="description-wrapper">
                    <p class="description-text">{{ meta.description }}</p>
                  </div>
                </div>
              </div>
              <div class="actions-buttons">
                <a role="button" tabindex="0" class="action-button c-button -type-one" data-t="watching-btn"
                :href="episodes[0].url.link"><svg
                  class="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg><span>Start Watching</span></a>
              </div>
              
            </div>
          </div>
          <div class="information-tabs-wrapper">
            <div class="erc-tabs">
              <div class="item-list-wrapper">
                <div class="item-list">
                  <div class="erc-series-media-list-element xl-card ">
                    <article class="erc-episode-card xl-episode"><a :title="episodes[0].title" class="card-link"
                        :href="episodes[0].url.link"></a>
                      <div class="watch-tag-list">
                        <div class="erc-info-tags-group"></div>
                      </div>
                      <div class="h-thumbnail"><img :src="episodes[0].poster" class="c-content-image image"
                          :alt="episodes[0].title">
                        <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                            <circle class="circle" cx="30" cy="30" r="30"></circle>
                            <path class="play"
                              d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                            </path>
                          </svg></div>
                      </div>
                      <section class="info">
                        <h3 class="series-title">{{ meta.title }}</h3>
                        <h2 class="episode-title">{{ episodes[0].title }}</h2>
                        <p class="episode-description">{{ episodes[0].description }}</p>
                        <div class="details-metadata">
                          <div class="c-meta-tags media-tag-group">
                            <span class="c-meta-tags__type" v-if="meta.type == 'series'">Episode</span>
                            <span class="c-meta-tags__type" v-else-if="meta.type == 'movie_listing'">Movie</span>
                            <span class="c-meta-tags__language" v-if="episodes[0].is_subbed">Subtitled</span>
                            <span class="c-meta-tags__language" v-else-if="episodes[0].is_dubbed">Dubbed</span>
                          </div>
                        </div>
                      </section>
                    </article>
                  </div>

                  <div v-if="episodes.length > 1" v-for="episode in episodes.slice(1- episodes.length)" class="erc-series-media-list-element">
                    <article class="erc-episode-card episode-xl"><a :title="episode.title" class="card-link"
                        :href="episode.url.link"></a>
                      <div class="watch-tag-list">
                        <div class="erc-info-tags-group"></div>
                      </div>
                      <div class="h-thumbnail"><img :src="episode.poster" class="c-content-image image"
                          :alt="episode.title">
                        <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                            <circle class="circle" cx="30" cy="30" r="30"></circle>
                            <path class="play"
                              d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                            </path>
                          </svg></div>
                      </div>
                      <section class="info">
                        <h3 class="series-title">{{ meta.title }}</h3>
                        <h2 class="episode-title">{{ episode.title }}</h2>
                        <p class="episode-description">{{ episode.description }}</p>
                        <div class="details-metadata">
                          <div class="c-meta-tags media-tag-group">
                            <span class="c-meta-tags__type" v-if="meta.type == 'series'">Episode</span>
                            <span class="c-meta-tags__type" v-else-if="meta.type == 'movie_listing'">Movie</span>
                            <span class="c-meta-tags__language" v-if="episode.is_subbed">Subtitled</span>
                            <span class="c-meta-tags__language" v-else-if="episode.is_dubbed">Dubbed</span>
                          </div>
                        </div>
                      </section>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="erc-background-image background-image" :style="{'background-image': `url(${meta.image})`}"></div>
      </div>
    </div>
</template>
<script>
import { token } from '../../scripts/token.js';
  export default {
    data() {
      return {
        meta:null,
        episodes: null,
        slug : window.location.href.split('/').pop(),

      }
    },
    beforeMount: async function () {     
      localStorage.setItem('channel', 'neko-sama');
      function infoAnime(title,  url, image, description, type, episodes, status, is_dubbed,is_subbed,is_mature,is_simulcast,maturity_ratings) {
        this.title = title;
        this.url = url;
        this.image = image;
        this.description = description;
        this.type = type;
        this.episodes = episodes;
        this.status = status;
        this.is_dubbed = is_dubbed;
        this.is_subbed= is_subbed;
        this.is_mature = is_mature;
        this.is_simulcast = is_simulcast;
        this.maturity_ratings = maturity_ratings;
      }
      function Episode(title, url, description, poster,is_subbed,is_dubbed) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.poster = poster;
        this.is_subbed = is_subbed;
        this.is_dubbed = is_dubbed;
      }

      function ModuleRequest(link, headers) {
        this.link = link;
        this.headers = headers;
      }
      const slug = this.slug;
      let episodes = [];
      async function getMetadata(slug){
        const url = `https://kamyroll.herokuapp.com/content/v1/media?id=${slug}&channel_id=neko-sama`
        const options = {
          headers: {
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
          },
          method: "GET",
        }
        let response = await fetch(url, options);
        let result = response.data;
        const title = result.title;
        const image = result.images.poster_tall.pop().source;
        let description = result.description;
        let type = result.__class__;
        if(description==''){
          description = 'No description was given for this show'
        }
        const is_dubbed = result.is_dubbed;
        const is_subbed = result.is_subbed;
        const is_mature = result.is_mature;
        const is_simulcast = result.is_simulcast;
        const maturity_ratings = result.maturity_ratings;
        return new infoAnime(title, slug, image, description,type, is_dubbed, is_subbed, is_mature, is_simulcast,maturity_ratings);
        }
      let url = "";
      this.meta = await getMetadata(slug);
      if(this.meta.type == 'movie_listing'){
        url = `https://kamyroll.herokuapp.com/content/v1/movies?id=${slug}&channel_id=neko-sama`;
      }else{
        url= `https://kamyroll.herokuapp.com/content/v1/seasons?id=${slug}&channel_id=neko-sama`; 
      }
      
      const options = {
        headers: {
          'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
          'Authorization': `Bearer ${token.access_token}`,
        },
        method: "GET",
      }
      const response = await fetch(url, options);
      const result = response.data;
      console.log(result);
      if (this.meta.type == 'series') {
        for (const season of result.items.reverse()) {
          for (const epi of season.episodes) {
            if(epi.episode != 'Bande Annonce'){
            let titre = epi.title;
            let id = epi.id;
            let desc = epi.description;
            let image = "";
            try{
             image = epi.images.thumbnail[2].source;
            }catch(e){
             image = epi.images.thumbnail[0].source;
            }
            let link = '/nekosama/watch/' + id;
            let headers = {
              'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
              'Authorization': `Bearer ${token.access_token}`,
            };
            link = new ModuleRequest(link, headers);
            if(id.includes('vf')){
              titre += ' (VF)';
              episodes.push(new Episode(titre, link, desc, image, false, true));
            }else{
              titre += ' (VOSTFR)';
              episodes.push(new Episode(titre, link, desc, image, true, false));
            }
            }
          }
        }
      } else if(this.meta.type == 'movie_listing'){
        for (const epi of result.items.reverse()) {
          let titre = epi.title;
          let id = epi.id;
          let desc = epi.description;
          let image = "";
          try{
            image = epi.images.thumbnail[2].source;
          }catch(e){
            image = epi.images.thumbnail[0].source;
          }
          let link = '/nekosama/watch/' + id;
          let headers = {
            'User-Agent': 'Kamyroll/3.17.0 Android/7.1.2 okhttp/4.9.1',
            'Authorization': `Bearer ${token.access_token}`,
          };
          link = new ModuleRequest(link, headers);
          if(id.includes('vf')){
              titre += ' (VF)';
              episodes.push(new Episode(titre, link, desc, image, false, true));
            }else{
              titre += ' (VOSTFR)';
              episodes.push(new Episode(titre, link, desc, image, true, false));
            }
        }
      }
      this.episodes = episodes; 
    },
  }
</script>
