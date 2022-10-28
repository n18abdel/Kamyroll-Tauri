<script setup>
import adn_logo from '../assets/adn.svg';
import crunchyroll_logo from '../assets/crunchyroll.svg';
import neko_logo from '../assets/neko-sama.svg';
</script>
<template>
    <div v-if="channel == 'neko-sama'">
        <div v-if="episodes.length > 1" class="erc-shelf-feed-item" id="last-episodes">
        <h1 class="feed-title">Last Episodes</h1>
        <div class="erc-cards-collection">
            <div class="card" v-for="episode of episodes">
                <div>
                    <article class="erc-series-movie-card">
                        <a :title="episode.title" class="card-link"
                            :href="episode.anime_url"></a>
                        <div class="watch-tag-list">
                            <div class="erc-info-tags-group"></div>
                        </div>
                        <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                :src="episode.url_bg"
                                class="c-content-image image" :alt="episode.title">
                            <span class="erc-channel-icon">
                                <div class="channel-mask">
                                    <div class="channel-background" style="background-color: rgb(28, 185, 244)"></div>
                                    <img class="channel-icon"
                                        :src="neko_logo"
                                        alt="Neko-sama icon">
                                </div>
                            </span>
                        </div>
                        <div class="body-section">
                            <div class="poster-image"><img
                                    :src="episode.url_image"
                                    class="c-content-image" alt="One Piece"></div>
                            <div class="info">
                                <div class="description-metadata">
                                    <h1>{{episode.title}}</h1>
                                </div>
                                <div class="details-metadata">
                                    <div class="c-meta-tags media-tag-group">
                                        <span class="c-meta-tags__type">{{episode.episode}}</span>
                                        <span class="c-meta-tags__language">{{episode.lang}}</span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div v-if="channel == 'crunchyroll'">
        <div class="erc-shelf-feed-item" id="last-episodes" v-if="episodes.length > 1">
            <h1 class="feed-title">Last Episodes</h1>
            <div class="erc-cards-collection">
                <div class="card" v-for="episode of episodes">
                    <div>
                        <article class="erc-series-movie-card" :id="episode.id">
                            <a :title="episode.title" class="card-link"
                                :href="episode.url"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    :src="episode.images.thumbnail[0].source"
                                    class="c-content-image image" :alt="episode.title">
                                <span class="erc-channel-icon">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);"></div>
                                        <img class="channel-icon"
                                            :src="crunchyroll_logo"
                                            alt="Crunchyroll icon">
                                    </div>
                                </span>
                            </div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        :src="episode.images.thumbnail[0].source"
                                        class="c-content-image" :alt="episode.series_title"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>{{episode.season_title}}</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group">
                                            <span class="c-meta-tags__type">Ep.{{episode.episode}}</span>
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
        <v-lazy>
        <div class="erc-shelf-feed-item" id="browse_popular">
            <h1 class="feed-title">Most Popular</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="One Piece" class="card-link"
                                href="/crunchyroll/GRMG8ZQZR"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/236f44583009506b8d9d012c4d3119a5.jpeg"
                                    class="c-content-image image" alt="One Piece"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/2239c7b46b2e491ae33b33ff980e9fb1.jpeg"
                                        class="c-content-image" alt="One Piece"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>One Piece</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="JUJUTSU KAISEN" class="card-link"
                                href="/crunchyroll/GRDV0019R"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/98662d1c546c4e74de58fbc52679ac6c.jpeg"
                                    class="c-content-image image" alt="JUJUTSU KAISEN"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/47efe819e954f83cf0b8e022c39488ce.jpeg"
                                        class="c-content-image" alt="JUJUTSU KAISEN"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>JUJUTSU KAISEN</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Naruto Shippuden" class="card-link"
                                href="/crunchyroll/GYQ4MW246"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/7add01c632a7aaf883a90d75b0154ab8.jpeg"
                                    class="c-content-image image" alt="Naruto Shippuden"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/d5f15f87bf61d845b53fea64ee6f63f3.jpeg"
                                        class="c-content-image" alt="Naruto Shippuden"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Naruto Shippuden</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Mob Psycho 100" class="card-link"
                                href="/crunchyroll/GY190DKQR"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/30b75ec805a6083356a94dfe68c2caac.jpeg"
                                    class="c-content-image image" alt="Mob Psycho 100"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/eeaaec512f71989a66f853270c08c6b2.jpeg"
                                        class="c-content-image" alt="Mob Psycho 100"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Mob Psycho 100</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Black Clover" class="card-link"
                                href="/crunchyroll/GRE50KV36"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/0273e80242d80b0218f640e038269c18.jpeg"
                                    class="c-content-image image" alt="Black Clover"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/e108ae17d8d0407417cac40eb52d849a.jpeg"
                                        class="c-content-image" alt="Black Clover"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Black Clover</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="My Hero Academia" class="card-link"
                                href="/crunchyroll/G6NQ5DWZ6"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/db4769f7108e7c1e43d1549e0d4ff9c5.jpeg"
                                    class="c-content-image image" alt="My Hero Academia"><a class="erc-channel-icon"
                                    href="/crunchyroll" style="">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/dbdff189a7b97afadbe73b778583de83.jpeg"
                                        class="c-content-image" alt="My Hero Academia"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>My Hero Academia</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                
            </div>
        </div>
        </v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="GYXM79M56">
            <h1 class="feed-title">DRAGON QUEST The Adventure of Dai</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="DRAGON QUEST The Adventure of Dai"
                                class="card-link" href="/crunchyroll/GYXM79M56"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/11c6b367ea0fa9fe2cd570c90811f953.jpeg"
                                    class="c-content-image image" alt="DRAGON QUEST The Adventure of Dai"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/cba230badc3a1559995f8f7503af4788.jpeg"
                                        class="c-content-image" alt="DRAGON QUEST The Adventure of Dai"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>DRAGON QUEST The Adventure of Dai</h1>
                                        <p class="description">The world that was once afflicted by Hadlar, the Dark
                                            Lord, has regained peace in the hands of a swordsman called the "hero" and
                                            his companions. Delmurin Island became a place where monsters released from
                                            the Dark Lord lived.

                                            Dai, who is the only human on the island and longs to be a hero, lives in
                                            peace with the monsters. However, that life completely changes with the
                                            resurrection of the Dark Lord Hadlar. With promises from teachers,
                                            encounters with friends, and a destiny that cannot be escaped... In order to
                                            save the world, the adventure of Dai and his quest to be a hero begins!</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        </v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="G8DHV7W3N">
            <h1 class="feed-title">CUE!</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="CUE!" class="card-link"
                                href="/crunchyroll/G8DHV7W3N"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/6eed2d7a686544c88c2f53acbdcb325a.jpeg"
                                    class="c-content-image image" alt="CUE!"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/915602f701a9a0c19feb0257e7e9b044.jpeg"
                                        class="c-content-image" alt="CUE!"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>CUE!</h1>
                                        <p class="description">The brand-new voice acting talent agency AiRBLUE has
                                            neither seasoned pros nor famous stars. What it does have is a group of
                                            trainee voice actresses whose individualism and personality shines through
                                            their inexperience. Each one is looking for a way to harness her talents and
                                            make her dreams come true!

                                            However, sooner or later, all these dreams will run up against the harshness
                                            of reality. No matter how devotedly they practice, not all the candidates
                                            can pass every audition.
                                            Can they endure through anguish, setbacks, and discord? If the hurdles all
                                            trainees must face trip them up, can they recover and rise again?

                                            The story of these fledgling voice actresses is now ready for the director
                                            to call “action!”</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        </v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="browse_newly">
            <h1 class="feed-title">Just Updated</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="The Great Jahy Will Not Be Defeated!"
                                class="card-link" href="/crunchyroll/GNVHKNWXW"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/6a2835dce2872f4c7d2cbbb2d5cb3c43.jpeg"
                                    class="c-content-image image" alt="The Great Jahy Will Not Be Defeated!"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/099c77141e6be1a3c882ede49300773d.jpeg"
                                        class="c-content-image" alt="The Great Jahy Will Not Be Defeated!"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>The Great Jahy Will Not Be Defeated!</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="SING YESTERDAY; FOR ME"
                                class="card-link" href="/crunchyroll/GYVDV1N0Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/88f36cfc79bbdc313b5495e5d24736c2.jpeg"
                                    class="c-content-image image" alt="SING YESTERDAY; FOR ME"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/6a08d40c6e817c508fb8537347dbd548.jpeg"
                                        class="c-content-image" alt="SING YESTERDAY FOR ME"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>SING "YESTERDAY" FOR ME</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="The Prince of Tennis II U-17 World Cup"
                                class="card-link" href="/crunchyroll/G5PHNMWWN"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/3a084c93f7e062b3ce211a426474b17d.jpeg"
                                    class="c-content-image image" alt="The Prince of Tennis II U-17 World Cup"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/7b9bb3ff8dbb4d52ef4411f5a157d2aa.jpeg"
                                        class="c-content-image" alt="The Prince of Tennis II U-17 World Cup"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>The Prince of Tennis II U-17 World Cup</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Remake Our Life!" class="card-link"
                                href="/crunchyroll/GKEH2GZX9"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/a07f932b819930bfa0f4048a4ee22384.jpeg"
                                    class="c-content-image image" alt="Remake Our Life!"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/f890fa41100faa3b92fbd304209e40b1.jpeg"
                                        class="c-content-image" alt="Remake Our Life!"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Remake Our Life!</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Smile of the Arsnotoria the Animation"
                                class="card-link" href="/crunchyroll/GW4HM7GG3"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/466890243539541e499d8ba38ee6fe68.jpeg"
                                    class="c-content-image image" alt="Smile of the Arsnotoria the Animation"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/a12aa96558664f4c482677e9ec083fba.jpeg"
                                        class="c-content-image" alt="Smile of the Arsnotoria the Animation"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Smile of the Arsnotoria the Animation</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Do It Yourself!!" class="card-link"
                                href="/crunchyroll/GEXH3W4JP"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/d919dc52f7e58912bad2a6df7a83e7a9.jpeg"
                                    class="c-content-image image" alt="Do It Yourself!!"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/8ba96e71fd40d92bb2b3942c362fe250.jpeg"
                                        class="c-content-image" alt="Do It Yourself!!"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Do It Yourself!!</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                
            </div>
        </div> </v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="G64PEME0R">
            <h1 class="feed-title">Historical figures but not really</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Meow Meow Japanese History" class="card-link"
                                href="/crunchyroll/G62PJ4X26"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/7efdd1bb367a62467fb641691bf17013.jpeg"
                                    class="c-content-image image" alt="Meow Meow Japanese History"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/6cf28f1893eef82286c919f9ad95b254.jpeg"
                                        class="c-content-image" alt="Meow Meow Japanese History"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Meow Meow Japanese History</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a
                                title="Fate/Grand Order Absolute Demonic Front: Babylonia" class="card-link"
                                href="/crunchyroll/GR24JZ886"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/60385671a804aa4e097eea1e9d8b88f7.jpeg"
                                    class="c-content-image image"
                                    alt="Fate/Grand Order Absolute Demonic Front: Babylonia"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/5e2029d2c96cf5f92af034feec6e72c9.jpeg"
                                        class="c-content-image"
                                        alt="Fate/Grand Order Absolute Demonic Front: Babylonia"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Fate/Grand Order Absolute Demonic Front: Babylonia</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Fate/Zero" class="card-link"
                                href="/crunchyroll/GRJQ04Z3Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/fdc0dff409f19dfd8ffff5037257ac98.jpeg"
                                    class="c-content-image image" alt="Fate/Zero"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/2ee05df6e44530437069955b71f09daf.jpeg"
                                        class="c-content-image" alt="Fate/Zero"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Fate/Zero</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Oda Cinnamon Nobunaga" class="card-link"
                                href="/crunchyroll/GRJ0XX20Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/363816b7e73c294ec1f26942b6ab5b23.jpeg"
                                    class="c-content-image image" alt="Oda Cinnamon Nobunaga"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/b5fa363e489980d695acaac385aacbf3.jpeg"
                                        class="c-content-image" alt="Oda Cinnamon Nobunaga"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Oda Cinnamon Nobunaga</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="G0XHWM380">
            <h1 class="feed-title">Seirei Gensouki: Spirit Chronicles</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="Seirei Gensouki: Spirit Chronicles"
                                class="card-link" href="/crunchyroll/G0XHWM380"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/2b2f015ed1adf726347dd4df8bc41df3.jpeg"
                                    class="c-content-image image" alt="Seirei Gensouki: Spirit Chronicles"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/b660009a87462001a52ff9aa8d114726.jpeg"
                                        class="c-content-image" alt="Seirei Gensouki: Spirit Chronicles"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Seirei Gensouki: Spirit Chronicles</h1>
                                        <p class="description">His past life and current life are intersecting--a boy
                                            with memories of two lives faces his destiny!

                                            After his mother was killed at an early age, the orphaned Rio fought his
                                            hardest to survive in the slums.

                                            One day, he awakens to the memories of Haruto Amakwa, who died in an
                                            accident while dreaming of being reunited with his childhood friend, and Rio
                                            realizing he has reincarnated in a world of swords and sorcery.</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div></v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="GY8VEQ95Y">
            <h1 class="feed-title">DARLING in the FRANXX</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="DARLING in the FRANXX" class="card-link"
                                href="/crunchyroll/GY8VEQ95Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/626b30dc8203a0e263bba0a191a8f7be.jpeg"
                                    class="c-content-image image" alt="DARLING in the FRANXX"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/3fa31250f0604ff16ef6cb0a12dea63d.jpeg"
                                        class="c-content-image" alt="DARLING in the FRANXX"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>DARLING in the FRANXX</h1>
                                        <p class="description">The distant future: Humanity established the mobile fort
                                            city, Plantation, upon the ruined wasteland. Within the city were pilot
                                            quarters, Mistilteinn, otherwise known as the “Birdcage.” That is where the
                                            children live... Their only mission in life was the fight. Their enemies are
                                            the mysterious giant organisms known as Kyoryu. The children operate robots
                                            known as FRANXX in order to face these still unseen enemies. Among them was
                                            a boy who was once called a child prodigy: Code number 016, Hiro. One day, a
                                            mysterious girl called Zero Two appears in front of Hiro. “I’ve found you,
                                            my Darling.”</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>  </v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="GYG53DGDY">
            <h1 class="feed-title">Not saying it was aliens... but it was ALIENS</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Gintama" class="card-link"
                                href="/crunchyroll/GYQ4MKDZ6"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/5d1c34b8f9491d82bf62391f7ac4e4a3.jpeg"
                                    class="c-content-image image" alt="Gintama"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/4fadd5f113c28de1b22d4ef67a78890b.jpeg"
                                        class="c-content-image" alt="Gintama"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Gintama</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Parasyte -the maxim-" class="card-link"
                                href="/crunchyroll/G6K53VGGY"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/a1b9e0783210f940b383626b224e8827.jpeg"
                                    class="c-content-image image" alt="Parasyte -the maxim-"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/7d31dfaf49397a8cc1e490ccedea04e2.jpeg"
                                        class="c-content-image" alt="Parasyte -the maxim-"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Parasyte -the maxim-</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="TERRAFORMARS" class="card-link"
                                href="/crunchyroll/GRNQPEGWR"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/ccfd7b9ad6d78e42a273a105bbfe3160.jpeg"
                                    class="c-content-image image" alt="TERRAFORMARS"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/4f3815ec979014aa5a281278b1edbbd7.jpeg"
                                        class="c-content-image" alt="TERRAFORMARS"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>TERRAFORMARS</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Space Brothers" class="card-link"
                                href="/crunchyroll/G69PVE29Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/42ba5e60876342de5c5a933d56b96748.jpeg"
                                    class="c-content-image image" alt="Space Brothers"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/9b11916ae9d5d8e53323ea072fd6157e.jpeg"
                                        class="c-content-image" alt="Space Brothers"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Space Brothers</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Star Blazers: Space Battleship Yamato"
                                class="card-link" href="/crunchyroll/G65V4P4K6"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/e0716c3a240d572c329ff56d1b9bf120.jpeg"
                                    class="c-content-image image" alt="Star Blazers: Space Battleship Yamato"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/ced799cac17d0138c72f710de19d9f94.jpeg"
                                        class="c-content-image" alt="Star Blazers: Space Battleship Yamato"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Star Blazers: Space Battleship Yamato</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="SPACE PATROL LULUCO" class="card-link"
                                href="/crunchyroll/G63VM514Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/2f7dae8185c48de7d4ba0c3229c2e4b3.jpeg"
                                    class="c-content-image image" alt="SPACE PATROL LULUCO"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/c37c375a5bb578d9c5a2a2066a432ee7.jpeg"
                                        class="c-content-image" alt="SPACE PATROL LULUCO"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>SPACE PATROL LULUCO</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                
            </div>
        </div> </v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="GRDQN479Y">
            <h1 class="feed-title">Haven’t You Heard? I’m Sakamoto</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="Haven’t You Heard? I’m Sakamoto"
                                class="card-link" href="/crunchyroll/GRDQN479Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/70d0dd053ca9916296c56e7cb4594e23.jpeg"
                                    class="c-content-image image" alt="Haven’t You Heard? I’m Sakamoto"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/c836efd49dded6ba59d4aa9e162222c6.jpeg"
                                        class="c-content-image" alt="Haven’t You Heard? I’m Sakamoto"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Haven’t You Heard? I’m Sakamoto</h1>
                                        <p class="description">Sakamoto is not a normal high schooler. He’s smart, he’s
                                            dashing, he’s popular with girls. Much to the dislike of the male population
                                            of his school, who tries every trick in the book to mess Sakamoto up. But in
                                            the end, Sakamoto comes out of every trap with style and makes himself look
                                            cooler. Does he do this for popularity? Is this just who he is? No one
                                            really knows, but haven’t you heard? He’s Sakamoto!</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div></v-lazy>
        <v-lazy>
        <div class="erc-shelf-feed-item" id="GYP8DP1MY">
            <h1 class="feed-title">JoJo's Bizarre Adventure</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="JoJo's Bizarre Adventure" class="card-link"
                                href="/crunchyroll/GYP8DP1MY"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/aaeca3e651bebe79fe808085d079feea.jpeg"
                                    class="c-content-image image" alt="JoJo's Bizarre Adventure"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/2423e59e70fab2f873cbe48c9dac0d21.jpeg"
                                        class="c-content-image" alt="JoJo's Bizarre Adventure"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>JoJo's Bizarre Adventure</h1>
                                        <p class="description">Part 1 - Phantom Blood

                                            In ancient Mexico, people of Aztec had prospered. They had historic and
                                            strange "Stone Mask". It was a miraculous mask which brings eternal life and
                                            the power of authentic ruler. But the mask suddenly disappeared.

                                            A long time after that, in late 19th centuries when the thought and life of
                                            people were suddenly changing, Jonathan Joestar met with Dio Brando―. They
                                            spend time together through boyhood to youth, and the "Stone Mask" brings
                                            curious fate to them―.</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="G6EXQQGGR">
            <h1 class="feed-title">A Whole New World</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="The Rising of the Shield Hero"
                                class="card-link" href="/crunchyroll/G6W4QKX0R"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/a05f3e4b27485d33c5bf2b0e80c6d3c6.jpeg"
                                    class="c-content-image image" alt="The Rising of the Shield Hero"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/c73bc7c503920b61c100eab128e70d5e.jpeg"
                                        class="c-content-image" alt="The Rising of the Shield Hero"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>The Rising of the Shield Hero</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="That Time I Got Reincarnated as a Slime"
                                class="card-link" href="/crunchyroll/GYZJ43JMR"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/2afcd3a9eb8cd351328bcae8d5d7dc4a.jpeg"
                                    class="c-content-image image" alt="That Time I Got Reincarnated as a Slime"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/8a94435b1ba75c09126441f41f5f497d.jpeg"
                                        class="c-content-image" alt="That Time I Got Reincarnated as a Slime"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>That Time I Got Reincarnated as a Slime</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Isekai Cheat Magician" class="card-link"
                                href="/crunchyroll/GY79GJX1R"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/089567220a1fb7b5a9752d9227848650.jpeg"
                                    class="c-content-image image" alt="Isekai Cheat Magician"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/641f1b360dca7b98d9c7e503feda4bae.jpeg"
                                        class="c-content-image" alt="Isekai Cheat Magician"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Isekai Cheat Magician</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a
                                title="KONOSUBA -God's blessing on this wonderful world!" class="card-link"
                                href="/crunchyroll/GYE5K3GQR"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/ccfcc995823a0bac58f924b9ed19cf63.jpeg"
                                    class="c-content-image image"
                                    alt="KONOSUBA -God's blessing on this wonderful world!"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/9b4ab6da6eda68a105831ca27aaaf4d5.jpeg"
                                        class="c-content-image" alt="KONOSUBA -God's blessing on this wonderful world!">
                                </div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>KONOSUBA -God's blessing on this wonderful world!</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Re:ZERO -Starting Life in Another World-"
                                class="card-link" href="/crunchyroll/GRGG9798R"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/653fb1c89ecec17dc6947308819d702b.jpeg"
                                    class="c-content-image image" alt="Re:ZERO -Starting Life in Another World-"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/291c6c3b60857afabe46899f848079a4.jpeg"
                                        class="c-content-image" alt="Re:ZERO -Starting Life in Another World-"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Re:ZERO -Starting Life in Another World-</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Overlord" class="card-link"
                                href="/crunchyroll/G69PZ5PDY"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/5b65797ccc7305b99cd8f1922d66d777.jpeg"
                                    class="c-content-image image" alt="Overlord"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/59dd9785564f46c3cf2a18b38149f5a1.jpeg"
                                        class="c-content-image" alt="Overlord"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Overlord</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Dubbed</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                
            </div>
        </div>
    </v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="GRVNXWQZY">
            <h1 class="feed-title">March comes in like a lion</h1>
            <div class="erc-cards-collection">
                <div class="card-full">
                    <div>
                        <article class="erc-series-movie-card xl"><a title="March comes in like a lion"
                                class="card-link" href="/crunchyroll/GRVNXWQZY"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/3d6d42e2df6177df1c60edc4328072a7.jpeg"
                                    class="c-content-image image" alt="March comes in like a lion"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/85872591d4a019caf31d07dafdc27efe.jpeg"
                                        class="c-content-image" alt="March comes in like a lion"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>March comes in like a lion</h1>
                                        <p class="description">This is a gentle tale about people trying to regain
                                            something.
                                            And it is a tale of battle.
                                            The main character, Rei Kiriyama, lost his family in an accident when he was
                                            young. Now he is a 17-year-old pro shogi player who is burdened with deep
                                            loneliness. Rei lives alone in an old town in Tokyo, but after becoming
                                            acquainted with three sisters, Akari, Hinata and Momo, he begins to change
                                            little by little…</p>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </v-lazy>
    <v-lazy>
        <div class="erc-shelf-feed-item" id="GRKEQXWWR">
            <h1 class="feed-title">Space Oddity</h1>
            <div class="erc-cards-collection">
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="SPACE PATROL LULUCO" class="card-link"
                                href="/crunchyroll/G63VM514Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/2f7dae8185c48de7d4ba0c3229c2e4b3.jpeg"
                                    class="c-content-image image" alt="SPACE PATROL LULUCO"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/c37c375a5bb578d9c5a2a2066a432ee7.jpeg"
                                        class="c-content-image" alt="SPACE PATROL LULUCO"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>SPACE PATROL LULUCO</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Sub | Dub</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Space Battleship Tiramisu" class="card-link"
                                href="/crunchyroll/GYW4DX8Q6"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/c66009303664356077150bc8f8c71f71.jpeg"
                                    class="c-content-image image" alt="Space Battleship Tiramisu"><a
                                    class="erc-channel-icon" href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/735f9bd127f8bf4b464e5cf9a335dd41.jpeg"
                                        class="c-content-image" alt="Space Battleship Tiramisu"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Space Battleship Tiramisu</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Killjoys" class="card-link"
                                href="/crunchyroll/GY4P94286"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(128, 130, 133);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/vrvselect/6866f722191c71d4d8354102c8af82bb.png"
                                    class="c-content-image image" alt="Killjoys"><a class="erc-channel-icon"
                                    href="/vrvselect">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(128, 130, 133);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/vrvselect/495617604205faf4ef10affdecf12006.png"
                                            alt="VRV Select icon"><span class="channel-name">VRV Select</span>
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/vrvselect/2f62bf221ad1c00400fb1471b57d9782.png"
                                        class="c-content-image" alt="Killjoys"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Killjoys</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <article class="erc-series-movie-card"><a title="Captain Harlock" class="card-link"
                                href="/crunchyroll/GYGGPD73Y"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    src="https://static.vrv.co/imgsrv/display/thumbnail/800x450/catalog/crunchyroll/1a2b839f14271f8bb1bb23804400adbe.jpeg"
                                    class="c-content-image image" alt="Captain Harlock"><a class="erc-channel-icon"
                                    href="/crunchyroll">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(244, 117, 33);">
                                        </div><img class="channel-icon"
                                            src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                                            alt="Crunchyroll icon">
                                    </div>
                                </a></div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        src="https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/47cc4e9d26d596ba7c3c389aa0290337.jpeg"
                                        class="c-content-image" alt="Captain Harlock"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>Captain Harlock</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group"><span
                                                class="c-meta-tags__type">Series</span><span
                                                class="c-meta-tags__language">Subtitled</span></div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div> </v-lazy>

    
    </div>

    <!-- <div v-else-if="channel == 'adn'">
        <div  class="erc-shelf-feed-item" id="last-episodes">
            <h1 class="feed-title">Last Episodes</h1>
            <div class="erc-cards-collection">
                <div class="card" v-for="episode of episodes">
                    <div>
                        <article class="erc-series-movie-card" :id="episode.id">
                            <a :title="episode.title" class="card-link"
                                :href="episode.url"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    :src="episode.images.thumbnail[0].source"
                                    class="c-content-image image" :alt="episode.title">
                                <span class="erc-channel-icon">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(28, 185, 244);"></div>
                                        <img class="channel-icon"
                                            :src="adn_logo"
                                            alt="ADN icon">
                                    </div>
                                </span>
                            </div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        :src="episode.images.thumbnail[0].source"
                                        class="c-content-image" :alt="episode.series_title"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>{{episode.series_title}}</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group">
                                            <span class="c-meta-tags__type">Ep.{{episode.episode}}</span>
                                            <span class="c-meta-tags__language" v-if="episode.is_subbed && episode.is_dubbed">Sub | Dub</span>
                                            <span class="c-meta-tags__language" v-else-if="episode.is_subbed">Sub</span>
                                            <span class="c-meta-tags__language" v-else-if="episode.is_dubbed">Dub</span>
                                            <span class="c-meta-tags__language" v-else >Unknown</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div v-else-if="channel == 'adn'">
        <div v-if="episodes.length > 1" class="erc-shelf-feed-item" id="last-episodes">
            <h1 class="feed-title">Last Episodes</h1>
            <div class="erc-cards-collection">
                <div class="card" v-for="episode of episodes">
                    <div>
                        <article class="erc-series-movie-card" :id="episode.id">
                            <a :title="episode.title" class="card-link"
                                :href="episode.urlPath"></a>
                            <div class="watch-tag-list">
                                <div class="erc-info-tags-group"></div>
                            </div>
                            <div class="h-thumbnail" style="border-color: rgb(244, 117, 33);"><img
                                    :src="episode.imageHorizontal2x"
                                    class="c-content-image image" :alt="episode.title">
                                <span class="erc-channel-icon">
                                    <div class="channel-mask">
                                        <div class="channel-background" style="background-color: rgb(28, 185, 244);"></div>
                                        <img class="channel-icon"
                                            :src="adn_logo"
                                            alt="ADN icon">
                                    </div>
                                </span>
                            </div>
                            <div class="body-section">
                                <div class="poster-image"><img
                                        :src="episode.image"
                                        class="c-content-image" :alt="episode.series_title"></div>
                                <div class="info">
                                    <div class="description-metadata">
                                        <h1>{{episode.title}}</h1>
                                    </div>
                                    <div class="details-metadata">
                                        <div class="c-meta-tags media-tag-group">
                                            <span class="c-meta-tags__type">Ep.{{episode.episodeCount}}</span>
                                            <span class="c-meta-tags__language" v-if="episode.languages.length >= 2">Sub | Dub</span>
                                            <span class="c-meta-tags__language" v-else-if="episode.languages[0]=='vostf'">Sub</span>
                                            <span class="c-meta-tags__language" v-else-if="episode.languages[0]=='vf'">Dub</span>
                                            <span class="c-meta-tags__language" v-else >Unknown</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {fetch} from '@tauri-apps/api/http';
import {getLastEpisodes} from '../scripts/crunchyroll.js';
    export default {
        data() {
            return {
                episodes: [],
                channel: localStorage.getItem('channel')
            }
        },
        methods: {
            async getEpisodes() {
                if(this.channel =='neko-sama'){
                    const response = await fetch('https://neko-sama.fr', {
                        responseType: 2
                    });
                    if (response.status === 200) {
                        const data = response.data;
                        // Parse the data AS HTML 
                        let json = data.split("var lastEpisodes = ")[1].split(";")[0];
                        // Parse the JSON
                        json = JSON.parse(json);
                        // Set the data
                        for (let i = 0; i < json.length; i++) {
                            json[i].anime_url = "/nekosama/" + json[i].anime_url.split('/').pop().split('-')[0];
                            json[i].lang = json[i].lang.toUpperCase();
                            this.episodes.push(json[i]);
                        }
                    }
                }else if(this.channel == 'adn'){
                    const response = await fetch('https://gw.api.animationdigitalnetwork.fr/show/catalog?distribution=simulcast&order=new&offset=0&limit=12', {
                        responseType: 1
                    });
                    if(response.status === 200){
                        const data = response.data.shows;
                        for (let i = 0; i < data.length; i++) {
                            data[i].urlPath = "/adn/" + data[i].id;
                            this.episodes.push(data[i]);
                        }
                    }
                    
                } else if (this.channel == 'crunchyroll') { 
                    try{
                        this.episodes = await getLastEpisodes();
                    } catch(e){
                        this.episodes = [];
                    }
                 }
            },
            
        },
        beforeMount: function () {
            this.getEpisodes();
        }
    }
    
</script>