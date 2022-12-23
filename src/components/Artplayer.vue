<template>
    <div id="player" class="video-player-wrapper" ref="artRef"></div>
  </template>
  
  <script>
  import Artplayer from "artplayer";
  import {
      appWindow
  } from '@tauri-apps/api/window';
  import Hls from 'hls.js';
  import qualityicon from '/img/quality.svg';
  import loading from '/img/loading.svg';
  import fastforward from '/img/fast-forward-15.svg';
  import backforward from '/img/back-forward-15.svg';
  import download from '/img/download-button.svg';
  import SubtitlesOctopus from "../scripts/subtitles-octopus.js";
  import { watchEvent,watchRPC_film,watchRPC_series,defaultRPC} from "../scripts/misc/rpc";

  export default {
      data() {
          return {

          };
      },
      props: {
          option: {
              type: Object,
              required: true,
          },
          subs: {
              type: Array,
              required: true,
          },
          videos: {
              type: Array,
              required: true,
          },
          info: {
              type: Object,
              required: true,
          }
      },
      mounted: async function () {
          function artplayerPluginAss(options) {
              return art => {
                  const instance = new SubtitlesOctopus({
                      ...options,
                      video: art.template.$video
                  });

                  instance.canvasParent.style.zIndex = 20;
                  instance.canvasParent.style.position = 'absolute';

                  art.on('destroy', () => instance.dispose());
                  return {
                      name: "artplayerPluginAss",
                      instance: instance
                  }
              }
          }
          async function getState(el) {
              if (el.fullscreen) {
                  await appWindow.setFullscreen(true);
                  console.info('fullscreen');
              } else {
                  await appWindow.setFullscreen(false);
                  console.info('not fullscreen');
              }
          }
          if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
              this.option.fullscreenWeb = true;
              this.option.fullscreen = false;
          } else {
              this.option.fullscreen = true
          }
          if (localStorage.getItem('miniProgressBar') === 'true') {
              this.option.miniProgressBar = true;
          } else {
              this.option.miniProgressBar = false;
          }
          if (localStorage.getItem('autoplay') === 'true') {
              this.option.autoplay = true;
          } else {
              this.option.autoplay = false;
          }
          this.option.fullscreenWeb = true;
          var hls = null;
          let plugin;
          let subtitle;
          let subSetting;
          // if we are on windows macos or linux we use the subtitles-octopus plugin
          if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('LINUX') >= 0 || navigator.platform.toUpperCase().indexOf('WIN') >= 0) {
              plugin = artplayerPluginAss({
                  debug: true,
                  fonts: [`/fonts/TREBUCBD.ttf`],
                  subUrl: this.subs[0].url,
                  workerUrl: `/ass-sub/subtitles-octopus-worker.js`,
                  legacyWorkerUrl: `/ass-sub/subtitles-octopus-worker-legacy.js`
              })
              subtitle = {};
              subSetting = {
                  width: 200,
                  html: 'Subtitle',
                  tooltip: this.subs[0].html,
                  icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
                  selector: [{
                          html: 'Display',
                          tooltip: 'Show',
                          switch: true,
                          onSwitch: function (item) {
                              item.tooltip = item.switch ? 'Hide' : 'Show';
                              art.query('.libassjs-canvas-parent').style.display = item.switch ? 'none' : 'block'
                              this.subtitle.show = !item.switch;
                              return !item.switch;
                          },
                      },
                      ...this.subs.map(sub => {
                          return {
                              html: sub.html,
                              url: sub.url,
                              type: sub.format,
                              style: sub.style,
                              encoding: 'utf-8'
                          }
                      })
                  ],
                  onSelect: async function (item) {
                      this.pause();
                      art.plugins.artplayerPluginAss.instance.setTrackByUrl(item.url);
                      await this.play();
                      localStorage.setItem('preferredLanguage', item.html);
                      return item.html;
                  },
              }
          } else {
              plugin = null
              subtitle = this.subs[0]
              subSetting = {
                  width: 200,
                  html: 'Subtitle',
                  tooltip: this.subs[0].html,
                  icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
                  selector: [{
                          html: 'Display',
                          tooltip: 'Show',
                          switch: true,
                          onSwitch: function (item) {
                              item.tooltip = item.switch ? 'Hide' : 'Show';
                              art.subtitle.show = !item.switch;
                              return !item.switch;
                          },
                      },
                      ...this.subs.map(sub => {
                          return {
                              html: sub.html,
                              url: sub.url,
                              type: sub.format,
                              style: sub.style,
                              encoding: 'utf-8'
                          }
                      })
                  ],
                  onSelect: function (item) {
                      art.subtitle.switch(item.url, {
                          name: item.html,
                      });
                      return item.html;
                  }
              }
            }
          
          var art = new Artplayer({
              ...this.option,
              url: this.videos[0].url,
              quality: this.videos,
              subtitle: subtitle,
              plugins: [
                  plugin 
              ],
              settings: [
                subSetting,
                 {
                      // switch to disable the mini progress bar
                      html: 'Mini Progress Bar',
                      tooltip: localStorage.miniProgressBar === 'false' ? 'Off' : 'On',
                      switch: localStorage.miniProgressBar === 'false' ? false : true,
                      onSwitch: function (item) {
                          item.tooltip = localStorage.miniProgressBar === 'false' ? 'Off' : 'On';
                          item.switch = localStorage.miniProgressBar === 'false' ? false : true;
                          if (item.switch == false) {
                              localStorage.setItem('miniProgressBar', true);
                          } else {
                              localStorage.setItem('miniProgressBar', false);
                          }
                          window.location.reload();
                          return !item.switch;
                      },
                  }

              ],
              container: this.$refs.artRef,
              volume: 0.5,
              isLive: false,
              muted: false,
              pip: true,
              screenshot: true,
              setting: true,
              loop: false,
              flip: true,
              playbackRate: true,
              aspectRatio: true,
              subtitleOffset: true,
              mutex: true,
              playsInline: true,
              autoPlayback: true,
              airplay: true,
              theme: '#ffffff',
              icons: {
                  loading: `<img src="${loading}">`
              },
              moreVideoAttr: {
                  crossOrigin: 'anonymous',
              },
              customType: {
                  m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else {
                        const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
                        if (canPlay === 'probably' || canPlay == 'maybe') {
                            video.src = url;
                        } else {
                            art.notice.show = 'Does not support playback of m3u8';
                        }
                    }
                  },
              },
              whitelist: ['*'],
              moreVideoAttr: {
                  crossOrigin: 'anonymous',
              },
              layers: [{
                html: '<button class="artplayer-layer__button">SKIP</button>',
                style: {
                    position: "absolute",
                    padding: "1px 11px 1px 11px",
                    bottom: "60px",
                    left : "10px",
                    border : "1px solid white",
                    borderRadius: "5px",
                    borderBlockColor: "white",
                    color: "black",
                    backgroundColor: "white",
                    fontFamily : "Trebuc Bold"
                },
                click : function(_,el){
                    art.seek = art.currentTime + 90;
                    el.target.innerText = 'SKIPPED';
                    setTimeout(function(){
                        el.target.innerText  = 'SKIP';
                    }, 1500);
                }
              }],
              controls: [{
                      position: 'right',
                      html: `<img width="22" heigth="22" src="${download}">`,
                      tooltip: 'Copy the video link to the clipboard',
                      click: function (item) {
                          let master_link = localStorage.getItem('master_link');
                          navigator.clipboard.writeText(master_link);
                          art.notice.show = 'Link copied to your clipboard';
                      }
                  },
                  {
                      position: 'left',
                      html: `<img width="22" heigth="22" src="${backforward}">`,
                      tooltip: '-15',
                      click: function () {
                          this.backward = 15;
                      }
                  }, {
                      position: 'left',
                      html: `<img width="22" heigth="22" src="${fastforward}">`,
                      tooltip: '+15',
                      click: function () {
                          this.forward = 15;
                      }
                  }
              ],
          });
          art.on('ready', async () => {
              if (hls != null) {
                  art.controls.add({
                      width: 200,
                      position: 'right',
                      html: `<img width="22" heigth="22" src="${qualityicon}">`,
                      selector: hls.levels.map((item, index) => {
                          return {
                              html: item.height + 'P',
                              level: item.level || index
                          }
                      }).reverse(),
                      onSelect: function (item) {
                          hls.nextLevel = item.level;
                          return item.html;
                      },
                      mounted(_, item) {
                          function updateHtml() {
                              const currentLevel = hls.levels[hls.currentLevel];
                              if (currentLevel) {
                                  item.tooltip = currentLevel.height + 'P';
                              }
                          }

                          hls.on(Hls.Events.LEVEL_SWITCHING, (res) => {
                              art.notice.show = "LEVEL_SWITCHING";
                              console.info('LEVEL_SWITCHING -->', res);
                              updateHtml();
                          });

                          hls.on(Hls.Events.LEVEL_SWITCHED, (res) => {
                              art.notice.show = "LEVEL_SWITCHED";
                              console.info('LEVEL_SWITCHED -->', res);
                              updateHtml();
                          });

                          hls.on(Hls.Events.LEVEL_LOADING, (res) => {
                              art.notice.show = "LEVEL_LOADING";
                              console.info('LEVEL_LOADING -->', res);
                              updateHtml();
                          });

                          hls.on(Hls.Events.LEVEL_LOADED, (res) => {
                              art.notice.show = "LEVEL_LOADED";
                              console.info('LEVEL_LOADED -->', res);
                              updateHtml();
                          });

                          hls.on(Hls.Events.LEVEL_UPDATED, (res) => {
                              art.notice.show = "LEVEL_UPDATED";
                              console.info('LEVEL_UPDATED -->', res);
                              updateHtml();
                          });

                          hls.on(Hls.Events.LEVELS_UPDATED, (res) => {
                              art.notice.show = "LEVELS_UPDATED";
                              console.info('LEVELS_UPDATED -->', res);
                              updateHtml();
                          });
                      }
                  })
              }
              await watchEvent(this.info.title_info.title, 'Video is about to start');
              setTimeout(async () => {
                  await watchEvent(this.info.title_info.title, 'Idle')
              }, 60000);

          });

          art.on('video:play', async () => {
              let currentTimePlayer = art.currentTime;
              currentTimePlayer = currentTimePlayer / 60;
              let duration = art.duration;
              let currentTime = new Date();
              duration = duration / 60;
              let endVideo = currentTime.setMinutes(currentTime.getMinutes() + duration - currentTimePlayer);
              endVideo = currentTime.getTime();
              if (this.info.__type__ == 'series' && this.info.episode_number != null) {
                  await watchRPC_series(this.info.title_info.title, this.info.episode_number, this.info.season_number, endVideo)
              } else {
                  await watchRPC_film(this.info.title_info.title, endVideo)
              }
          });

          art.on('video:pause', async () => {
              await watchEvent(this.info.title_info.title, 'Paused')
              // after 1 min, if the video is still paused, set the activity to "Idle"
              setTimeout(async () => {
                  await watchEvent(this.info.title_info.title, 'Turning to idle')
                  await watchEvent(this.info.title_info.title, 'Idle')
              }, 60000);
          })

          art.on('video:seeked', async () => {
              let currentTimePlayer = art.currentTime;
              currentTimePlayer = currentTimePlayer / 60;
              let duration = art.duration;
              let currentTime = new Date();
              duration = duration / 60;
              let endVideo = currentTime.setMinutes(currentTime.getMinutes() + duration - currentTimePlayer);
              endVideo = currentTime.getTime();
              if (this.info.__type__ == 'series' && this.info.episode_number != null) {
                  await watchRPC_series(this.info.title_info.title, this.info.episode_number, this.info.season_number, endVideo)
              } else {
                  await watchRPC_film(this.info.title_info.title, endVideo)
              }
          });

          art.on('video:ended', async () => {
              await watchEvent(this.info.title_info.title, 'Video has ended, going to idle')
              setTimeout(async () => {
                  await defaultRPC(this.info.title_info.title, 'Idle')
              }, 60000);
          });


          art.on('fullscreen', async () => {
              await getState(art);
          });


          this.$nextTick(() => {
              this.$emit("get-instance", art);
          });


          // when pushing the escape key on the keyboard check if the player is fullscreen and if it is, exit fullscreen
          document.addEventListener('keydown', async (event) => {
              if (event.key == 'Escape') {
                  if (!art.fullscreen) {
                      await appWindow.setFullscreen(false);
                  }
              }
          });
      },
  };
  </script>

<style>
.art-progress-played, .art-progress-indicator,.art-video-player .art-layer-miniProgressBar{
    background-color: red !important;
}
</style>