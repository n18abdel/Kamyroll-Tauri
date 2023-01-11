<script setup>

import {channel,channels,getChannelinUse,setChannel} from '../scripts/channel_id';
import k_logo from '/img/k.png';
import kamyroll_logo from '/img/kamyroll_logo.svg';

</script>
<template>
  <div class="erc-header">
    <div class="header-content">
      <div class="header-left">
        <div class="erc-nav-header-item" v-if="inRightPlace" @click="toggleMenu">
          <div class="wrapper">
            <div tabindex="0" class="nav-item-clickable">
            </div>
            <a tabindex="0" :style="{'background-color':channelInUse.color}" class="item-logo" src="/kamyroll_logo.svg">
              <img
                class="icon-home" :src="channelInUse.icon">
              </a>
            <div class="item-info">
              <h1 class="item-title">{{channelInUse.short_label}}</h1>
            </div>
            <div class="arrows-up-down"><svg class="arrows-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16"
                data-t="arrows-up-down-svg">
                <path d="M6,0l5.6,5.6H.4ZM6,16,.4,10.4H11.6Z"></path>
              </svg></div>
          </div>
          <div :class="isOuvert ? 'erc-nav-dropdown state-open' : 'erc-nav-dropdown'" >
            <div class="nav-dropdown-scrollable">
              <div class="nav-dropdown-channels">
                <h4 class="nav-dropdown-title">Channels</h4>
                <div class="erc-nav-dropdown-item" v-for="prov of channels" :id="prov.name" @click="setChannel($event.target.id)" >
                  <div class="erc-nav-dropdown-item-link" :id="prov.name" :style="{'color':prov.color}" @click="setChannel($event.target.id)">
                    <div :style="{'background-color':prov.color}" class="c-circle-icon c-circle-icon--size-small"><img
                        class="c-circle-icon__element"
                        :src="prov.icon"
                        :alt="prov.label"  :id="prov.name" @click="setChannel($event.target.id)"></div>
                    <div class="info" :id="prov.name" @click="setChannel($event.target.id)">
                      <h3 class="title"  :id="prov.name" @click="setChannel($event.target.id)">{{prov.label}}</h3>
                      <p class="description"  :id="prov.name" @click="setChannel($event.target.id)">{{prov.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="erc-user-actions" v-else>
          <li class="user-actions-item">
            <div class="erc-header-tile" @click="$router.go(-1)">
              <div class="erc-header-svg"><svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="white" d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"/></svg></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="header-center">
        <a tabindex="0" class="erc-logo" href="/"><img class="logo-full hidden-mobile" :src="kamyroll_logo">
            
          <img class="logo-short hidden-desktop c-svg-vrv-icon" :src="k_logo" >
        </a>
      </div>
      <div class="header-right">
        <ul class="erc-user-actions">
          <!-- <li class="user-actions-item watchlist-wrapper"><a tabindex="0" class="erc-header-tile" href="/favorites">
              <div class="erc-header-svg"><svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" data-t="watchlist-svg">
                  <path d="M9.6,12,16,15.2,9.6,18.4ZM3.2,21.6H20.8V8.8H3.2ZM6.4,4H17.6V2.4H6.4ZM4.8,7.2H19.2V5.6H4.8Z">
                  </path>
                </svg></div>
            </a></li> -->
          <li class="user-actions-item">
            <div class="erc-header-tile" v-if="!isSearch" @click="goToSearch">
              <div class="erc-header-svg">
                <svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="search-svg">
                  <path
                    d="M2,10.666V5.333L5.333,2h5.333L14,5.333v5.333L10.667,14H5.333ZM4.364,0,0,4.363v7.273L4.364,16h7.273l1.757-1.757L18,20h2V18l-5.757-4.606L16,11.637V4.363L11.637,0Z">
                  </path>
                </svg>
              </div>
            </div>
            <ul class="erc-user-actions" v-else>
              <li class="user-actions-item">
                <div class="erc-header-tile" @click="$router.go(-1)">
                  <div class="erc-header-svg"><svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg"
                      width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                      <path fill="white"
                        d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z" />
                      </svg></div>
                </div>
              </li>
            </ul>
          </li>
          <li class="user-actions-item" @click="dialog == true ? dialog = false : dialog = true" >
                <div class="erc-header-tile">
                  <div class="erc-header-svg">
                          <svg class="header-svg-icon" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path></svg>
                  </div>
                  <div class="text-center">
                    <v-dialog v-model="dialog">
                      <v-card style="background-color: #302e42; color: white">
                        <v-card-text>
                          SETTINGS
                        </v-card-text>
                        <!-- make an option to disable the miniProgressBar on the localStorage -->
                        <v-card-text>
                          <v-switch
                            v-model="miniProgressBar"
                            label="Mini Progress Bar"
                            color="#fd0"
                            @change="toggleMiniProgressBar"
                            v-if="!isWatch"
                          ></v-switch>
                          <!-- same but for the autoplay -->
                          <v-switch
                            v-model="autoplay"
                            label="Autoplay"
                            color="#fd0"
                            v-if="!isWatch"
                            @change="toggleAutoplay"
                          ></v-switch>
                          <!-- now for Discord RPC -->
                          <v-switch
                            v-model="discordRPC"
                            label="Discord RPC"
                            color="#fd0"
                            @change="toggleDiscordRPC"
                          ></v-switch>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="white" block @click="dialog = false">Close Dialog</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>
              </li>
          </ul>
          </div>
      <div class="erc-header-bar" :style="style"></div>
    </div>
    <div :class="isOuvert ? 'erc-page-overlay state-open':'erc-page-overlay'" @click="toggleMenu()"></div>
  </div>
</template>

<script>
import {disableRPC,enableRPC} from '../scripts/misc/rpc.js';
export default {
  data() {
    return {
      inRightPlace: false,
      style : '',
      isOuvert : false,
      miniProgressBar : localStorage.getItem('miniProgressBar') == 'true' ? true : false,
      autoplay : localStorage.getItem('autoplay') == 'true' ? true : false,
      channelInUse : getChannelinUse(localStorage.getItem('channel')),
      chan: localStorage.getItem('channel'),
      isSearch : false,
      dialog: false,
      discordRPC : localStorage.getItem('discord_rpc') == 'true' ? true : false,
      isWatch : false,
    }
  },
  methods : {
    goToSearch(){
      window.location.href = '/search';
    },
    toggleMenu(){
      this.isOuvert = !this.isOuvert;
      if(this.isOuvert){
        //disable scroll
        document.body.style = 'overflow: hidden; position: fixed; width: 100%;';
       /*  document.body.scroll = 'no'; */
      } else {
        //enable scroll
        document.body.style = '';
        /* document.body.scroll = 'yes'; */
      }
    },
    checkChannel() {
            if (localStorage.getItem('channel') != this.chan) {
                this.$forceUpdate()
                window.location.reload();
            }
        },
    toggleMiniProgressBar() {
      if (localStorage.getItem('miniProgressBar') == 'true') {
        localStorage.setItem('miniProgressBar', 'false')
        this.miniProgressBar = false;
      } else {
        localStorage.setItem('miniProgressBar', 'true')
        this.miniProgressBar = true;
      }
    },
    toggleAutoplay() {
      if (localStorage.getItem('autoplay') == 'true') {
        localStorage.setItem('autoplay', 'false')
        this.autoplay = false;
      } else {
        localStorage.setItem('autoplay', 'true')
        this.autoplay = true;
      }
    },
    async toggleDiscordRPC(){
      if(localStorage.getItem('discord_rpc') == 'true'){
        localStorage.setItem('discord_rpc', 'false')
        await disableRPC()
        this.discordRPC = false;
      } else {
        localStorage.setItem('discord_rpc', 'true')
        await enableRPC();
        this.discordRPC = true;
      }
    }
  },
  mounted: async function () {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
    if(window.location.href.includes('/search')){
      this.isSearch = true;
    }
    if(window.location.href.includes('/watch')){
      this.isWatch = true;
    }
    if(channel=='crunchyroll'){
      this.style = 'background-color: #ff6600';
    } else if(channel == 'neko-sama'){
      this.style = 'background-color: #1cb9f4';
    } else {
      this.style = 'background-color: #0095ff';
    }

    setInterval(this.checkChannel, 1000);
    
  },
  beforeRouteEnter : function (href, from, next) {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
    if(window.location.href.includes('/watch')){
      this.isWatch = true;
    }
    next();
  },
  beforeRouteUpdate : function (href, from, next) {
    if(window.location.href.includes('/search') || window.location.href.split('/').pop().length == 0){
      this.inRightPlace = true;
    }
    if(window.location.href.includes('/watch')){
      this.isWatch = true;
    }
    next();
  },
}
</script>

<style scoped>
#navbar {
 /*  orange border on the bottom of the div */
  border-bottom: 1px solid #167da5;
}
#below{
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px;
}

.erc-nav-dropdown-item{
  cursor: pointer;
}

.header-right {
  border-radius: 0px !important;
}

</style>