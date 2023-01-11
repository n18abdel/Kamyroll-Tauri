<template>
  <div class="series-page-container" v-if="(episodes.items.length == 0 && meta.images.poster_tall.length > 1)">
      <div class="content">
        <div class="series-metadata">
          <div class="erc-series-poster series-poster placeholder">
          </div>
          <div class="text-wrapper">
            <div class="erc-series-tags series-tags">
            </div>
            <div class="erc-series-info">
              <div class="series-title"></div>
              <div class="erc-hero-description">
                <div class="description-wrapper">
                  <p class="description-text"></p>
                </div>
              </div>
            </div>
            <div class="action-buttons">
              <div tabindex="0" class="action-button c-button -type-one" data-t="watching-btn">
                <svg class="" viewBox="3 -1 10 22" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg>
                <span>Start Watching</span>
              </div>
              <div role="button" tabindex="0" class="erc-add-to-watchlist-button action-button c-button -type-one-weak"
                data-t="watchlist-btn">
                <div class="remove-hover">REMOVE</div><svg class="check-icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" data-t="check-svg">
                  <polygon
                    points="17.33 3.67 7.33 13.67 2.67 9 1.33 9 1.33 10.33 7.33 16.33 18.67 5 18.67 3.67 17.33 3.67">
                  </polygon>
                </svg><svg class="watchlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  data-t="watchlist-svg">
                  <path d="M9.6,12,16,15.2,9.6,18.4ZM3.2,21.6H20.8V8.8H3.2ZM6.4,4H17.6V2.4H6.4ZM4.8,7.2H19.2V5.6H4.8Z">
                  </path>
                </svg><span>Add To Watchlist</span>
              </div>
            </div>
          </div>
        </div>
        <div class="information-tabs-wrapper">
          <div class="erc-tabs">
            <div class="tabs-header state-hidden tab-button-align-center">
              <div class="button-wrapper"><a class="tab-button">series info</a><a
                  class="tab-button state-active">episodes</a></div>
            </div>
            <div class="item-list-wrapper">
              <div class="erc-content-list-controls">
                <div class="c-dropdown erc-sort-dropdown">
                  <div class="c-dropdown-trigger sort-dropdown-trigger"><svg class="sort-icon"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="sort-svg">
                      <path d="M2,5.2V2H18V5.2Zm0,6.4V8.4H12.667v3.2ZM2,18V14.8H6.267V18Z"></path>
                    </svg>
                    <div class="sort-title">Sort</div>
                  </div>
                  <div class="c-dropdown-content sort-dropdown-content">
                    <div class="c-dropdown-item sort-dropdown-item state-active">Oldest First</div>
                    <div class="c-dropdown-item sort-dropdown-item">Newest First</div>
                  </div>
                </div>
              </div>
              <div class="item-list">
                <div class="erc-series-media-list-element xl-card">
                  <article class="erc-episode-card xl-episode placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
                <div class="erc-series-media-list-element">
                  <article class="erc-episode-card placeholder">
                    <div class="watch-tag-list">
                      <div class="erc-info-tags-group"></div>
                    </div>
                    <div class="h-thumbnail">
                      <div class="c-content-image image"><svg class="c-svg-no-image" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 30 30" data-t="no-image-svg">
                          <path d="M0,4V26H30V4ZM28,24H2V6H28Z"></path>
                          <polygon points="26 19 23 16 19 20 10 11 4 17 4 22 26 22 26 19"></polygon>
                          <rect x="17.586" y="10.586" width="2.828" height="2.828"
                            transform="translate(-2.92 16.95) rotate(-45)"></rect>
                        </svg></div>
                      <div class="art-overlay"></div>
                    </div>
                    <section class="info">
                      <h2 class="episode-title"></h2>
                      <p class="episode-description"></p>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="backdrop-blur-sm hover:backdrop-blur-lg">
    <div class="series-page-container">
      <div class="content"> 
        <div class="series-metadata" v-if="meta.images.poster_tall.length >= 1">
          <div class="erc-series-poster series-poster">
            <img :src="meta.images.poster_tall[image].source" class="c-content-image" :alt="meta.title">
          </div>
          <div class="text-wrapper">
            <div class="erc-series-tags series-tags">
              <div class="c-meta-tags">
                <span v-if="meta.is_subbed && meta.is_dubbed" class="c-meta-tags__language">Sub | Dub</span>
                <span v-else-if="meta.is_dubbed" class="c-meta-tags__language">Dubbed</span>
                <span v-else-if="meta.is_subbed" class="c-meta-tags__language">Subtitled</span>
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
            <div class="action-buttons" v-if="episodes.items.length >= 1">
              <a role="button" tabindex="0" class="action-button c-button -type-one" v-if="type=='movie_listing'" data-t="watching-btn" :href="episodes.items[number].url">
                <svg class="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg>
                <span>Start Watching</span>
              </a>
              <a role="button" tabindex="0" class="action-button c-button -type-one" v-else data-t="watching-btn" :href="episodes.items[number].episodes[0].url">
                <svg class="" viewBox="3 -1 10 22" xmlns="http://www.w3.org/2000/svg" data-t="play-line-svg">
                  <path d="M0,0 L0,20 L20,10 L0,0 Z M2,3 L16,10 L2,17 L2,3 Z"></path>
                </svg>
                <span>Start Watching</span>
              </a>
              <div role="button" tabindex="0" class="erc-add-to-watchlist-button action-button c-button -type-one-weak"
                data-t="watchlist-btn" v-if="!isInWatchlist" @click="addToWatchlist">
                <div class="remove-hover">REMOVE</div><svg class="check-icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" data-t="check-svg">
                  <polygon
                    points="17.33 3.67 7.33 13.67 2.67 9 1.33 9 1.33 10.33 7.33 16.33 18.67 5 18.67 3.67 17.33 3.67">
                  </polygon>
                </svg><svg class="watchlist-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  data-t="watchlist-svg">
                  <path d="M9.6,12,16,15.2,9.6,18.4ZM3.2,21.6H20.8V8.8H3.2ZM6.4,4H17.6V2.4H6.4ZM4.8,7.2H19.2V5.6H4.8Z">
                  </path>
                </svg><span>Add To Watchlist</span>
              </div>
              <div role="button" tabindex="0" class="erc-remove-to-watchlist-button action-button c-button -type-one-weak"
                data-t="watchlist-btn" @mouseenter="hoverOnRemoveButton" @mouseleave="leaveRemoveButton" v-else @click="deleteFromWatchlist">
                <svg class="check-icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" data-t="check-svg">
                  <polygon
                    points="17.33 3.67 7.33 13.67 2.67 9 1.33 9 1.33 10.33 7.33 16.33 18.67 5 18.67 3.67 17.33 3.67">
                  </polygon>
                </svg>
                <div class="remove-hover">REMOVE</div>
              </div>
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
                      xmlns="http://www.w3.org/2000/svg" viewBox="3 -1 10 22" data-t="sort-svg">
                      <path d="M2,5.2V2H18V5.2Zm0,6.4V8.4H12.667v3.2ZM2,18V14.8H6.267V18Z"></path>
                    </svg>
                    <div class="sort-title">Sort</div>
                  </div>
                  <div class="c-dropdown-content sort-dropdown-content">
                    <div class="c-dropdown-item sort-dropdown-item" :class="sort == 'episode_number_oldest' ? 'state-active' : ''" @click="sortContentByOldest">Oldest First</div>
                    <div class="c-dropdown-item sort-dropdown-item" :class="sort == 'episode_number_newest' ? 'state-active' : ''" @click="sortContentByNewest">Newest First</div>
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
                <div v-for="season in episodes.items" :style="{'box-sizing': 'border-box', 'flex': '1 20 39%', 'padding': '.3125rem', 'display': 'flex', 'flex-wrap': 'wrap', 'flex-direction': 'row','display':`${id == season.id ? 'contents' : 'none'}`}">
                  <div class="erc-series-media-list-element xl-card" v-if="id==season.id" >
                    <article class="erc-episode-card xl-episode">
                      <a :title="season.episodes[0].title" class="card-link" :id="season.episodes[0].id" :href="season.episodes[0].url" @click="addEpisode($event)"></a>
                      <div class="watch-tag-list">
                        <div class="erc-info-tags-group">
                          <div class="c-info-tag c-info-tag--primary tags-group-item premium-only" v-if="episodes_seen.includes(season.episodes[0].id)"><span
                              class="c-info-tag__item">SEEN</span></div>
                        </div>
                      </div>
                      <div class="h-thumbnail" :class="episodes_seen.includes(season.episodes[0].id) ? ' -restricted' : ''">
                        <img v-if="season.episodes[0].images.thumbnail.length >= 1" :src="season.episodes[0].images.thumbnail[season.episodes[0].images.thumbnail.length - 1].source"
                          class="c-content-image image" :alt="season.episodes[0].title">
                        <img v-else :src="season.episodes[0].images.thumbnail[0].source" class="c-content-image image"
                          :alt="season.episodes[0].title">
                        <div class="progress-bar" v-if="episodes_seen.includes(season.episodes[0].id)" :style="{'width' : `${Math.floor(getValueByKey(times,season.episodes[0].id).time)}%`}"></div>
                        <div class="art-overlay"><svg class="art-overlay-icon icon c-svg-play-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                            <circle class="circle" cx="30" cy="30" r="30"></circle>
                            <path class="play"
                              d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                            </path>
                          </svg></div>
                        <div class="c-duration episode-duration">{{season.episodes[0].duration_ms}}m</div>
                      </div>
                      <section class="info">
                        <h3 class="series-title">{{ meta.title }}</h3>
                        <h2 class="episode-title">{{ season.episodes[0].title }}</h2>
                        <p class="episode-description">{{ season.episodes[0].description }}</p>
                        <div class="details-metadata">
                          <div class="c-meta-tags media-tag-group">
                            <span class="c-meta-tags__type" v-if="meta.__class__ == 'series'">Episode</span>
                            <span class="c-meta-tags__type" v-else-if="meta.__class__ == 'movie_listing'">Movie</span>
                            <span v-if="season.episodes[0].is_subbed" class="c-meta-tags__language">Sub</span>
                            <span v-else-if="season.episodes[0].is_dubbed" class="c-meta-tags__language">Dub</span>
                            <span v-else-if="season.episodes[0].is_subbed==true && season.episodes[0].is_dubbed==true"
                              class="c-meta-tags__language">Sub | Dub</span>
                          </div>
                        </div>
                      </section>
                    </article>
                  </div>
                  <div v-if="(season.episodes.length >= 1) && id==season.id" v-for="(episode) in (season.episodes.slice(1,season.episodes.length)) "
                    class="erc-series-media-list-element">
                    <article class="erc-episode-card" >
                      <a :title="episode.title" class="card-link" :id="episode.id" :href="episode.url" @click="addEpisode($event)"></a>
                      <div class="watch-tag-list">
                        <div class="erc-info-tags-group">
                          <div class="c-info-tag c-info-tag--primary tags-group-item premium-only" v-if="episodes_seen.includes(episode.id)"><span
                              class="c-info-tag__item">SEEN</span></div>
                        </div>
                      </div>
                      <div class="h-thumbnail" :class="episodes_seen.includes(episode.id) ? ' -restricted' : ''">
                        <img v-if="episode.images.thumbnail.length >= 1" :src="episode.images.thumbnail[episode.images.thumbnail.length - 1].source"
                          class="c-content-image image" :alt="episode.title">
                        <div v-else
                          class="c-content-image image" :alt="episode.title"> </div>
                        <div class="progress-bar" v-if="episodes_seen.includes(episode.id)" :style="{'width' : `${Math.floor(getValueByKey(times,episode.id).time)}%`}"></div>
                        <div class="art-overlay">
                          <svg class="art-overlay-icon icon c-svg-play-icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" data-t="play-icon-svg">
                            <circle class="circle" cx="30" cy="30" r="30"></circle>
                            <path class="play"
                              d="M22,20,42,30,22,40Zm8,36A26,26,0,1,0,4,30,26,26,0,0,0,30,56Zm0,4A30,30,0,1,1,60,30,30,30,0,0,1,30,60Z">
                            </path>
                          </svg>
                        </div>
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
              <div class="erc-season-navigation" v-if="type == 'series' && episodes.items.length > 1">
                <hr class="erc-horizontal-rule season-divider">
                <div class="season-controls">
                  <button class="season-button" :class="episodes.items[number - 1] == undefined ? '' : ' state-active' " data-t="previous-season"  @click="episodes.items[number - 1] == undefined ? '' : number --; id = episodes.items[number].id; keepTrack() ">
                    <svg class="icon left-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20" data-t="left-arrow-svg">
                      <path d="M10 .667L.667 10 10 19.332h1.333V18l-8-8 8-8V.667"></path>
                    </svg>
                    Previous<span class="state-hidden-mobile"> season</span>
                  </button>
                  <button class="season-button" :class="episodes.items[number + 1] == undefined ? '' : ' state-active' " data-t="next-season" @click="episodes.items[number + 1] == undefined ? '' : number ++; id = episodes.items[number].id;keepTrack() ">Next season
                    <svg class="icon right-arrow"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20" data-t="right-arrow-svg">
                      <path d="M2 .667L11.333 10 2 19.332H.667V18l8-8-8-8V.667"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="meta.images.poster_wide.length >= 5 && episodes.items.length > 1" class="erc-background-image background-image"
      :style="{'background-image': `url(${meta.images.poster_wide[4].source})`}"></div>
    <div v-else-if="meta.images.poster_wide.length >= 1  && episodes.items.length > 1" class="erc-background-image background-image"
      :style="{'background-image': `url(${meta.images.poster_tall[image].source})`}"></div>
  </div>
</template>
<script>
import getMetadata from '../../scripts/getMetadata.js';
import {
  getEpisodes
} from '../../scripts/crunchyroll.js';
import {
  channel,
  channelPage
} from '../../scripts/channel_id';
import {
  defaultRPC
} from '../../scripts/misc/rpc';
import {
  db
} from '../../scripts/db.js';
import {
  liveQuery
} from "dexie";
import {
  useObservable
} from "@vueuse/rxjs";

export default {
  data() {
    return {
      meta: {
        images: {
          poster_wide: [],
          poster_tall: []
        },
      },
      episodes: {
        items: []
      },
      slug: window.location.href.split('/').pop(),
      isOpen: false,
      image: 0,
      id: null,
      number: 0,
      type: '',
      sortOpen: false,
      sort: localStorage.getItem('sort'),
      isInWatchlist: false,
      episodes_seen: useObservable(
        liveQuery(() => db.anime_saved.where('prov_id').equals(window.location.href.split('/').pop()).toArray())
      ),
      times: useObservable(
        liveQuery(() => db.anime_saved.where('prov_id').equals(window.location.href.split('/').pop()).toArray())
      )
    }
  },
  methods: {
    async addToWatchlist() {
      try {
        console.log(this.meta.title);
        const id = await db.anime_saved.add({
          title: this.meta.title,
          prov_id: this.meta.id,
          channel: localStorage.getItem('channel'),
          episodes_seen: []
        });
        this.isInWatchlist = true;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteFromWatchlist() {
      try {
        const id = await db.anime_saved.where('prov_id').equals(this.meta.id).delete();
        this.isInWatchlist = false;
      } catch (e) {
        console.log(e);
      }
    },
    async inWatchlist() {
      const id = await db.anime_saved.where('prov_id').equals(this.meta.id).count();
      if (id >= 1) {
        return true;
      } else {
        return false;
      }
    },
    async addEpisode(el) {
      const episode = await db.anime_saved.where('prov_id').equals(this.meta.id).modify(anime => {
        if (this.getValueByKey(anime.episodes_seen, el.target.id) == undefined) {
          anime.episodes_seen.push({
            episode: el.target.id,
            time: 0
          });
        }
      });
    },
    getValueFromKey(obj, key) {
      for (var x = 0; x < obj.length; x++) {
        if (obj[x].html == key) {
          return obj[x];
        }
      }
    },
    nextSeason(keys, key) {
      console.log(this.number);
      for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.id == key) {
          let next = x + 1;
          this.number = next < keys.length ? next : this.number;
          localStorage.setItem('season', JSON.stringify(this.episodes.items[this.number]))
          return this.number;
        }
      }
    },
    hoverOnRemoveButton() {
      document.querySelector('.remove-hover').innerText = 'Are you sure?';
    },
    leaveRemoveButton() {
      document.querySelector('.remove-hover').innerText = 'REMOVE';
    },
    getValueByKey(keys, key) {
      console.log(keys, 'keys');
      for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        console.log(tKey, 'loop');
        if (tKey.episode == key) {
          console.log(tKey);
          return tKey;
        }
      }
    },
    showContent(el) {
      this.id = el.target.id;
      this.number = this.episodes.items.findIndex(item => item.id === el.target.id);
      localStorage.setItem('season', JSON.stringify(this.episodes.items[this.number]))
      let lastShown = localStorage.getItem('keepTrack');
      if (lastShown == null) {
        lastShown = {
          [this.slug]: {
            season: this.id
          }
        }
      } else {
        lastShown = JSON.parse(lastShown);
        if (lastShown[this.slug] == null) {
          lastShown[this.slug] = {
            season: this.id
          }
        } else {
          lastShown[this.slug] = {
            season: this.id
          }
        }
      }
      try {
        localStorage.setItem('keepTrack', JSON.stringify(lastShown));
      } catch (e) {
        console.log(e);
      }
    },
    keepTrack() {
      localStorage.setItem('season', JSON.stringify(this.episodes.items[this.number]))
      let lastShown = localStorage.getItem('keepTrack');
      if (lastShown == null) {
        lastShown = {
          [this.slug]: {
            season: this.id
          }
        }
      } else {
        lastShown = JSON.parse(lastShown);
        if (lastShown[this.slug] == null) {
          lastShown[this.slug] = {
            season: this.id
          }
        } else {
          lastShown[this.slug] = {
            season: this.id
          }
        }
      }
      try {
        localStorage.setItem('keepTrack', JSON.stringify(lastShown));
      } catch (e) {
        console.log(e);
      }
    },
    sortContentByNewest() {
      if (this.sort == 'episode_number_newest') {
        return
      } else {
        this.episodes.items[this.number].episodes.reverse();
        this.sort = 'episode_number_newest';
      }
      localStorage.setItem('sort', this.sort);

    },
    sortContentByOldest() {
      if (this.sort == 'episode_number_oldest') {
        return
      } else {
        this.episodes.items[this.number].episodes.reverse();
        this.sort = 'episode_number_oldest';
      }
      localStorage.setItem('sort', this.sort);
    },
  },
  beforeMount: async function () {
    channelPage();
    const slug = this.slug;
    console.log(slug);
    this.meta = await getMetadata(slug);
    let episodes = await getEpisodes(slug, this.meta.__class__);
    this.type = this.meta.__class__;
    this.id = episodes.items[this.number].id;
    this.image = Math.floor((this.meta.images.poster_tall.length / 2) - 1);
    if (channel == 'neko-sama') {
      this.image = this.meta.images.poster_tall.length - 1;
    }
    this.episodes = episodes;
    let lastShown = localStorage.getItem('keepTrack');
    if (lastShown != null) {
      lastShown = JSON.parse(lastShown);
      if (lastShown[slug] != null) {
        this.id = lastShown[slug].season;
        this.number = this.episodes.items.findIndex(item => item.id === lastShown[slug].season);
      }
    }
    await defaultRPC(`Looking at ${this.meta.title}`, `Looking at the info page for ${this.meta.title}`);
    let sort = localStorage.getItem('sort');
    if (sort == null) {
      this.sort = 'episode_number_oldest';
      localStorage.setItem('sort', sort);
    } else if (sort == 'episode_number_oldest') {
      this.sortContentByOldest()
    } else if (sort == 'episode_number_newest') {
      console.log('newest');
      this.episodes.items[this.number].episodes.reverse();
    }
    this.isInWatchlist = await this.inWatchlist();
    if (this.episodes_seen.length == 0) {
      this.episodes_seen = [];
    } else {
      // take the array of object and replace each object with only the episode property
      this.episodes_seen = this.episodes_seen[0].episodes_seen.map(item => item.episode);
      this.times = this.times[0].episodes_seen;
    }
    localStorage.setItem('season', JSON.stringify(this.episodes.items[this.number]));
  }
}
</script>
<style scoped >

*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
    border-radius: 10px;
}
</style>
