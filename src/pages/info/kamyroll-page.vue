<script setup>
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
                <!-- <span v-if="meta.is_subbed" class="c-meta-tags__language">Sub</span>
                <span v-else-if="meta.is_dubbed" class="c-meta-tags__language">Dub</span>
                <span v-else-if="meta.is_subbed && meta.is_dubbed" class="c-meta-tags__language">Sub | Dub</span> -->
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
              :href="episodes[0].url"><svg
                class="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
              </svg><span>Start Watching</span></a>
            </div>
            
          </div>
        </div>
        <div class="information-tabs-wrapper">
          <div class="erc-tabs">
            <div class="item-list-wrapper">
              <div class="erc-content-list-controls">
                <div class="c-dropdown erc-sort-dropdown">
                  <div class="c-dropdown-content sort-dropdown-content">
                    <div class="c-dropdown-item sort-dropdown-item state-active">Oldest First</div>
                    <div class="c-dropdown-item sort-dropdown-item">Newest First</div>
                  </div>
                </div>
                <div v-if="test==true" class="c-select c-select--open controls-select">
                  <div class="c-select-trigger controls-select-trigger state-active"><span class="season-info"><span
                        class="season-number">S1</span> -
                      <!-- -->Masamune-kun's Revenge</span><svg class="down-arrow" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12" data-t="down-arrow-svg">
                      <polygon points="6 9.5 12 2.5 0 2.5 6 9.5"></polygon>
                    </svg></div>
                  <div class="c-select-content controls-select-content">
                    <div class="c-select-option controls-select-option state-active"><span class="season-info"><span
                          class="season-number">S1</span> -
                        <!-- -->Masamune-kun's Revenge</span></div>
                    <div class="c-select-option controls-select-option"><span class="season-info"><span
                          class="season-number">S1</span> -
                        <!-- -->Masamune-kun's Revenge (English Dub)</span></div>
                  </div>
                </div>

              </div>
              <div class="item-list">
                <div class="erc-series-media-list-element xl-card ">
                  <article class="erc-episode-card xl-episode">
                    <a v-if="episodes[0].title.length > 0" :title="episodes[0].title" class="card-link" :href="episodes[0].url" role="button"></a>
                    <a v-else :title="meta.title" class="card-link" :href="episodes[0].url" role="button"></a>
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group">
                        <!-- <div class="erc-info-tag" v-if="episodes[0].is_subbed">Sub</div>
                        <div class="erc-info-tag" v-else-if="episodes[0].is_dubbed">Dub</div>
                        <div class="erc-info-tag" v-else-if="episodes[0].is_subbed && episodes[0].is_dubbed">Sub | Dub</div> -->
                      </div>
                    </div>
                    <div class="h-thumbnail"><img :src="episodes[0].poster" class="c-content-image image" :alt="episodes[0].title">
                      <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                          <circle class="circle" cx="30" cy="30" r="30"></circle>
                          <path class="play"
                            d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                          </path>
                        </svg></div>
                      <div class="c-duration episode-duration">{{episodes[0].duration}}m</div>
                    </div>
                    <section class="info">
                      <h3 class="series-title">{{ meta.title }}</h3>
                      <h2 class="episode-title" v-if="episodes[0].title.length > 0">{{ episodes[0].title}}</h2>
                      <h2 class="episode-title" v-else>{{meta.title}}</h2>
                      <p class="episode-description">{{ episodes[0].description }}</p>
                      <div class="details-metadata">
                        <div class="c-meta-tags media-tag-group">
                          <span class="c-meta-tags__type" v-if="meta.type == 'series'">Episode</span>
                          <span class="c-meta-tags__type" v-else-if="meta.type == 'movie_listing'">Movie</span>
                          <span v-if="episodes[0].is_subbed" class="c-meta-tags__language">Sub</span>
                          <span v-else-if="episodes[0].is_dubbed" class="c-meta-tags__language">Dub</span>
                          <span v-else-if="episodes[0].is_subbed && episodes[0].is_dubbed" class="c-meta-tags__language">Sub | Dub</span>
                        </div>
                      </div>
                    </section>
                  </article>
                </div>

                <div v-if="episodes.length > 1" v-for="episode in episodes.slice(1- episodes.length)" class="erc-series-media-list-element">
                  <article class="erc-episode-card episode-xl"><a :title="episode.title" class="card-link"
                      :href="episode.url"></a>
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
                        <div class="c-duration episode-duration">{{episode.duration}}m</div>
                    </div>
                    <section class="info">
                      <h3 class="series-title">{{ meta.title }}</h3>
                      <h2 class="episode-title">{{ episode.title }}</h2>
                      <p class="episode-description">{{ episode.description }}</p>
                      <div class="details-metadata">
                        <div class="c-meta-tags media-tag-group">
                          <span class="c-meta-tags__type" v-if="meta.type == 'series'">Episode</span>
                          <span class="c-meta-tags__type" v-else-if="meta.type == 'movie_listing'">Movie</span>
                          <span v-if="episode.is_subbed" class="c-meta-tags__language">Sub</span>
                          <span v-else-if="episode.is_dubbed" class="c-meta-tags__language">Dub</span>
                          <span v-else-if="episode.is_subbed==true && episode.is_dubbed==true" class="c-meta-tags__language">Sub | Dub</span>
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
import getMetadata from '../../scripts/getMetadata.js';
import {getEpisodes} from '../../scripts/crunchyroll.js';
import { channelPage } from '../../scripts/channel_id';

  export default {
    data() {
      return {
        meta:null,
        episodes: null,
        slug : window.location.href.split('/').pop(),
        test: true
      }
    },
    beforeMount: async function () {     
      channelPage();
      const slug = this.slug;
      console.log(slug);
      this.meta = await getMetadata(slug);
      let episodes = await getEpisodes(slug,this.meta.type);
      this.episodes = episodes; 
    }
}
</script>
