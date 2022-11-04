<template>
  <div class="loading" v-if="episodes == null">
    <div class="loading__spinner">
      <img src="/img/loading.svg" alt="loading">
    </div>
  </div>
  <div v-if="episodes != null" class="backdrop-blur-sm hover:backdrop-blur-lg">
    <div class="series-page-container">
      <div class="content">
        <div class="series-metadata">
          <div class="erc-series-poster series-poster">
            <img :src="meta.images.poster_tall[image].source" class="c-content-image" :alt="meta.title">
          </div>
          <div class="text-wrapper">
            <div class="erc-series-tags series-tags">
              <div class="c-meta-tags">
                <span v-if="meta.is_subbed && meta.is_dubbed" class="c-meta-tags__language">Sub | Dub</span>
                <span v-else-if="meta.is_dubbed" class="c-meta-tags__language">Dub</span>
                <span v-else-if="meta.is_subbed" class="c-meta-tags__language">Sub</span>
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
            <div class="action-buttons">
              <a role="button" tabindex="0" class="action-button c-button -type-one" v-if="type=='movie_listing'" data-t="watching-btn" :href="episodes.items[number].url">
                <svg class="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg>
                <span>Start Watching</span>
              </a>
              <a role="button" tabindex="0" class="action-button c-button -type-one" v-else data-t="watching-btn" :href="episodes.items[number].episodes[0].url">
                <svg class="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg>
                <span>Start Watching</span>
              </a>
            </div>
          </div>
        </div>
        <div class="information-tabs-wrapper">
          <div class="tabs-header"></div>
          <div class="erc-tabs">
            <div class="item-list-wrapper">
              <div class="erc-content-list-controls" style="padding-bottom: 20px;">
                <div :class="sortOpen  ?'c-dropdown c-dropdown--open erc-sort-dropdown':'c-dropdown erc-sort-dropdown'"
                  @click="sortOpen = !sortOpen">
                  <div class="c-dropdown-trigger sort-dropdown-trigger" ><svg class="sort-icon"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="sort-svg">
                      <path d="M2,5.2V2H18V5.2Zm0,6.4V8.4H12.667v3.2ZM2,18V14.8H6.267V18Z"></path>
                    </svg>
                    <div class="sort-title">Sort</div>
                  </div>
                  <div class="c-dropdown-content sort-dropdown-content">
                    <div class="c-dropdown-item sort-dropdown-item" @click="sortContentByOldest">Oldest First</div>
                    <div class="c-dropdown-item sort-dropdown-item" @click="sortContentByNewest">Newest First</div>
                  </div>
                  </div>
                <div
                  :class="isOpen  ?'c-select--open controls-select':'c-select controls-select'"
                  @click="isOpen = !isOpen" v-if="episodes.items.length > 1 ">
                  <div class="c-select-trigger controls-select-trigger state-active">
                    <span class="season-info" v-if="type=='series' ">
                        <span class="season-number" >S{{episodes.items[number].season_number}}</span> -
                        {{episodes.items[number].title}}</span>
                        <span class="season-info" v-else>
                        <span class="season-number" >{{episodes.items[number].title}}</span>
                      </span>
                    <svg class="down-arrow" v-if="episodes.items.length > 1" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 12" data-t="down-arrow-svg">
                      <polygon points="6 9.5 12 2.5 0 2.5 6 9.5"></polygon>
                    </svg>
                  </div>
                  <div class="c-select-content controls-select-content">
                    <div class="c-select-option controls-select-option" v-if="type=='series' " v-for="season in episodes.items" :id="season.id"
                      @click="showContent">
                      <span class="season-info" :id="season.id" @click="showContent">
                        <span class="season-number" :id="season.id"
                          @click="showContent">S{{season.season_number}}</span> - {{season.title}}</span>
                    </div>
                    <div class="c-select-option controls-select-option" v-else-if="episodes.items.length > 1" v-for="season in episodes.items" :id="season.id"
                      @click="showContent">
                      <span class="season-info" :id="season.id" @click="showContent">
                        <span class="season-number" :id="season.id"
                          @click="showContent">{{season.title}}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-list" v-if="type == 'series'">
                <div v-for="season in episodes.items" :id="season.id"
                  :style="{'box-sizing': 'border-box', 'flex': '1 20 39%', 'padding': '.3125rem', 'display': 'flex', 'flex-wrap': 'wrap', 'flex-direction': 'row','display':`${id == season.id ? 'contents' : 'none'}`}">
                  <div v-if="season.episodes.length >= 1 && id==season.id" v-for="episode in season.episodes"
                    class="erc-series-media-list-element">
                    <article class="erc-episode-card">
                      <a :title="episode.title" class="card-link" :href="episode.url"></a>
                      <div class="watch-tag-list">
                        <div class="erc-info-tags-group"></div>
                      </div>
                      <div class="h-thumbnail">
                        <img v-if="episode.images.thumbnail >= 1" :src="episode.images.thumbnail[1].source"
                          class="c-content-image image" :alt="episode.title">
                        <img v-else :src="episode.images.thumbnail[0].source" class="c-content-image image"
                          :alt="episode.title">
                        <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                            <circle class="circle" cx="30" cy="30" r="30"></circle>
                            <path class="play"
                              d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                            </path>
                          </svg></div>
                        <div class="c-duration episode-duration">{{episode.duration_ms}}m</div>
                      </div>
                      <section class="info">
                        <h3 class="series-title">{{ meta.title }}</h3>
                        <h2 class="episode-title">{{ episode.title }}</h2>
                        <p class="episode-description">{{ episode.description }}</p>
                        <div class="details-metadata">
                          <div class="c-meta-tags media-tag-group">
                            <span class="c-meta-tags__type" v-if="meta.__class__ == 'series'">Episode</span>
                            <span class="c-meta-tags__type" v-else-if="meta.__class__ == 'movie_listing'">Movie</span>
                            <span v-if="episode.is_subbed" class="c-meta-tags__language">Sub</span>
                            <span v-else-if="episode.is_dubbed" class="c-meta-tags__language">Dub</span>
                            <span v-else-if="episode.is_subbed==true && episode.is_dubbed==true"
                              class="c-meta-tags__language">Sub | Dub</span>
                          </div>
                        </div>
                      </section>
                    </article>
                  </div>
                </div>
              </div>
              <div class="item-list" v-else="type == 'movie_listing'">
                <div v-for="episode in episodes.items" class="media-list-element xl-card" :style="{'display': `${episode.id == id ? 'contents' : 'none'}`}">
                  <article class="erc-episode-card xl-episode state-now-playing">
                    <a :title="episode.title" class="card-link" :href="episode.url"></a>
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <img v-if="episode.images.thumbnail >= 1" :src="episode.images.thumbnail[1].source"
                        class="c-content-image image" :alt="episode.title">
                      <img v-else :src="episode.images.thumbnail[0].source" class="c-content-image image"
                        :alt="episode.title">
                      <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                          <circle class="circle" cx="30" cy="30" r="30"></circle>
                          <path class="play"
                            d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                          </path>
                        </svg></div>
                      <div class="c-duration episode-duration">{{episode.duration_ms}}m</div>
                    </div>
                    <section class="info">
                      <h3 class="series-title">{{ meta.title }}</h3>
                      <h2 class="episode-title">{{ episode.title }}</h2>
                      <p class="episode-description">{{ episode.description }}</p>
                      <div class="details-metadata">
                        <div class="c-meta-tags media-tag-group">
                          <span class="c-meta-tags__type" v-if="meta.__class__ == 'series'">Episode</span>
                          <span class="c-meta-tags__type" v-else-if="meta.__class__ == 'movie_listing'">Movie</span>
                          <span v-if="episode.is_subbed" class="c-meta-tags__language">Sub</span>
                          <span v-else-if="episode.is_dubbed" class="c-meta-tags__language">Dub</span>
                          <span v-else-if="episode.is_subbed==true && episode.is_dubbed==true"
                            class="c-meta-tags__language">Sub | Dub</span>
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
    </div>
    <div v-if="meta.images.poster_wide.length >= 5" class="erc-background-image background-image"
      :style="{'background-image': `url(${meta.images.poster_wide[4].source})`}"></div>
    <div v-else class="erc-background-image background-image"
      :style="{'background-image': `url(${meta.images.poster_tall[image].source})`}"></div>
  </div>
</template>
<script>
import getMetadata from '../../scripts/getMetadata.js';
import {getEpisodes} from '../../scripts/crunchyroll.js';
import {channelPage} from '../../scripts/channel_id';

  export default {
    data() {
      return {
        meta:null,
        episodes: null,
        slug : window.location.href.split('/').pop(),
        isOpen: false,
        image : 0,
        id : null,
        number : 0,
        type : '',
        sortOpen: false,
        sort: 'episode_number_oldest',
      }
    },
    methods:{
      showContent(el){
        this.id =  el.target.id;
        this.number = this.episodes.items.findIndex(item => item.id === el.target.id);
      },
      sortContentByNewest(){
        if(this.sort == 'episode_number_newest'){
          return
        }else{
          this.episodes.items[this.number].episodes.reverse();
          this.sort = 'episode_number_newest';
        }
        
      },
      sortContentByOldest(){
        if(this.sort == 'episode_number_oldest'){
          return
        } else{
          this.episodes.items[this.number].episodes.reverse();
          this.sort = 'episode_number_oldest';
        } 
      },
    },
    beforeMount: async function () {     
      channelPage();
      const slug = this.slug;
      console.log(slug);
      this.meta = await getMetadata(slug);
      let episodes = await getEpisodes(slug,this.meta.__class__);
      localStorage.setItem('episodes', JSON.stringify(episodes));
      this.type = this.meta.__class__;
      this.id = episodes.items[this.number].id;
      this.image = Math.floor((this.meta.images.poster_tall.length / 2 ) - 1);
      this.episodes = episodes; 
    }
}
</script>
