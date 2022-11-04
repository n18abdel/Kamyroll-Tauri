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
      },
      mounted: function () {
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
          } else {
                this.option.fullscreen = true
          }
          var hls = null;
          var art = new Artplayer({
            ...this.option,
            url: this.videos[0].url,
            quality: this.videos,
            /* subtitle: this.subs[0], */
            plugins: [
                    artplayerPluginAss({
                        debug: true, 
                        fonts: [`/fonts/TREBUCBD.ttf`],
                        subUrl: this.subs[0].url,
                        workerUrl: `/ass-sub/subtitles-octopus-worker.js`,
                        legacyWorkerUrl: `/ass-sub/subtitles-octopus-worker-legacy.js`
                    })
                ],
            settings: [{
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
            }],
              container: this.$refs.artRef,
              volume: 0.5,
              isLive: false,
              muted: false,
              autoplay: false,
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
              miniProgressBar: false,
              theme: '#f00',
              icons: {
                  loading: `<img src="${loading}">`
              },
              moreVideoAttr: {
                  crossOrigin: 'anonymous',
              },
              customType: {
                  m3u8: function (video, url) {
                      if (hls) hls.destroy();
                      // xhrSetup
                      hls = new Hls();
                      hls.loadSource(url);
                      hls.attachMedia(video);
                  },
              },
              whitelist: ['*'],
              moreVideoAttr: {
                  crossOrigin: 'anonymous',
              },
              controls: [
                  //download button
                  {
                      position: 'right',
                      html: `<img width="22" heigth="22" src="${download}">`,
                      tooltip: 'Soon',
                      click: function () {
                          this.tooltip = 'Bah alors bien essayer';
                      }
                  },
                  /* {
                                      position: 'right',
                                      html: `Next`,
                                      tooltip: 'Next Episode',
                                      click: function () {
                                          console.log('next',next);
                                          if(next){
                                              document.location.href =  document.location.origin + document.location.pathname.replace(this.id,next);
                                          }
                                      }
                                  }, */
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
                      },
                  }
              ],
          });
          art.on('ready', () => {
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